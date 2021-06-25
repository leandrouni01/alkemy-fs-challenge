const express = require('express');
const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(buildPath, 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
