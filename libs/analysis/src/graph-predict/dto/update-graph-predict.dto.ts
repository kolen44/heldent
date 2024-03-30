import { PartialType } from "@nestjs/mapped-types"
import { CreateGraphPredictDto } from "./create-graph-predict.dto"

export class UpdateGraphPredictDto extends PartialType(CreateGraphPredictDto) {}
