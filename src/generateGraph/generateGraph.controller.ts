import { Body, Controller, Post } from "@nestjs/common"
import { GenerateGraphService } from "./generateGraph.service"

@Controller("generate")
export class GenerateGraphController {
    constructor(private generateGraphService: GenerateGraphService) {}

    @Post()
    addGenerated(
        @Body("name") graphName: string,
        @Body("grate") graphGrate: number,
    ): { id: string } {
        const generatedId = this.generateGraphService.insertGraph(
            graphName,
            graphGrate,
        )
        return { id: generatedId }
    }
}
