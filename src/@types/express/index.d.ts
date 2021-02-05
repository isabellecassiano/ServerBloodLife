import Doador from "../../models/Doador";
import Hemocentro from "../../models/Hemocentro";

declare global {
    namespace Express {
        export interface Request {
            doador?: Doador;
            hemocentro?: Hemocentro;
        }
    }
}