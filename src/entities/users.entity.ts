import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'varchar', length: 128, nullable: false })
        name!: string;
    
    @Column({ type: 'varchar', length: 128, unique: true, nullable: false })
        email!: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false })
        password!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
        updateAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
        deleteAt: Date;
}