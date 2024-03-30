import { Test, TestingModule } from "@nestjs/testing"
import { GraphPredictController } from "./graph-predict.controller"
import { GraphPredictService } from "./graph-predict.service"

describe("GraphPredictController", () => {
    let controller: GraphPredictController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GraphPredictController],
            providers: [GraphPredictService],
        }).compile()

        controller = module.get<GraphPredictController>(GraphPredictController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
