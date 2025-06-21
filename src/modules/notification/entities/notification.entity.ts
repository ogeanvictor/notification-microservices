import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NotificationChannel } from './notification-channel.enum';
import { NotificationPriority } from './notification-priority.enum';

import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: NotificationChannel })
  channel: NotificationChannel;

  @Column({ type: 'varchar' })
  recipient: string;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'varchar' })
  data: string;

  @Column({ type: 'enum', enum: NotificationPriority })
  priority: NotificationPriority;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
