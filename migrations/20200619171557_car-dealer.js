exports.up = async function(knex) {
  await knex.schema.createTable("cars", (table) => { // car-dealer is the table name
    // table.integer("id").notNull().unique().primary()
    // line below is a short cut to make an autoincrementing id that is integer,not null, and unique.
    table.increments("id")
    table.text("vin").notNull().unique()
    table.text("make").notNull()
    table.text("model").notNull()
    table.integer("mileage").notNull()
    table.text("transmissionType")
    table.text("statusOfTitle")
  })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cars")
}
