// SQLite database works with tables that hold your records
// transaction() is used to guarantee your query is always executed as a whole
// and that if some part of the query fail, the entire query is rolled back
// so you can't end up with corrupted data in your database
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const init = async () => {
  const db = await SQLite.openDatabase({ name: 'places.db' });
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = async (title, imageUri, address, lat, lng) => {
  const db = await SQLite.openDatabase({ name: 'places.db' });
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = async () => {
  const db = await SQLite.openDatabase({ name: 'places.db' });
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM places',
        [],
        (_, result) => {
          const places = [];
          console.log(result.rows.length);
          for (let i = 0; i < result.rows.length; i++) {
            places.push(result.rows.item(i));
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};