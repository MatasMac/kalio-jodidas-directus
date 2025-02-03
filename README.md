## Installation
1. Initialize directus app
```
docker-compose up -d
```
2. Insert data into database tables from `data/seeds/seed.sql` in your database cli
3. Create admin user
```
docker-compose exec directus sh -c "npx directus users create --email <user-email> --password <password> --role 929f7cd3-e5be-49d6-8e1e-392cef643944"
```
## Initial setup
1. create pharmacies
2. create users and assign them pharmacies. choose 'Pharmacy admin' role.