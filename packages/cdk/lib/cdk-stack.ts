import { Stack, StackProps } from "aws-cdk-lib";
import { aws_ec2 as ec2, aws_ecr as ecr } from "aws-cdk-lib";
import { Construct } from "constructs";
import { env_name } from "../env";

const PUBLIC_ROUTE = "0.0.0.0/0";
const VPC_CIDR = "10.100.0.0/16";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, `${id}-Vpc`, {
      ipAddresses: ec2.IpAddresses.cidr(VPC_CIDR),
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    const publicRouteTable = new ec2.CfnRouteTable(
      this,
      `${id}-PublicRouteTable`,
      {
        vpcId: vpc.vpcId,
      },
    );

    new ec2.CfnRoute(this, `${id}-IgwRoute`, {
      routeTableId: publicRouteTable.ref,
      destinationCidrBlock: PUBLIC_ROUTE,
      gatewayId: vpc.internetGatewayId,
    });

    vpc.addInterfaceEndpoint(`${id}-EcrEndpointForPrivate`, {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    });

    new ecr.Repository(this, `${id}-NestRepository`, {
      repositoryName: `nest-${env_name}`,
    });
  }
}
