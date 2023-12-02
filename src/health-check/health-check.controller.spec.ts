import { Test, TestingModule } from "@nestjs/testing";
import { HealthCheckController } from "./health-check.controller";
import { HealthCheckService } from "./health-check.service";

describe("HealthCheckController", () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it("should be get health check", () => {
    jest.spyOn(Date, "now").mockReturnValue(123);
    expect(controller.healthCheck()).toBe("Health OK 123");
  });
});
