import { Injectable } from "@nestjs/common"
import { CreateGraphPredictDto } from "./dto/create-graph-predict.dto"
import { UpdateGraphPredictDto } from "./dto/update-graph-predict.dto"

@Injectable()
export class GraphPredictService {
    create(createGraphPredictDto: CreateGraphPredictDto) {
        return "This action adds a new graphPredict"
    }

    findAll() {
        return `This action returns all graphPredict`
    }

    findOne(id: number) {
        return `This action returns a #${id} graphPredict`
    }

    update(id: number, updateGraphPredictDto: UpdateGraphPredictDto) {
        return `This action updates a #${id} graphPredict`
    }

    remove(id: number) {
        return `This action removes a #${id} graphPredict`
    }
}
