import { Entity, BeforeInsert, Column, ObjectID, ObjectIdColumn, BeforeUpdate } from "typeorm";
import { nanoid } from "nanoid";
import { PedidoStatus, Urgencia } from "../enums";


@Entity('pedido')
export default class Pedido {
    @ObjectIdColumn()
    public _id: ObjectID;

    @Column({unique: true, nullable: false})
    public orderId: string;

    @Column({nullable: false})
    public hemocentro_cnpj: string;

    @Column({nullable: false})
    public tipo_sanguineo: string;

    @Column({nullable: false})
    public quantidade: number;

    @Column({nullable: false, default: Urgencia.BAIXA})
    public urgencia: number;

    @Column("int", {nullable: false, default: PedidoStatus.ANDAMENTO})
    public status: number;

    @Column("array", {nullable: false})
    public doadoresCadastradosIds: string[];

    @BeforeInsert()
    generateId?() {
        this.orderId = nanoid(6);
    }

    @BeforeInsert()
    formatDoadoresCadastradosId?() {
        this.doadoresCadastradosIds = [];
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    formatStatus?() {
        if (this.status == null)
        this.status = PedidoStatus.ANDAMENTO;
    }

}