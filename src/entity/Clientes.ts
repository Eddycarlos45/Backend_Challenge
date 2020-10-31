import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotBlank } from '../utils/validators'

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

    @Column("varchar", { length: 30 })
    @IsNotBlank('', { message: 'Cidade não pode ser nulo' })
    cidade: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}