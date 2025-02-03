## Installation
1. **Copy .env.example** and rename it to `.env`.

2. **Start Directus using Docker Compose**:
``` sh
docker-compose up -d
```
3. **Seed the database**:
Insert data into database tables using `data/seeds/seed.sql` file
4. **Create admin user**:
``` sh
docker-compose exec directus sh -c "npx directus users create --email <user-email> --password <password> --role 929f7cd3-e5be-49d6-8e1e-392cef643944"
```
5. **Access Directus**:
   Once Directus has started, visit your app at:
http://localhost:8056

## Initial setup for Admin
1. **Configure project settings**:
   Go to `/admin/settings/project` and update:
   * Project name
   * Project descriptor
   * Default language (Collections and fields are translated to Lithuanian)
   * Other stuff
2. **Create pharmacies**
3. **Create users and assign them pharmacies**. (Assign them`Pharmacy admin` role).

## Setup for Pharmacy admins
4. Then **Pharmacy admin** can:
   * Add their **pharmacy units** in the Pharmacy Units collection.
   * Add users to **pharmacy units** either:
     * Directly from the Pharmacy Units collection, or
     * Via the **User Directory**

## Pharmacy unit employee workflow
5. In `Journal` collection, click **Create item**
6. Enter the **Personal code**:
   * If the person does not have a **Lithuanian** personal code, check the `No LT Personal Code` option.
     (This will skip the personal code validation.)
