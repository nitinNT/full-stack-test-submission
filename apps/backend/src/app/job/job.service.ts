import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from '../dtos/create-job.dto';

@Injectable()
export class JobService {

    constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) { }


    async getJobById(jobId: number) {
        return await this.jobRepository.findOneBy({
            id: jobId
        })
    }
    async getAllJobs(queryParams: { page: number; limit: number; category: string }) {
        const { page, limit, category } = queryParams;
        const skip = (page - 1) * limit;

        const query = this.jobRepository.createQueryBuilder('job').select(['job.id','job.title', 'job.location', 'job.company', 'job.postedDate', 'job.description']);

        if (category) {
            query.where('job.category = :category', { category });
        }

        const [jobs, total] = await query
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            jobs,
            pagination: {
                page,
                limit,
                total,
            },
        };
    }
    async createJob(createJobDto: CreateJobDto): Promise<Job> {
        const newJob = this.jobRepository.create(createJobDto);
        return await this.jobRepository.save(newJob);
    }
}
