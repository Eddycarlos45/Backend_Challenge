import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotBlank } from '../utils/validators'

@Entity()
export class Cidades {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome da cidade não pode ser nulo' })
    nome: string;

    @Column("varchar", { length: 50 })
    @IsNotBlank('', { message: 'Estado não pode ser nulo' })
    estado: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}