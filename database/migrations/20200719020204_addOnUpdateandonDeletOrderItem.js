


exports.up = function(knex) {
    return knex.schema.alterTable("order_items", (table) => {
      table.dropForeign("order_id");
      table
        .foreign("order_id")
        .references("order.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }
  
  exports.down = function(knex) {
    return knex.schema.alterTable("order_items", (table) => {
      table.dropForeign("order_id");
      table
        .foreign("order_id")
        .references("order.id")
        .onDelete("NO ACTION")
        onUpdate("NO ACTION");
    });
  }


