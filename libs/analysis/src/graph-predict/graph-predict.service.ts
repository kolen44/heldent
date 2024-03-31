import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { GraphPredictDto } from "./dto/graph-predict.dto"
import { Graph } from "./entities/graph.entity"
import Model from "./entities/model.entity.js"

@Injectable()
export class GraphPredictService implements OnModuleInit, OnModuleDestroy {
    private model: Model

    async onModuleInit(): Promise<void> {
        // console.log(`The module has been initialized.`)
        this.model = new Model({ lengthInput: 100 })
        await this.model.load(
            "libs/analysis/src/graph-predict/training-models/normal-working-model/model.json",
        )
    }

    onModuleDestroy() {
        console.log("The module has been destroyed.")
        this.model.dispose()
    }

    public predict(graphPredictDto: GraphPredictDto): Graph {
        const { predictionCount, graphInArray } =
            graphPredictDto.getPredictData()

        const predictResult = this.model.predictMany(
            predictionCount,
            graphInArray,
        ) as number[]

        const graph = new Graph(predictResult)

        return graph
    }
}
