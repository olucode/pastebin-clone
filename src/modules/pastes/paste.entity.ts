import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/users.entity';

@Entity()
@Index('IDX_SHORTCODE_EXPIRY_DATE', ['shortCode', 'expiryDate'])
export class Paste {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @Column()
  shortCode: string;

  @Column('datetime', {
    nullable: true,
  })
  expiryDate: Date;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
