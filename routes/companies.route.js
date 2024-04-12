import { Router } from 'express';
import fetchCompanies from '../controllers/fetchCompanies.controller.js';
import chechCurrencies from '../middlewares/chechCurrencies.middleware.js';

const companiesRouter = Router();

companiesRouter.route("/currency").post(chechCurrencies,fetchCompanies);

export default companiesRouter;
