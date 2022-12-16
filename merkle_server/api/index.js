const template = require("./routesTemplate");
const cors = require('cors');
const {addAdress,mint} = require("./treeApi");
const routes = (app) => {
 
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Content-Type", "application/json");
    next();
  });
  app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
  app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "application/json");
    next();
  });
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

  app.use("/", template);
  app.post("/add-address", (req, res) => {
    addAdress(req, res);
  });

  app.post("/mint", (req, res) => {
    mint(req, res);
  });

  
};

module.exports = routes;
