import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'Get all jobs' })
  async getAllJobs(@Query('page') page = 1, @Query('limit') limit = 10) {
    const jobs = await this.jobService.getAllJobs({ page, limit });
    return jobs;
  }

  @Get('job/:id')
  @ApiOperation({ summary: 'Get a job by ID' })
  async getJob(@Param('id') id: number) {
    const job = await this.jobService.getJobById(id);
    return job;
  }
}
