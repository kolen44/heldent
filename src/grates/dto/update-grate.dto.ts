import { PartialType } from "@nestjs/mapped-types"
import { CreateGrateDto } from "./create-grate.dto"

export class UpdateGrateDto extends PartialType(CreateGrateDto) {}
