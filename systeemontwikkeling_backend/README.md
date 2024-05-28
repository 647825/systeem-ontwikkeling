## Project Setup

```sh
cd app
composer install
copy .env.example .env

```

### Compile and Hot-Reload for Development

```sh
docker compose up
```

## Database Setup

The SQL file required for setting up the database is provided as a compressed `.zip` file. To set up your database, please follow these steps:

1. **Download the SQL Zip File**: The zip file contains the SQL script necessary for creating the database structure and populating it with initial data.

2. **Importing the File in phpMyAdmin**:
   - Log in to your phpMyAdmin interface.(Username:root, password:secret123)
   - Create a new database by clicking on "Databases", then create a new database.(database:developmentdb)
   - Click on the "Import" tab in the top menu.
   - In the "File to import" section, choose the zip file you downloaded.
   - Leave all other options at their default settings, and click the "Go" button at the bottom of the page.

The zip file will be automatically unpacked by phpMyAdmin, and your database will be set up with the structure and data defined in the SQL file.
