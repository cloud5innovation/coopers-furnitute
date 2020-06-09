
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', reviews => {
      reviews.increments();
      reviews.string('title').notNullable();
      reviews.string('content', 900).notNullable();
      reviews.float('rating').notNullable();
      reviews.integer('product_id').unsigned().notNullable().references('id').inTable('products');
      reviews.string('firebase_id').unsigned().notNullable().references('firebase_id').inTable('users');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
  };
