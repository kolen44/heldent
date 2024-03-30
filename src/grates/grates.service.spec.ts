import { Test, TestingModule } from "@nestjs/testing"
import { GratesService } from "./grates.service"

describe("GratesService", () => {
    let service: GratesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GratesService],
        }).compile()

        service = module.get<GratesService>(GratesService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
