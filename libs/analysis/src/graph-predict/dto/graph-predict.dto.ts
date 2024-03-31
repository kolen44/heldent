import { Logger } from "@nestjs/common"
import { Graph } from "../entities/graph.entity"

export class GraphPredictDto {
    private readonly logger = new Logger(GraphPredictDto.name)

    private predictionCount: number
    private graph: Graph

    private validate(graph: Graph) {
        if (graph.length < 100)
            throw new Error(
                "The length of the graph must be greater than or equal to 100",
            )
        else if (graph.length > 100) {
            this.logger.warn(
                "The graph will be cut off because its length is greater than 100",
            )
            graph.truncateArrayFromEnd(100)
        }
    }

    constructor({
        predictionCount,
        graph,
    }: {
        predictionCount: number
        graph: Graph
    }) {
        this.validate(graph)
        this.predictionCount = predictionCount
        this.graph = graph
    }

    getPredictData() {
        return {
            predictionCount: this.predictionCount,
            graphInArray: this.graph.arr,
        }
    }
}
