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

    @Post("find-one")
    @UsePipes(new ValidationPipe())
    findOne(@Body() data: { id: number }) {
        return this.userService.findOne(data.id)
    }

    @Post("find-all")
    @UsePipes(new ValidationPipe())
    findAll(@Body() data: { data: string }) {
        return this.userService.findAll(data)
    }

    @Post("find-all")
    @UsePipes(new ValidationPipe())
    getOne(@Body() data: { email: string }) {
        return this.userService.findAll({ data })
    }
}
