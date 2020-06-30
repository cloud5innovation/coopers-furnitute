
exports.up = function(knex) {
  return knex.schema.createTable('colors', color => {
      color.increments();
      color.string('name').unique();
      color.string('product_title').references('title').inTable('products');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('colors');
};
