import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthCheckController } from "./health-check/health-check.controller";
import { HealthCheckService } from "./health-check/health-check.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class AppModule {}
