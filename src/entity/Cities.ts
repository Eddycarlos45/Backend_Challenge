import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { IsNumber, IsPositive } from "class-validator";
import { IsNotBlank } from '../utils/validators'
import { Costumers } from "./Costumers";
import { States } from "./States";

@Entity()
export class Cities {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome da cidade não pode ser nulo' })
    name: string;

    @IsNumber()
    @IsPositive()
    @ManyToOne(() => States, state => state.cities)
    state: States;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @OneToMany(() => Costumers, costumers => costumers.city)
    costumers: Costumers

}