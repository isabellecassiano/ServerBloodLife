import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Doador from "../models/Doador";
import { sign } from "jsonwebtoken";



class DoadorController {

    public async index(req: Request, res: Response): Promise<Response> {
        const doador = req.doador;
        delete doador.senha;
        delete doador._id;
        return res.status(200).json(doador);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        const doadorRepository = getRepository(Doador);
        
        const doador = doadorRepository.create(req.body);

        //const errors = await validate(doador);
        //if (errors.length > 0)
        //return res.status(400).json({success: false, message: errors[0].constraints});
        
        await doadorRepository.save(doador);
        return res.status(200).json({success: true, message: "Criado com sucesso", doador});

    }

    public async auth(req: Request, res: Response): Promise<Response> {
        const doadorRepository = getRepository(Doador);

        const { cpf, senha } = req.body;
        const doador = await doadorRepository.findOne({where: {cpf, senha}});
        
        if (!doador)
        return res.status(400).json({success: false, message: "CPF ou senha invalidos"});

        const ipAddress = req.ip;
        const token = sign({ cpf, senha, ipAddress }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({success: true, token});
    }
}


export default new DoadorController();