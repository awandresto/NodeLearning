import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'int' })
        userId!: number;

    @Column({ type: 'varchar', nullable: false })
        token!: string;

    @Column({ type: 'timestamp', nullable: false })
        expiryDate!: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
        updateAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
        deleteAt: Date;
}

export const initTokenModel = (): typeof Token => {
    return Token;
};
