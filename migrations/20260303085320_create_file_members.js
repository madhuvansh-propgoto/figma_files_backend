exports.up = function (knex) {
  return knex.schema.createTable("file_members", function (table) {
    table.uuid("id").primary(); // UUID v4 generated in backend

    table.uuid("file_id")
      .notNullable()
      .references("id")
      .inTable("files")
      .onDelete("CASCADE");

    table.uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("role", 50)
      .notNullable()
      .defaultTo("viewer")
      .checkIn(["viewer", "editor"]);

    table.unique(["file_id", "user_id"]); // prevent duplicate membership
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("file_members");
};