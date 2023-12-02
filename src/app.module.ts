import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthCheckModule } from "./health-check/health-check.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthCheckModule,
  ],
})
export class AppModule {}
