require('dotenv').config()
const express = require('express')
const app = express();
const morgan = require('morgan')
const { PORT = 3000 } = process.env
const waitOn = require('wait-on');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml')
const cors = require('cors')

const fs = require('fs')
const file = fs.readFileSync('./swagger.yaml', 'utf-8')
const swaggerDocument = YAML.parse(file)

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const transactionsRouter = require('./routes/transactions');
const authRouter = require('./routes/auth.routes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors())
app.use(morgan('dev'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/transactions', transactionsRouter);
app.use('/api/v1/auth', authRouter)


waitOn({ resources: [`tcp:localhost:${3001}`] })
  .then(() => {
    app.listen(PORT, () => console.log('Listening on port ', PORT));
  })
  .catch(err => {
    console.error('Error waiting for port:', err);
  });

module.exports = app;
