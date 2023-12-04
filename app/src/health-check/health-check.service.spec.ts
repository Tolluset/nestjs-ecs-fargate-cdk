import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';
import { ConfigService } from '@nestjs/config';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'NODE_ENV') {
                return 'test';
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    jest.spyOn(Date, 'now').mockReturnValue(123);
    expect(service.healthCheck()).toBe('Health OK 123 test');
  });
});
