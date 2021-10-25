import { Expose } from 'class-transformer';
import * as moment from 'moment';
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

// Sqlite
const dateColumnType =
  process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz';
@Entity()
@Index('IDX_SHORTCODE_EXPIRY_DATE', ['shortCode', 'expiryDate'])
export class Paste {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @Column('varchar')
  shortCode: string;

  @Column({
    type: dateColumnType,
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

  @Expose()
  public get isPasteExpired(): boolean {
    return moment().isAfter(this.expiryDate);
  }
}
