const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
const userRoutes = require('./routes/users');
const operationRoutes = require('./routes/operations');
const categoryRoutes = require('./routes/categories');

//API routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/operations', operationRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
