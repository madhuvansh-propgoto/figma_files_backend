exports.up = function (knex) {
  return knex.schema.createTable("folders", function (table) {
    table.uuid("id").primary(); // UUID v4 generated in backend

    table.string("name", 200).notNullable();
    table.string("color", 200).nullable();

    table.uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());

    table.boolean("isActive")
      .notNullable()
      .defaultTo(true);

    table.timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());

    table.uuid("created_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");

    table.uuid("updated_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("folders");
};