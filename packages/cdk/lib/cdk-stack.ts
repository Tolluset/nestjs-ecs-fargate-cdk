import { Stack, StackProps } from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import { env_name } from "../env";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ecr.Repository(this, "NestRepository", {
      repositoryName: `nest-${env_name}`,
    });
  }
}
