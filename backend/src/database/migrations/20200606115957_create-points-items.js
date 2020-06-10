
exports.up = function(knex) {
  return knex.schema.createTable('points_items', (table) => {
    table.increments();
    table.integer('point_id').notNullable()
    .references('id')
    .inTable('points');

    table.integer('item_id').notNullable()
      .references('id')
      .inTable('items');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('points_items')
};
