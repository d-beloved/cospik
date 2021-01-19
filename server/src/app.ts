import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import router from './routes';


// Set up the express app
const app = express();
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});
// set the port for the server
// const port = process.env.PORT || 3110;
// app.listen(port, () => {
//   console.log(`Cospik api is running on port ${port}!`);
// });

// Parse incoming requests data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api-docs', express.static(path.join(__dirname, '../build')));

// Log requests to the console.
app.use(logger('dev'));

// set router for api endpoints
app.use('/api', router);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../nativeClient/index.html'));
// });

// This will be our application entry. Our server is setup here.

export default app;
