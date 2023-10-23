import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { Job } from './job.entity';

describe('JobService', () => {
  let jobService: JobService;
  let jobRepository: Repository<Job>;

  const mockJob = {
    applicationDeadline: new Date(),
    category: '',
    company: '',
    createdAt: new Date(),
    description: '',
    details: '',
    id: 1,
    location: 'mim',
    postedDate: new Date(),
    salary: '100',
    skills: 'python,node',
    title: '',
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),

          useClass: Repository, // Mock the repository class
        },
      ],
    }).compile();

    jobService = module.get<JobService>(JobService);
    jobRepository = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  it('should be defined', () => {
    expect(jobService).toBeDefined();
  });

  describe('getJobById', () => {
    it('should return a job by ID', async () => {
      const jobId = 1;
      jest.spyOn(jobRepository, 'findOneBy').mockResolvedValue(mockJob);

      const result = await jobService.getJobById(jobId);

      expect(result).toEqual(mockJob);
    });
  });
});
