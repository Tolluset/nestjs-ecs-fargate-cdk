import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HealthCheckService {
  constructor(private configService: ConfigService) {}

  healthCheck(): string {
    const NODE_ENV = this.configService.get<string>("NODE_ENV");

    return `Health OK ${Date.now()} ${NODE_ENV}`;
  }
}
