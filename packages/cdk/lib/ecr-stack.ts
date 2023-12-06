import { Construct } from "constructs";
import { Stack, StackProps, aws_ecr as ecr } from "aws-cdk-lib";

export class EcrStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: StackProps & { envName: string },
  ) {
    super(scope, id, props);

    const { envName } = props ?? {};

    new ecr.Repository(this, `${id}-NestRepository`, {
      repositoryName: `nest-${envName}`,
    });
  }
}
