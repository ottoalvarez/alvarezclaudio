import { Router } from "express";
import { getToken } from "../controllers/ClaimToken.js";

const routeAuth = Router();
routeAuth.post('/claimtoken', getToken);

export default routeAuth;