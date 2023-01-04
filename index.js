import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import { verify } from 'jsonwebtoken'

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        verify(request.headers.authorization.split(' ')[1], 'security-api', (error, decode) => {
            if (error) request.user = undefined
            request.user = decode
            next()
        })
    } else {
        console.log('else')
        request.user = undefined
        next()
    }
})

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);