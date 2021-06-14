const keys = [
  {key: "id" , table: "user"},
  {key: "email" , table: "user"},
  {key: "password" , table: "user"},
  {key: "user_name" , table: "user"}
];

const table = "user";

module.exports.insert = {keys: [keys[1], keys[2], keys[3]], table};
module.exports.find = {keys, table};
module.exports.update = {keys: [keys[1], keys[2], keys[3]], table};
module.exports.delete = {keys: [keys[1], keys[2], keys[3]], table};