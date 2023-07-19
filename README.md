# Gertrude

# Set Up Server

## SSH Connection

To do any operations from your computer you need to configure SSH connection.
Save ssh key file into following path on your computer:

```
~/.ssh/gertrude.ai.pem
```

Open /etc/ssh/ssh_config file and add following:

```
Host GertrudeProduction
ForwardAgent yes
HostName 52.8.31.134
Port 22
User ubuntu
IdentityFile ~/.ssh/gertrude.ai.pem
ControlMaster auto
ControlPersist 10m
```

Configure permissions:

```
chmod 600 ~/.ssh/gertrude.ai.pem
```

Connect to server:

```
ssh GertrudeProduction
```

## Use Makefile commands

Before deploying to production, you must set up the AWS credentials on CLI
```bash
export AWS_DEFAULR_REGION=
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
```
# Production

- Build Client docker image
```bash
make build-client
```
- Push Client docker image to ECR
```bash
make push-client
```
- Build Server docker image
```bash
make build-server
```
- Push Server docker image to ECR
```bash
make push-server
```
- Apply pushed changes and restart service on EC2
```bash
make deploy
```