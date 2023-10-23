import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  salary: string;

  @Column({ name: 'posted_date' },)
  postedDate: Date;

  @Column({ nullable: true })
  skills: string;

  @Column({ name: 'application_deadline' })
  applicationDeadline: Date;

  @Column()
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
