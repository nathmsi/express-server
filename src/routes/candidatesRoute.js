const express = require('express');
const candidateRouter = express.Router();

const candidatesController = require('../controllers/candidatesController');

const requireAuth = require('../middlewares/requireAuth');



// GET
candidateRouter.get('/', requireAuth , candidatesController.getlistCandidates);



module.exports = candidateRouter;