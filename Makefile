#vars
REPO=425277199765.dkr.ecr.us-west-1.amazonaws.com/gertrude
IMAGECLIENTFULLNAME=${REPO}:client
IMAGESERVERFULLNAME=${REPO}:server
APIBASEURL=https://api.gertrude.ai

ecr-login:
	aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 425277199765.dkr.ecr.us-west-1.amazonaws.com

build-client:
	cd client && docker build --build-arg VITE_API_BASE_URL=${APIBASEURL} -t ${IMAGECLIENTFULLNAME} .

push-client:
	make ecr-login
	docker push ${IMAGECLIENTFULLNAME}

build-server:
	cd server && docker build --platform linux/amd64 -t ${IMAGESERVERFULLNAME} .

push-server:
	make ecr-login
	docker push ${IMAGESERVERFULLNAME}

deploy:
	scp docker-stack.yml GertrudeProduction:/var/www/gertrude/
	ssh GertrudeProduction  "aws ecr get-login --no-include-email --registry-ids 425277199765 --region us-west-1 && docker stack deploy --with-registry-auth  --compose-file /var/www/gertrude/docker-stack.yml gertrude"
