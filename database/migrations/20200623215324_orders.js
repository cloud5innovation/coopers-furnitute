
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', order => {
        order.increments();
        order.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        order.string('customer_id').unsigned().references('firebase_id').inTable('users');
        order.enu('status', ['in progress', 'on the way', 'delivered']).defaultTo('in progress');
        order.float('order_total');
        order.string('customer_email').notNullable();
        order.string('customer_first_name').notNullable();
        order.string('customer_last_name').notNullable(); 
        order.string('customer_address');
        order.string('customer_city');
        order.string('customer_state');
        order.string('customer_zip');
        order.string('customer_phone');
        order.string('agent_commision');
        order.string('agentId').unsigned().references('agent_id').inTable('agents');
        order.timestamp('created_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('order')
  };
