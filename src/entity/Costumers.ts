import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotBlank } from '../utils/validators'
import { Cities } from './Cities';
import { IsPositive, IsNumber } from 'class-validator'

@Entity()
export class Costumers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    @IsNotBlank('', { message: 'Nome não pode ser nulo' })
    fullname: string;

    @Column("varchar", { length: 10 })
    gender: string;

    @Column()
    birthday: Date;

    @Column("varchar", { length: 3 })
    age: string;

    @IsNumber()
    @IsPositive()
    @ManyToOne(() => Cities, cities => cities.costumers)
    city: Cities;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}