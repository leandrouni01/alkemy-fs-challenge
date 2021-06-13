const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//Midlewares
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
