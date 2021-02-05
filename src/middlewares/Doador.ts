import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Doador from "../models/Doador";


interface TokenPayload {
    cpf: string;
    senha: string;
    ipAddress: string;
}

export const doadorAuth = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const doadorRepository = getRepository(Doador);
        const token = req.header('Authorization').replace("Bearer", "").trim();
        const tokenPayload = verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;

        if (req.ip != tokenPayload.ipAddress)
        return res.status(400).json({success: false, message: "Sessão invalida"});

        const doador = await doadorRepository.findOne({where: {cpf: tokenPayload.cpf, senha: tokenPayload.senha}});
        if (!doador)
        return res.status(400).json({success: false, message: "Sessão invalida"});

        req.doador = doador;
        next();
    }
    catch {
        return res.status(400).json({success: false, message: "Você não está autenticado"});
    }
}