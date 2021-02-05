import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Pedido from "../models/Pedido";



class PedidoController {
    public async index(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = getRepository(Pedido);
        const { tipo_sanguineo } = req.params;
        if (tipo_sanguineo) {
            const order = await pedidoRepository.findOne({where: {hemocentro_cnpj: req.hemocentro.cnpj, tipo_sanguineo}});
            return res.status(200).json(order);
        }

        const orders = await pedidoRepository.find({where: {hemocentro_cnpj: req.hemocentro.cnpj}});
        orders.forEach(order => delete order._id);
        return res.status(200).json(orders);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        const { tipo_sanguineo, quantidade, urgencia, status } = req.body;
        const pedidoRepository = getRepository(Pedido);
        const order = pedidoRepository.create({
            tipo_sanguineo,
            quantidade,
            urgencia: Number.parseInt(urgencia),
            status: Number.parseInt(status),
            hemocentro_cnpj: req.hemocentro.cnpj,
        });

        const orderFound = await pedidoRepository.findOne({where: {hemocentro_cnpj: req.hemocentro.cnpj, tipo_sanguineo}});

        if (orderFound)
        return res.status(400).json({success: false, message: "Pedido já existente"});

        const createdOrder = await pedidoRepository.save(order);
        if (!createdOrder)
            return res.status(400).json({success: false, message: "Falha ao registrar pedido"});

        return res.status(200).json({ success: true, message: "Pedido criado com sucesso\nIdentificação: " + createdOrder.orderId });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = getRepository(Pedido);

        const { tipo_sanguineo, status, quantidade, urgencia } = req.body;
        let pedido = await pedidoRepository.findOne({where: {tipo_sanguineo}});
        if (!pedido)
            return res.status(400).json({success: false, message: "Falha ao encontrar pedido"});

        pedido = {...pedido, orderId: pedido.orderId, status, quantidade, urgencia };
        await pedidoRepository.save(pedido);
        return res.status(200).json({success: true, message: "Pedido atualizado com sucesso"});
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = getRepository(Pedido);
        
        const { tipo_sanguineo } = req.body;
        const order = await pedidoRepository.findOne({where: {tipo_sanguineo}});
        if (!order)
            return res.status(400).json({success: false, message: "Falha ao encontrar pedido"});

        await pedidoRepository.remove(order);
        return res.status(200).json({success: true, message: "Pedido deletado com sucesso"});
    }
}


export default new PedidoController();