import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthCheckService {
  healthCheck(): string {
    return `Health OK ${Date.now()}`;
  }
}
