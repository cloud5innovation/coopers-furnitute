
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', product => {
      product.increments();
      product.string('title').notNullable();
      product.string('description', 900).notNullable();
      product.float('price').notNullable();
      product.string('image_url', 250).notNullable();
      product.string('category').notNullable();
      product.integer('quantity').defaultTo(1).notNullable();
      product.string('item_number');
      product.string('item_name').notNullable().unique();
      product.string('supplier').notNullable();
      product.boolean('out_of_stock').defaultTo(false);
      //WILL WE NEED VARIENTS (COLOR, DIMENSIONS)
      //
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('products');
  };
