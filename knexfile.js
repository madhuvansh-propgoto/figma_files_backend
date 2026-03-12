// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
 
  development: {
    client: 'pg',
    connection: {
      // host : '127.0.0.1',
      host : "postgres",
      user : 'postgres',
      password : 'Madhu@01',
      database : 'figma_db',
      port: 5432
    },
    migrations: {
      directory: './migrations'
    }
  }
 
};
 