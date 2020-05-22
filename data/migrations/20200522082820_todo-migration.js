exports.up = function(knex) {
  return knex.schema.createTable("todos", tbl => {
    tbl.increments();
    tbl.string("todo", 128).notNullable();
    tbl.boolean("completed");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("todos");
};
