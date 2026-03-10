exports.up = function (knex) {
  return knex.schema.createTable("files", function (table) {
    table.uuid("id").primary(); // UUID v4 generated in backend

    table.string("name", 50).notNullable();

    table.bigInteger("size").notNullable(); // bytes

    table.string("type", 50).notNullable(); // extension

    table.string("category")
      .notNullable()
      .checkIn(["Media", "Docs", "Music"]); // ENUM replacement

    table.uuid("folder_id")
      .notNullable()
      .references("id")
      .inTable("folders")
      .onDelete("CASCADE");

    table.uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());

    table.timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("files");
};