import { MinLength } from "class-validator"

export class CreateUserDto {
    @MinLength(3, { message: "Имя не может быть меньше 3 символов" })
    email: string

    @MinLength(6, { message: "Пароль не удовлетворяет условиям" })
    password: string

    subjects: Record<string, number>
}
