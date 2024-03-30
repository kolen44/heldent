import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common"
import { GraphPredictService } from "./graph-predict.service"
import { CreateGraphPredictDto } from "./dto/create-graph-predict.dto"
import { UpdateGraphPredictDto } from "./dto/update-graph-predict.dto"

@Controller("graph-predict")
export class GraphPredictController {
    constructor(private readonly graphPredictService: GraphPredictService) {}

    @Post()
    create(@Body() createGraphPredictDto: CreateGraphPredictDto) {
        return this.graphPredictService.create(createGraphPredictDto)
    }

    @Get()
    findAll() {
        return this.graphPredictService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.graphPredictService.findOne(+id)
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateGraphPredictDto: UpdateGraphPredictDto,
    ) {
        return this.graphPredictService.update(+id, updateGraphPredictDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.graphPredictService.remove(+id)
    }
}
