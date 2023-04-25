import  express  from "express";


const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";


//controllers
import { create, update, remove, list, read } from '../controllers/brand.js'




router.post('/brand', requireSignin, isAdmin, create);
router.put('/brand/:brandId', requireSignin, isAdmin, update);
router.delete("/brand/:brandId", requireSignin, isAdmin, remove);
router.get('/brands', list);
router.get("/brand/:slug", read);

export default router;