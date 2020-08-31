const db = require("../connector");

class migrationRepository {
  constructor() {
    this.database = new db();
  }

  createTable() {
    const sql =
      "CREATE TABLE migrations (id	INTEGER, version	INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT));";
    return this.database.run(sql);
  }

  getMigrations() {
    return this.database.all("select * from migrations");
  }

  insertVersion(ver) {
    const sql = 'INSERT INTO "migrations" ("version") VALUES ("' + ver + '");';
    return this.database.run(sql);
  }

  updateVersion(ver) {
    const sql = "UPDATE migrations SET version = " + ver + " where id = 1;";
    return this.database.run(sql);
  }

  getVersion() {
    const sql = "select * from migrations where id = 1;";
    return this.database.get(sql);
  }
}

module.exports = migrationRepository;
