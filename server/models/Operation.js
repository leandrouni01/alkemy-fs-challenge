const table = "operation";

const keys = [
  { key: "id", table },
  { key: "fk_user", table },
  { key: "concept", table },
  { key: "amount", table },
  { key: "date", table },
  { key: "type", table },
  { key: "category", table },
  
]

module.exports.find = {keys, table};
module.exports.insert = {keys: keys.slice(1), table};
module.exports.update = {keys: keys.slice(2), table};
module.exports.delete = {keys, table};
