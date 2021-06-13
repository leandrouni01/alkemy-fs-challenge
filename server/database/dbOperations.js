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

exports.find = (model, data) => {

}

exports.findOne = (model, data) => {

}

exports.update = (model, data) => {

}

exports.delete = (model, data) => {

}

