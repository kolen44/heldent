import { MinLength } from "class-validator"

export class CreateUserDto {
    @MinLength(3, { message: "Имя не может быть меньше 3 символов" })
    name: string

    subjects: Record<string, number>
}
