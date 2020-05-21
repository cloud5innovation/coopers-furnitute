
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', order => {
        order.increments();
        order.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        order.string('customer_id').unsigned().notNullable().references('firebase_id').inTable('users');
        order.enu('status', ['in progress', 'on the way', 'delivered']).defaultTo('in progress');
        order.float('order_total');
        order.timestamp('created_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('order')
  };
