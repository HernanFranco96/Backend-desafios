const { Router } = require("express");

const {
    viewOrdenesController,
    createOrdenController
} = require("../controller/orders");

const ordenesRouter = Router();

ordenesRouter.get(`/`, viewOrdenesController);
ordenesRouter.post(`/`, createOrdenController);


module.exports = ordenesRouter;



