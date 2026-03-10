exports.up = async function (knex) {

  // Step 1: add column without NOT NULL
  await knex.schema.alterTable("users", function (table) {
    table.string("password", 255);
  });

  // Step 2: give existing rows a temporary value
  await knex("users").update({
    password: "temporary_password"
  });

  // Step 3: make column NOT NULL
  await knex.schema.alterTable("users", function (table) {
    table.string("password", 255).notNullable().alter();
  });

};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("password");
  });
};