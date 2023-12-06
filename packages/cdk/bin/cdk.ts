#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";
import { EcrStack } from "../lib/ecr-stack";
import { ECSStack } from "../lib/ecs-stack";

const app = new cdk.App();

const envName = app.node.tryGetContext("env") ?? "dev";
const imageDigest = app.node.tryGetContext("imageDigest") ?? "latest";

new CdkStack(app, "CdkStack");

new ECSStack(app, "EcsStack", { envName, imageDigest });
new EcrStack(app, "EcrStack");
