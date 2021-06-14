const pool = require('./dbPool');

exports.insert = (model, data) => {
  const { table, keys } = model;
  const query =
    `INSERT INTO ${table} (${keys.map((key) => key.key).join(", ")}) VALUES (${keys.map((key) => "?").join(", ")})`;
  
  const insertData = keys.map(key => data[key.key]);

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query,insertData, (error, result) => {
        connection.release();
        
        if (error) return reject(error);
        resolve(result.insertId);
      });
    });
  })
}

exports.find = (model) => {
  const { table, keys} = model;
  const modelkeys = `${keys.map((key) => `${key.table}.${key.key} ${key.alias ? "AS "+ key.alias : ""}`)}`;
  const query =  `SELECT ${modelkeys} FROM ${table}`;

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query, (error, results) => {
        connection.release();
        
        if (error) return reject(error);
        results = JSON.parse(JSON.stringify(results));
        resolve(results);
      });
    });
  })
}

exports.findOne = (model,data) => {
  const { table, keys} = model;
  const modelkeys = `${keys.map((key) => `${key.table}.${key.key} ${key.alias ? "AS "+ key.alias : ""}`)}`;
  const query =  `SELECT ${modelkeys} FROM ${table} WHERE ${table}.id = ?`;

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query,[data.id], (error, results) => {
        connection.release();
        
        if (error) return reject(error);
        results = JSON.parse(JSON.stringify(results));
        resolve(results);
      });
    });
  })
}

exports.update = (model, data) => {

}

exports.delete = (model, data) => {

}

