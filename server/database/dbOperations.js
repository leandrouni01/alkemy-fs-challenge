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

exports.findBy = (model, data) => {
  const { table, keys} = model;
  const modelkeys = `${keys.map((key) => `${key.table}.${key.key} ${key.alias ? "AS "+ key.alias : ""}`)}`;
  const conditions = `${data.conditions.map(cond => `${cond.key} = ?`).join(', ')}`;
  const query =  `SELECT ${modelkeys} FROM ${table} WHERE ${conditions}`;

  const conditionsData = data.conditions.map((cond) => data[cond.key]);

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query,conditionsData, (error, results) => {
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
  const { table, keys } = model;

  const keysToChange = `${keys.map((key) => `${key.key} = ?`).join(", ")}`;
  const conditions = `${data.conditions.map(cond => `${cond.key} = ?`).join(', ')}`;
  const query = `UPDATE ${table} SET ${keysToChange} WHERE ${conditions}`;

  const updateData = keys.map(key => data[key.key]);
  const conditionsData = data.conditions.map((cond) => data[cond.key]);

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query,[...updateData, ...conditionsData], (error, results) => {
        connection.release();
        
        if (error) return reject(error);
        results = JSON.parse(JSON.stringify(results));
        resolve(results);
      });
    });
  })
}

exports.delete = (model, data) => {
  const { table } = model;
  const conditions = `${data.conditions.map(cond => `${cond.key} = ?`).join(', ')}`;
  const query = `DELETE FROM ${table} WHERE ${conditions}`;
  const conditionsData = data.conditions.map((cond) => data[cond.key]);

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
     
      connection.query(query, conditionsData, (error, results) => {
        connection.release();
        
        if (error) return reject(error);
        results = JSON.parse(JSON.stringify(results));
        resolve(results);
      });
    });
  })
}

