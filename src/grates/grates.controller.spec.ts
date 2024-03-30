import { Test, TestingModule } from "@nestjs/testing"
import { GratesController } from "./grates.controller"
import { GratesService } from "./grates.service"

describe("GratesController", () => {
    let controller: GratesController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GratesController],
            providers: [GratesService],
        }).compile()

        controller = module.get<GratesController>(GratesController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
