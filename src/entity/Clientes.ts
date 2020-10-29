import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    nome_completo: string;

    @Column("varchar", { length: 10 })
    sexo: string;

    @Column()
    data_de_nascimento: Date;

    @Column("varchar", { length: 3 })
    idade: string;

    @Column("varchar", { length: 30 })
    cidade: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}