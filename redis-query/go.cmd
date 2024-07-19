docker build -t redis-query .
docker run -p 8088:80 --rm --name redis-query --network mynet redis-query