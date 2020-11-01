import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotBlank } from '../utils/validators'
import { Cidades } from './Cidades';
import { IsPositive, IsNumber } from 'class-validator'

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome não pode ser nulo' })
    nome_completo: string;

    @Column("varchar", { length: 10 })
    sexo: string;

    @Column()
    data_de_nascimento: Date;

    @Column("varchar", { length: 3 })
    idade: string;

    @IsNumber()
    @IsPositive()
    @ManyToOne(() => Cidades, cidades => cidades.clientes)
    cidade: Cidades;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}