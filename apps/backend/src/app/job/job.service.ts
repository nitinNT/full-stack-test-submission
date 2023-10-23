import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  @InjectRepository(Job)
  private readonly jobRepository: Repository<Job>;

  async getJobById(jobId: number) {
    return await this.jobRepository.findOneBy({
      id: jobId,
    });
  }
  async getAllJobs(queryParams: { page: number; limit: number }) {
    const { page, limit } = queryParams;
    const skip = (page - 1) * limit;

    const query = this.jobRepository
      .createQueryBuilder('job')
      .select([
        'job.id',
        'job.title',
        'job.location',
        'job.company',
        'job.postedDate',
        'job.description',
        'job.skills',
      ]);

    const [jobs, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}
