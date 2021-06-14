const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//Midlewares
app.use(express.json());
app.use(express.urlencoded());

//Routes
const userRoutes = require('./routes/users');


//API routes
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
