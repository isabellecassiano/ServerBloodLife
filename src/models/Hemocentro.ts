import { Entity, BeforeInsert, BeforeUpdate, Column, ObjectID, ObjectIdColumn } from "typeorm";
import { Min, Max, IsEmail, IsDateString, IsNumber } from "class-validator";


@Entity('hemocentro')
export default class Hemocentro {
    @ObjectIdColumn({unique: true})
    public _id: ObjectID;

    @Column({nullable: false, unique: true})
    @Min(14, {message: "CNPJ deve possuir 14 caracteres"})
    @Max(14, {message: "CNPJ deve possuir 14 caracteres"})
    public cnpj: string;

    @Column({nullable: false})
    @Min(6, {message: "Senha deve possuir no minimo 6 caracteres"})
    @Max(12, {message: "Senha deve possuir no maximo 12 caracteres"})
    public senha: string;

    @Column({nullable: false})
    @Max(10, {message: "Telefone deve possuir no minimo 10 caracteres"})
    @Max(12, {message: "Telefone deve possuir no maximo 12 caracteres"})
    public telefone: string;

    @Column({nullable: false})
    public endereco: string;

    @Column({nullable: false})
    @Min(8, {message: "CEP deve possuir 8 caracteres"})
    @Max(8, {message: "CEP deve possuir 8 caracteres"})
    public cep: string;

}