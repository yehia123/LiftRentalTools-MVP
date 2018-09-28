#
# Had to rebuild the application since the server cloud has issues with access through ssh
# Debugged the problem thinking it was ssh problem but it was because the AIM software
# Build new docker image:
#
#   docker build -t integratedend:1 .
#
# Tag image for AWS ECR:
#
#    docker tag integratedend:1 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools-repo:latest
#
# Upload ("push") newly built docker image to AWS ECR:
#
#   008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#
# Run docker container:
#
#   docker run -it -p 3000:3000 --restart=always 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#
FROM node:10

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT ["node", "server.js"]

EXPOSE 3000