import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HealthCheckService {
  constructor(private configService: ConfigService) {}

  healthCheck(): string {
    const ENV = this.configService.get<string>("ENV");

    return `Health OK ${Date.now()} ${ENV}`;
  }
}
