VERSION	?= $(shell git rev-parse HEAD)
IMAGE	?= 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools-frontend:$(VERSION)

all: login build push deploy

login:

    $(aws ecr get-login --no-include-email)

build:

	docker build -t $(IMAGE) .

push:

	docker push $(IMAGE)

deploy:

	ssh -i /Users/yehiaqtaish/Downloads/newpair.pem centos@54.176.247.200 'sudo docker rm -f frontend || true'
	ssh -i /Users/yehiaqtaish/Downloads/newpair.pem centos@54.176.247.200 'sudo docker run -v images:/usr/share/nginx/html/images -d -p 81:80 --restart=always --name=frontend $(IMAGE)'
