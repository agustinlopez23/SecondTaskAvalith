function date(req, res, next) {
  req.date = new Date();
  next();
}

function today(req, res, next) {
  let today = req.date;
  req.today = today.getToday();
  next();
}
function month(req, res, next) {
  let month = req.date;
  req.month = month.getMonth();
  next();
}
function year(req, res, next) {
  let year = req.date;
  req.year = year.getYear();
  next();
}
function helloWorld(req, res, next) {
  let HelloWorld = `New request! its ${req.date}`;
  console.log(HelloWorld);
  next();
}

let dates = {
  date,
  today,
  month,
  year,
  helloWorld,
};
module.exports = dates;
