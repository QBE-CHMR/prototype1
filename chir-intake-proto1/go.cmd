docker build --no-cache --pull -t chir-intake-proto1 .
docker run --rm --name chir-intake-proto1 -p 8080:8080 --network mynet chir-intake-proto1