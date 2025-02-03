1. Initialize directus app
RUN 
```
docker-compose up -d
```
2. Insert data into database tables
RUN data/seeds/seed.sql in your database cli

3. Create admin user

npx directus users create --email <user-email> --password <password> --role <role-uuid>
# use role-uuid `929f7cd3-e5be-49d6-8e1e-392cef643944`

docker-compose exec directus sh -c "npx directus users create --email matas.maciulis@vilnius.lt --password 123
45 --role 929f7cd3-e5be-49d6-8e1e-392cef643944"