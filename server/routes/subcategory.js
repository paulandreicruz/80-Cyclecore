import  express  from "express";


const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";


//controllers
import { create, update, remove, list, read } from '../controllers/subcategory.js'




router.post('/subcategory', requireSignin, isAdmin, create);
router.put('/subcategory/:subcategoryId', requireSignin, isAdmin, update);
router.delete("/subcategory/:subcategoryId", requireSignin, isAdmin, remove);
router.get('/subcategories', list);
router.get("/subcategory/:slug", read);

export default router;