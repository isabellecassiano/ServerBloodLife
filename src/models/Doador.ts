import { Entity, BeforeInsert, BeforeUpdate, Column, ObjectID, ObjectIdColumn } from "typeorm";
import { Min, Max, IsEmail, IsDateString } from "class-validator";
import { formatName } from "../utils";

@Entity('doador')
export default class Doador {

    @ObjectIdColumn({unique: true})
    public _id: ObjectID;

    @Column({unique: true, nullable: false})
    @Min(11)
    @Max(11)
    public cpf: string;

    @Column({nullable: false, unique: true})
    @IsEmail()
    public email: string;

    @Column({nullable: false})
    @Min(6, {message: "Senha deve conter no minimo 6 digitos."})
    @Max(12, {message: "Senha pode ter no maximo 12 caracteres."})
    public senha: string;

    @Column({nullable: false})
    @Min(6, {message: "Nome deve conter no minimo 6 caracteres."})
    @Max(255, {message: "Nome muito grande"})
    public nome: string;

    @Column({nullable: false})
    @IsDateString()
    public nascimento: string;

    @Column({nullable: false})
    @Min(1, {message: "Sexo invalido"})
    @Max(1, {message: "Sexo invalido"})
    public sexo: string;

    @Column({nullable: false})
    public endereco: string;

    @Column({nullable: false})
    public cep: string;

    @Column({nullable: false})
    @Min(2)
    @Max(3)
    public tipo_sanguineo: string;

    @Column({nullable: true})
    public telefone: string;

    @BeforeInsert()
    @BeforeUpdate()
    formatName() {
        this.nome = formatName(this.nome);
    }

    @BeforeInsert()
    @BeforeUpdate()
    formatEmail() {
        this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    @BeforeUpdate()
    formatSexo() {
        this.sexo = this.sexo.toUpperCase();
    }

}