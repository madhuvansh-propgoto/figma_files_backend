exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary(); // UUID will be generated in backend

    table.string("name", 200).notNullable();
    table.string("email", 200).notNullable().unique();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table.text("profile_url").notNullable();

    table.uuid("created_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.uuid("updated_by")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};