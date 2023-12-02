import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthCheckController } from "./health-check/health-check.controller";
import { HealthCheckService } from "./health-check/health-check.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class AppModule {}
