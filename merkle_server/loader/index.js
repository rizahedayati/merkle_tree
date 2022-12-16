const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const routes = require("./../api");
const compression = require("compression");
// const cors = require('cors');
// const expressLayouts = require('express-ejs-layouts');

const { mongoConnection, securityCheck, logger } = require("./../lib");
const { initTree } = require("./../services/treeService");

class ExpressLoader {
  constructor() {
    const app = express();
    // app.use(expressLayouts);
    // app.set('veiw engine', 'ejs')
    
    mongoConnection();
    

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    //init require data

    this.main();
    // securityCheck(app);

    // Set up middleware
    app.use(morgan("dev"));
    app.use(compression());
    app.use(bodyParser.json({ limit: "20mb" }));
    routes(app);

    // Start application
    this.server = app.listen(process.env.PORT, () => {
      logger.info(`merkle app running, now listening on port ${process.env.PORT}`);
    });
  }

  async main() {
    try {
      // await createImages();
      await initTree();
    } catch (err) {
      logger.error(err);
    }
  }

  get Server() {
    return this.server;
  }

  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      success: false,
      error,
    });
  }
}

module.exports = ExpressLoader;
