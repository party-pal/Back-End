
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('firstname', 255)
            .notNullable();
        users
            .string('lastname', 255)
            .notNullable();
        users
            .string('emailaddress', 255)
            .unique()
            .notNullable();
        users.string('password', 255)
    })
        .createTable('parties', tbl => {
            tbl.increments();
            tbl
                .string('partytitle', 255)
                .notNullable();
            tbl
                .string('guestCount', 255)
                .notNullable();
            tbl
                .date('date', 255)
                .notNullable();
            tbl
                .string('theme', 255)
                .notNullable();
            tbl.integer('userid')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
        })
        .createTable('venues', tbl => {
            tbl.increments();
            tbl
                .string('venuetitle', 255)
            tbl
                .string('cost', 255)
            tbl
                .string('location', 255)
            tbl.integer('partyid')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('parties')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');


        })
        .createTable('task', tbl => {
            tbl.increments()
            tbl
                .string('purchase', 255),
                tbl.integer("purchase_cost", 250),

                tbl
                    .string('entertainment', 255)
            tbl.integer("entertainment_cost", 250),

                tbl
                    .string('todo', 255)
            tbl
                .boolean('todo_completed')
                .defaultTo('false')

            tbl.integer('partyid')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('parties')

        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('task')
        .dropTableIfExists('users')
        .dropTableIfExists('venues')
        .dropTableIfExists('parties');

};
