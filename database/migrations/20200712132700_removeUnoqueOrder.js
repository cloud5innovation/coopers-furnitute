
exports.up = function(knex) {
    return knex.schema.table('order_items', function (table) {
        // table.dropColumn('email');
        // table.string('customer_email');
        table.dropForeign("customer_email");

      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('removeUnoqueOrder')
};
