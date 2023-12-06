import { Construct } from "constructs";
import {
  Stack,
  StackProps,
  aws_ecs_patterns as ecs_patterns,
  aws_ecr as ecr,
  aws_ecs as ecs,
} from "aws-cdk-lib";

type Props = {
  envName: string;
  imageDigest: string;
} & StackProps;

export class ECSStack extends Stack {
  constructor(scope: Construct, id: string, props?: Props) {
    super(scope, id, props);

    const { envName, imageDigest } = props ?? {};

    const repository = ecr.Repository.fromRepositoryName(
      this,
      `${id}-ecs_from_repository_name`,
      `nest-${envName}`,
    );

    const fargateTaskDefinition = new ecs.FargateTaskDefinition(
      this,
      `${id}-ecs_patterns_faragate_task`,
    );

    fargateTaskDefinition.addContainer(
      `${id}-ecs_patterns_faragate_task_container`,
      {
        image: ecs.ContainerImage.fromEcrRepository(repository, imageDigest),
        portMappings: [{ containerPort: 3000 }],
      },
    );

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${id}_ecs_patterns_ecs`,
      {
        taskDefinition: fargateTaskDefinition,
      },
    );

    service.targetGroup.configureHealthCheck({
      path: "/health-check",
    });
  }
}
