
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments();
        cart.string('firebase_id').unsigned().notNullable().references('firebase_id').inTable('users').onDelete('CASCADE');
        cart.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
        cart.integer('quantity').defaultTo(0);
        cart.float('price').unsigned().notNullable();
        cart.string('color').references('name').inTable('colors');;


    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
