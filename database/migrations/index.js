const migrateRepo = require("../repository/migrations");
const migrateList = require("./migrate");

class migrations {
  constructor() {
    this.migrateRepo = new migrateRepo();
  }

  // TODO: Check Migration Table
  async init() {
    try {
      await this.migrateRepo.getMigrations();
      await this.runMigration();
    } catch (error) {
      console.log("not exists");
      await this.createMigrations();
      await this.runMigration();
    }
  }

  // Create migration table if not exists !
  async createMigrations() {
    await this.migrateRepo.createTable();
    await this.migrateRepo.insertVersion(0);
  }

  // Checking migration version
  async checkVersion() {
    const data = await this.migrateRepo.getVersion();
    return data.version;
  }

  // Running Migration
  async runMigration() {
    const currentVersion = await this.checkVersion();
    const migrate = new migrateList();
    await migrate.run(currentVersion);
  }
}

module.exports = migrations;
