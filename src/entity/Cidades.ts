import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { IsNumber, IsPositive } from "class-validator";
import { IsNotBlank } from '../utils/validators'
import { Clientes } from "./Clientes";
import { Estados } from "./Estados";

@Entity()
export class Cidades {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome da cidade não pode ser nulo' })
    nome: string;

    @IsNumber()
    @IsPositive()
    @ManyToOne(() => Estados, estado => estado.cidades)
    estado: Estados;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @OneToMany(() => Clientes, clientes => clientes.cidade)
    clientes: Clientes

}