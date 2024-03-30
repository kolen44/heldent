import { Test, TestingModule } from "@nestjs/testing"
import { GraphPredictService } from "./graph-predict.service"

describe("GraphPredictService", () => {
    let service: GraphPredictService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GraphPredictService],
        }).compile()

        service = module.get<GraphPredictService>(GraphPredictService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
