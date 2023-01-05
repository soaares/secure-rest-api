import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import { verify } from 'jsonwebtoken'
import { checkToken } from './src/middlewares/check-token'

const app = express();
const PORT = 3000;

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(checkToken)

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);