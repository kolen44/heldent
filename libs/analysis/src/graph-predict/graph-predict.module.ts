import { Module } from "@nestjs/common"
import { GraphPredictService } from "./graph-predict.service"
import { GraphPredictController } from "./graph-predict.controller"

@Module({
    controllers: [GraphPredictController],
    providers: [GraphPredictService],
})
export class GraphPredictModule {}
