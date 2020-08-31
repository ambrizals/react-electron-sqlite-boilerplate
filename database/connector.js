const { app, dialog } = require("electron");
const sqlite3 = require("sqlite3");
const isDev = require("electron-is-dev");
const fs = require("fs");

class SqliteConnector {
  constructor() {
    const dbDirectory = isDev
      ? app.getAppPath() + "\\database"
      : app.getAppPath().replace("app.asar", "localStorage");

    if (!fs.existsSync(dbDirectory)) fs.mkdirSync(dbDirectory);

    const dbAddress = dbDirectory + "\\client_db.db";

    this.db = new sqlite3.Database(dbAddress, (err) => {
      if (err) {
        console.log(err);
        dialog.showMessageBox(null, {
          title: "Error",
          message:
            "Terjadi kesalahan saat melakukan konfigurasi database lokal.",
        });
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = SqliteConnector;
