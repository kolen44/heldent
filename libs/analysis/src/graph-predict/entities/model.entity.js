// const tf = require("@tensorflow/tfjs")
// require("tfjs-node-save")
import * as tf from "@tensorflow/tfjs"
import "tfjs-node-save"

export default class Model {
    model
    lengthInput

    constructor({ lengthInput }) {
        this.lengthInput = lengthInput
    }

    normalize(tensor) {
        // const result = tf.tidy(() => {
        //     const SUBSTRACT_TENSOR = tf.sub(tensor, this.MIN_INPUT_VALUE)
        //     const RANGE_SIZE = tf.sub(this.MAX_INPUT_VALUE, this.MIN_INPUT_VALUE)

        //     const TENSOR = tf.div(SUBSTRACT_TENSOR, RANGE_SIZE)

        //     return TENSOR
        // })
        return tensor
    }

    create({ inputShape }) {
        if (!inputShape) throw new Error("inputShape is required")

        const model = tf.sequential()

        this.lengthInput = inputShape[0]

        model.add(
            tf.layers.dense({
                units: 8,
                inputShape,
                activation: "relu",
            }),
        )
        model.add(tf.layers.dense({ units: 1 }))
        model.compile({ optimizer: "adam", loss: "meanSquaredError" })

        this.model = model

        return model
    }

    async train(inputTensor, outputTensor) {
        if (!inputTensor || !outputTensor)
            throw new Error("inputData and outputData are required")

        if (this.lengthInput !== inputTensor.shape[1]) {
            console.warn(
                "inputData.shape is not equal to lengthInput",
                `lengthInput: ${this.lengthInput}, inputData.shape: ${inputTensor.shape[1]}`,
            )
        }

        // this.MIN_INPUT_VALUE = tf.min(inputTensor, 0)
        // this.MAX_INPUT_VALUE = tf.max(inputTensor, 0)

        await this.model.fit(this.normalize(inputTensor), outputTensor, {
            epochs: 1000,
            batchSize: 64,
            shuffle: true,
        })
        console.log("Model trained")
    }

    predict(inputTensor) {
        if (!inputTensor) throw new Error("inputTensor is required")

        if (this.lengthInput !== inputTensor.shape[1]) {
            console.warn(
                "inputTensor.shape length is not equal to lengthInput",
                `lengthInput: ${this.lengthInput}, inputTensor.shape: ${inputTensor.length}`,
            )
        }

        const arr = this.model.predict(this.normalize(inputTensor)).arraySync()

        return arr
    }

    predictMany(count, inputData) {
        if (this.lengthInput < inputData.length) {
            inputData = inputData.slice(
                inputData.length - this.lengthInput,
                inputData.length,
            )

            console.warn(
                "inputData length is not equal to lengthInput",
                `lengthInput: ${this.lengthInput}, inputData.length: ${inputData.length}`,
            )
        }

        const lastInputs = [...inputData]

        for (let i = 0; i < count; i++) {
            const tensor = tf.tensor2d([
                lastInputs.slice(
                    lastInputs.length - inputData.length,
                    lastInputs.length,
                ),
            ])

            const result = this.predict(tensor)

            lastInputs.push(Math.round(result[0]))
        }

        return lastInputs
    }

    async load(pathToModel) {
        this.model = await tf.loadLayersModel(`file://${pathToModel}`)
    }

    async save(pathToSaveModel) {
        // await model.save(`file://models/my-model`)

        return await this.model.save(`file://${pathToSaveModel}`)
    }

    dispose() {
        this.model.dispose()
    }
}

// module.exports = Model
