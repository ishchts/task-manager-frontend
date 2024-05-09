rm-config:
	rm  ~/.docker/config.json

compose-build-for-linux:
	docker build --tag ishchts/task-manager-frontend . --platform linux/amd64