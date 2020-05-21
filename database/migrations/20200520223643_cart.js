
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments();
        cart.string('firebase_id').unsigned().notNullable().references('firebase_id').inTable('users');
        cart.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        cart.integer('quantity').defaultTo(1).onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
