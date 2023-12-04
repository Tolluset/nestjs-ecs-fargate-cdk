# nestjs-ecs-fargatec-cdk

## Project Structure

- packages

  - app

    - contain nestjs app

  - cdk

    - iac using aws cdk

## CI/CD

- push-ci.yaml

  - invoke CI(test and build) when push any branch or tags

- push-images.yaml

  - build images and push to ECR when push any branch or tags

- deploy-manager.yaml

  - deploy service container or infrastructure
