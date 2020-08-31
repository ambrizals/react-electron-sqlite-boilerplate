const createTableUser = require("./data/1_users.migrate");
const createTableSetting = require("./data/2_settings.migrate");

class MigrateTable {
  async run(currentVersion) {
    // Call function like 1_tablename.migrate(currentVersion)
    await createTableUser(currentVersion);
    await createTableSetting(currentVersion);
  }
}

module.exports = MigrateTable;
