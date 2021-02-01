const express = require('express');
const dotenv = require("dotenv");
const db = require('./config');
var cors = require('cors')

const userRouter = require('./routes/user');
const agentRouter = require('./routes/agent');
const authRouter = require('./routes/authentication');

const tokenValidation = require('./middlewares/tokenvalidation');

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(authRouter)
app.use("/api/users", tokenValidation, userRouter);
app.use("/api/agents", tokenValidation, agentRouter);

app.listen(PORT, () => {
    console.log('Server starte at : '+PORT);
})