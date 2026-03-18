exports.up = function (knex) {
  return knex.schema.createTable("files", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("name", 50).notNullable();
    table.bigInteger("size").notNullable();
    table.string("type", 50).notNullable();

    table.enu("category", ["media", "docs", "music"]).notNullable();

    table
      .uuid("folder_id")
      .notNullable()
      .references("id")
      .inTable("folders")
      .onDelete("CASCADE");

    table
      .uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("path", 200).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("files");
};