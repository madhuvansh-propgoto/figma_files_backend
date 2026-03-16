exports.up = function (knex) {
  return knex.schema.createTable("folders", function (table) {
    table.uuid("id").primary();

    table.string("name", 200).notNullable();
    table.string("color", 200);

    table
      .uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.boolean("is_active").notNullable().defaultTo(true);

    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    table
      .uuid("created_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .uuid("updated_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("folders");
};