import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticCalculationDto } from './create-statistic-calculation.dto';

export class UpdateStatisticCalculationDto extends PartialType(
	CreateStatisticCalculationDto,
) {}
