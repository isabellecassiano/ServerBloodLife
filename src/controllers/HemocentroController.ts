import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Hemocentro from "../models/Hemocentro";



class HemocentroController {

    public async index(req: Request, res: Response): Promise<Response> {
        const hemocentro = req.hemocentro;
        delete hemocentro.senha;
        delete hemocentro._id;
        return res.status(200).json(hemocentro);
    }

    public async store(req: Request, res: Response) {
        const hemocentroRepository = getRepository(Hemocentro);

        const hemocentro = hemocentroRepository.create(req.body);

        //const errors = await validate(hemocentro);
        //if (errors.length > 0)
        //return res.status(400).json({success: false, message: errors[0].constraints});

        await hemocentroRepository.save(hemocentro);
        return res.status(200).json({success: true, message: "Criado com sucesso", hemocentro});
    }

    public async auth(req: Request, res: Response) {
        const hemocentroRepository = getRepository(Hemocentro);
        const { cnpj, senha } = req.body;

        const hemocentro = hemocentroRepository.findOne({where: {cnpj, senha}});
        if (!hemocentro)
        return res.status(400).json({success: false, message: "CNPJ ou senha invalidos"});

        const ipAddress = req.ip;
        const token = sign({cnpj, senha, ipAddress}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({success: true, token});
    }
}

export default new HemocentroController();