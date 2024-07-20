# Civilian Harm Mitigation and Reporting Prototype #1

![image](https://github.com/user-attachments/assets/5f988969-d9d8-4cd3-b4f3-116a290fbe03)

## Docker containers:

- chir-intake-proto1  - [CHIR Intake] form submission is stored in redis through DAL.
- chmr-dal-proto1     - [Data Abstraction Layer] DAL that hides storage implementation.
- redis-query         - Lists all records in redis (not shown in diagram).

[Redis Datalake] container:
1. Donwload Redis.
2. Start by running the following command (private network name must match the other containers).
  docker run -p 6379:6379 --name redis-server --rm --network <private network name> redis
