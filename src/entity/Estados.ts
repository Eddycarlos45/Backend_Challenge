import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IsNotBlank } from '../utils/validators'
import { Cidades } from "./Cidades";

@Entity()
export class Estados {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('char', { length: 2 })
    sigla: string

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome da cidade não pode ser nulo' })
    nome: string;

    @OneToMany(() => Cidades, cidade => cidade.estado)
    cidades: Cidades[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}