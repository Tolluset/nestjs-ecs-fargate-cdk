import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthCheckController } from "./health-check/health-check.controller";
import { HealthCheckService } from "./health-check/health-check.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, HealthCheckService],
})
export class AppModule {}
