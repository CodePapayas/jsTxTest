const express = require('express');
const app = express();
const port = 3000;

const formParserMiddleware = require('./middlewares/formParser');
const routes = require('./routes');
const submitRoutes = require('./routes/submitRoutes');

// Use the formParser middleware
app.use(formParserMiddleware);

// Use the modularized routes
app.use(routes);
app.use('/', submitRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
