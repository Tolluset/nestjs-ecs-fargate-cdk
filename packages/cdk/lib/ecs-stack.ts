import { Construct } from "constructs";
import {
  Stack,
  StackProps,
  aws_ecs_patterns as ecs_patterns,
  aws_ecr as ecr,
  aws_ecs as ecs,
} from "aws-cdk-lib";

export class ECSStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = ecr.Repository.fromRepositoryName(
      this,
      `${id}_ecs_from_repository_name`,
      "nest-dev",
    );

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${id}_ecs_patterns_ecs`,
      {
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(
            repository,
            "e2fffbeb71a3eb62e8aa13c3f70f821ec52886d5",
          ),
        },
      },
    );

    service.targetGroup.configureHealthCheck({
      path: "/health-check",
    });
  }
}
