import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Hemocentro from "../models/Hemocentro";


interface TokenPayload {
    cnpj: string;
    senha: string;
    ipAddress: string;
}

export const hemocentroAuth = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const hemocentroRepository = getRepository(Hemocentro);
        const token = req.header('Authorization').replace("Bearer", "").trim();
        const tokenPayload = verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;

        if (req.ip != tokenPayload.ipAddress)
        return res.status(400).json({success: false, message: "Sessão invalida"});
        
        const hemocentro = await hemocentroRepository.findOne({where: {cnpj: tokenPayload.cnpj, senha: tokenPayload.senha}});
        if (!hemocentro)
        return res.status(400).json({success: false, message: "Sessão invalida"});

        req.hemocentro = hemocentro;
        next();
    }
    catch {
        return res.status(400).json({success: false, message: "Você não está autenticado"});
    }
}