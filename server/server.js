import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection';
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 5000;

// HTTP GET Request
app.get('/', (req, res) => {
  res.status('201').json('Home GET Request');
});

// start server hanya ketika memiliki valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log('Cannpt connect to the server');
    }
  })
  .catch((error) => {
    console.log('Invalid database connection');
  });
