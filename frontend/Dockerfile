# Error that im stuck at when deploying
# keep getting ''
# Empty reply from server
# Connection #0 to host localhost left intact
# curl: (52) Empty reply from server
# Build new docker image:
#
#   docker build -t frontend:1 .
#
# Tag image for AWS ECR:
#
#    docker tag frontend:1 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools-frontend:latest
#
# Upload ("push") newly built docker image to AWS ECR:
#
#   008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools-frontend:latest
#
# Run docker container:
#
#   docker run -it -p 4200:4200 --restart=always 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#

# Create img from official node 6 image from dockerhub
FROM node:10 as builder

# Change directory so that our command run inside the new directory
WORKDIR /app

# the code needed to run the app
COPY . .

# Install dependecies
RUN npm install && \
    npm run build

#
# Use a new docker image, copying newly created dist dir
#
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/lift /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



