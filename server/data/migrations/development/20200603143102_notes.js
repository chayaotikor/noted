exports.up = function (knex, Promise) {
	return knex.schema.createTable("notes", (tbl) => {
		tbl.increments("id").primary().unsigned();
		tbl.string("title").notNullable();
		tbl.string("textBody").notNullable();
		tbl.timestamp("createdAt").defaultTo(knex.fn.now());
		tbl.timestamp("updatedAt").defaultTo(knex.fn.now());
	})
	  .raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
     NEW."updatedAt"=now(); 
     RETURN NEW;
    END;
    $$ language 'plpgsql';
  `)
  .raw(`
    CREATE TRIGGER update_note_updated_at BEFORE UPDATE
    ON ?? FOR EACH ROW EXECUTE PROCEDURE 
    update_updated_at_column();
  `, ['notes']);
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTableIfExists("notes");
};
