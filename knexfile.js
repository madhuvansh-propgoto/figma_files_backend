// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
 
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Madhu@1',
      database : 'figma_db'
    },
    migrations: {
      directory: './migrations'
    }
  }
 
};
 