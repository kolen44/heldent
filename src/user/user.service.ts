import { TokenService } from "@app/token"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private tokenService: TokenService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                name: createUserDto.name,
            },
        })
        if (existUser) {
            throw new BadRequestException(
                "Данный пользователь уже зарегистрирован",
            )
        }
        const user = await this.userRepository.save({
            name: createUserDto?.name,
            subjects: createUserDto.subjects,
        })
        return { user }
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        })

        return { user }
    }

    async findAll({ data }) {
        const check = this.tokenService.checkByToken(data)
        if (check) {
            return "proverka yes"
        }
    }
}
