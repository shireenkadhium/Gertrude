ecr-login:
	aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 425277199765.dkr.ecr.us-west-1.amazonaws.com

build-client:
    cd client && docker build --build-arg VITE_API_BASE_URL=https://api.gertrude.ai -t 425277199765.dkr.ecr.us-west-1.amazonaws.com/gertrude:client .