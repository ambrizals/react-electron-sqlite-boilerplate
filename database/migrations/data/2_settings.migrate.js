const connector = require("../../connector");
const migrateRepo = require("../../repository/migrations");
const db = new connector();
const version = 2;

const migration = new migrateRepo();

const createTable = () => {
  const sql =
    "CREATE TABLE IF NOT EXISTS settings ( id INTEGER PRIMARY KEY, name TEXT NOT NULL, value TEXT )";
  return db.run(sql);
};

const runMigration = async (currentVersion) => {
  if (version > currentVersion) {
    const data = await createTable();
    await migration.updateVersion(version);
    return data;
  }
};

module.exports = runMigration;
