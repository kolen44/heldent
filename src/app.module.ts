import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphsModule } from './generateGraph/graphs.module'

@Module({
	imports: [GraphsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
