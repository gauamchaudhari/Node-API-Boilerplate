# Migration In Node JS (Knex) Library
    * npm install knex mysql
# Create Migration Command 
    * npx knex migrate:make create_users_table
# Execute Migration File 
    * npx knex migrate:latest
# Create Seeder Command
    * npx knex seed:make create_users
# Execute the seeder command
    * npx knex seed:run