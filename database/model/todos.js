const db = require("../connector");

class todos {
  constructor() {
    this.database = new db();
  }

  async getData() {
    return await this.database.all("select * from settings");
  }

  async insertData({ name, value }) {
    return await this.database.run(
      'INSERT INTO settings (name, value) VALUES ("' +
        name +
        '","' +
        value +
        '")'
    );
  }

  async deleteData({ id }) {
    return await this.database.run("delete from settings where id=" + id + "");
  }

  // insertVersion(ver) {
  //   const sql = 'INSERT INTO "migrations" ("version") VALUES ("' + ver + '");';
  //   return this.database.run(sql);
  // }

  // updateVersion(ver) {
  //   const sql = "UPDATE migrations SET version = " + ver + " where id = 1;";
  //   return this.database.run(sql);
  // }

  // getVersion() {
  //   const sql = "select * from migrations where id = 1;";
  //   return this.database.get(sql);
  // }
}

module.exports = todos;
