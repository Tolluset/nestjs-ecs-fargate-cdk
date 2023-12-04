import { Construct } from "constructs";
import { Stack, StackProps, aws_ecr as ecr } from "aws-cdk-lib";

import { env_name } from "../env";

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ecr.Repository(this, `${id}-NestRepository`, {
      repositoryName: `nest-${env_name}`,
    });
  }
}
