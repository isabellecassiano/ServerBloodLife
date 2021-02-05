import * as express from "express";
import DoadorController from "./controllers/DoadorController";
import HemocentroController from "./controllers/HemocentroController";
import PedidoController from "./controllers/PedidoController";
import { doadorAuth } from "./middlewares/Doador";
import { hemocentroAuth } from "./middlewares/Hemocentro";

const routes = express.Router();


routes.get("/doadores", doadorAuth, DoadorController.index);
routes.post("/doadores", DoadorController.store);
routes.post("/doadores/auth", DoadorController.auth);


routes.get("/hemocentros", hemocentroAuth, HemocentroController.index);
routes.post("/hemocentros", HemocentroController.store);
routes.post("/hemocentros/auth", HemocentroController.auth);

routes.get("/hemocentros/pedidos", hemocentroAuth, PedidoController.index);
routes.get("/hemocentros/pedidos/:tipo_sanguineo", hemocentroAuth, PedidoController.index);
routes.post("/hemocentros/pedidos", hemocentroAuth, PedidoController.store);
routes.put("/hemocentros/pedidos", hemocentroAuth, PedidoController.update);
routes.delete("/hemocentros/pedidos", hemocentroAuth, PedidoController.delete);




export default routes;