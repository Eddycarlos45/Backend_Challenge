import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IsNotBlank } from '../utils/validators';
import { Cities } from "./Cities";

@Entity()
export class States {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('char', { length: 2 })
    sigla: string;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome do estado não pode ser nulo' })
    name: string;

    @OneToMany(() => Cities, city => city.state)
    cities: Cities[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}