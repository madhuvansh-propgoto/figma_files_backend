exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {

    table.uuid("id").primary();

    table.string("name", 200).notNullable();
    table.string("email", 200).notNullable().unique();
    table.string("mobile_no", 10).notNullable().unique();

    table.string("password", 255).notNullable();

    table.string("profile_url");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .uuid("created_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .uuid("updated_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
