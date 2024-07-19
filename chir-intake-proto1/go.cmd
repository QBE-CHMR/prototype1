docker build --no-cache --pull -t chir-intake-proto1 .
docker run --rm --name chir-intake-proto1 -p 3000:3000 --network mynet chir-intake-proto1