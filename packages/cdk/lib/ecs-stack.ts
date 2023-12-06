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
      `${id}_ecs_from_repository_name`,
      `nest-${envName}`,
    );

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${id}_ecs_patterns_ecs`,
    );

    service.taskDefinition.addContainer(`${id}-addContainer`, {
      image: ecs.ContainerImage.fromEcrRepository(repository, imageDigest),
      portMappings: [{ containerPort: 3000 }],
    });

    service.targetGroup.configureHealthCheck({
      path: "/health-check",
    });
  }
}
