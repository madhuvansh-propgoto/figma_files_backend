exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("mobile_no", 20).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("mobile_no");
  });
};