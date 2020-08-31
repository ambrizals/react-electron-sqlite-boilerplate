const connector = require("../../connector");
const migrateRepo = require("../../repository/migrations");
const db = new connector();
const version = 1;

const migration = new migrateRepo();

const createTable = () => {
  const sql =
    "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, token TEXT NOT NULL )";
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
