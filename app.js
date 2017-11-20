var express = require('express');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var bodyparser = require('body-parser');
const router = express.Router();
const app = express();


app.listen(3000, function () {
  console.log('chicken Pedro is listening');
})


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');


let totalMins;
app.get('/', function (req, res, next) {
  let obj = {};
  if (totalMins) {
    obj.totalMins = totalMins;
  }
  res.render('chicken');
})

app.post('/', function (req, res, next) {
  console.log(req.body)
  let hour = +req.body.hours;
  let min = +req.body.minutes;
  totalMins = (hour * 60) + min;
  res.send('Your chicken has been set to ' + totalMins + ' minutes from now!');
})

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
})

module.exports =  totalMins


