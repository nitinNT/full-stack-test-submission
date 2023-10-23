import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from '../dtos/create-job.dto';

@Controller()
export class JobController {

    constructor(private readonly jobService: JobService) {
    }


    @Get('jobs')
    async getAllJobs(@Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('category') category: string) {
        const jobs = await this.jobService.getAllJobs({ page, limit, category });
        return jobs;
    }

    @Get('job/:id')
    async getJob(@Param('id') id: number) {
        const job = await this.jobService.getJobById(id);
        return job;
    }

    @Post('job')
    async createJob(@Body() createJobDto: CreateJobDto) {
        const job = await this.jobService.createJob(createJobDto);
        return job;
    }

}
