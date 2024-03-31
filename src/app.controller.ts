import { Controller, Get, UseGuards } from "@nestjs/common"
import { AppService } from "./app.service"
import { JwtAuthGuard } from "./user/guards/jwt-auth.guard"

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getHello(): string {
        return this.appService.getHello()
    }
}
