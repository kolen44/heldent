import * as dotenv from "dotenv"
dotenv.config()

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableShutdownHooks()
    app.setGlobalPrefix("api")
    await app.listen(5000, () => {
        console.log("Listening on port 5000")
    })
}
bootstrap()
