const operationModel = require('../models/Operation');
const dbOperations = require('../database/dbOperations');


module.exports.getOperations = (req,res) =>{
  const fk_user = res.locals.user.id;
  dbOperations.findBy(operationModel.find, {fk_user, conditions: [{key: "fk_user"}]})
  .then((results) => {
    return res.status(200).send(results);
  })
  .catch((err) => {
    return res.status(422).send({errors: [{ title: "Db Error", detail: err.message }] })
  })
}

module.exports.getOperationById = (req,res) =>{
  const userId = res.locals.user.id;
  const { operationId } = req.params;
  dbOperations.findOne(operationModel.find, {id: operationId})
  .then((results) => {
    if(results.length > 0 && userId != results[0].fk_user) {
      return res.status(402).send({errors: [{ title: "Unauthorized", detail: "Current user does not have acces to requested operation" }] });
    }
    return res.status(200).send(results);
  })
  .catch((err) => {
    return res.status(422).send({errors: [{ title: "Db Error", detail: err.message }] })
  })
}

module.exports.createOperation = (req,res) =>{
  const {concept, amount, date, type, category} = req.body;

  if(!concept || !amount || !date || !type || !category) {
    return res.status(422).send({errors: [{title: "Missing parameters", detail: "Some parameters are missing"}]});
  }
  
  let data = {concept, amount, date, type, category, fk_user: res.locals.user.id}

  dbOperations.insert(operationModel.insert, data)
  .then((id)=> {
    data.id = id;
    res.status(200).send(data);
  })
  .catch((err)=> {
    res.status(422).send({errors: [{title: "Db Error", detail: err.message}]});
  });
}

module.exports.updateOperation = (req,res) =>{
  const {concept, amount, date, category} = req.body;
  const  id  = req.params.operationId;
  if(!concept || !amount || !date || !category) {
    return res.status(422).send({errors: [{title: "Missing parameters", detail: "Some parameters are missing"}]});
  }

  const data = {concept, amount, date, category, id};

  dbOperations.findOne(operationModel.find, {id})
  .then((result)=> {
    if (result.length > 0 && result[0].fk_user != res.locals.user.id) {
      throw new Error("Current user does not have access to requested operation");
    }
    return dbOperations.update(operationModel.update, {...data, conditions: [{key: "id"}]});
  })
  .then((result)=> {
    res.status(200).send(data);
  })
  .catch((err)=> {
    return res.status(422).send({errors: [{title: "Db Error", detail: err.message}]});
  })
}

module.exports.deleteOperation = (req,res) =>{
  const  id  = req.params.operationId;

  dbOperations.findOne(operationModel.find, {id})
  .then((result)=> {
    if (result.length > 0 && result[0].fk_user != res.locals.user.id) {
      throw new Error("Current user does not have access to requested operation");
    }
    return dbOperations.delete(operationModel.delete, {id, conditions: [{key: "id"}]});
  })
  .then((result)=> {
    res.status(200).send(result);
  })
  .catch((err)=> {
    return res.status(422).send({errors: [{title: "Db Error", detail: err.message}]});
  })
}
