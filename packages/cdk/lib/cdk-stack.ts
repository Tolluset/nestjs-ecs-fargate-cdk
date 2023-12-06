import { Construct } from "constructs";
import { Stack, StackProps, aws_ec2 as ec2, aws_ecr as ecr } from "aws-cdk-lib";

const PUBLIC_ROUTE = "0.0.0.0/0";
const VPC_CIDR = "10.100.0.0/16";

const HTTP = 80;

/**
 * @deprecated this stack is not used anymore, this stack will be remained for studying trace
 */
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const _vpc = new ec2.Vpc(this, `${id}-Vpc`, {
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
        vpcId: _vpc.vpcId,
      },
    );

    new ec2.CfnRoute(this, `${id}-IgwRoute`, {
      routeTableId: publicRouteTable.ref,
      destinationCidrBlock: PUBLIC_ROUTE,
      gatewayId: _vpc.internetGatewayId,
    });

    _vpc.addInterfaceEndpoint(`${id}-EcrEndpointForPrivate`, {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    });

    const albSG = new ec2.SecurityGroup(this, `${id}-albSG`, {
      vpc: _vpc,
      allowAllOutbound: false,
    });

    albSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(HTTP));
  }
}
