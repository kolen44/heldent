import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post("create")
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
