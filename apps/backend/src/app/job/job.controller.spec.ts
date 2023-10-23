import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
describe('JobController', () => {
  let jobController: JobController;
  let jobService: JobService;

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
      controllers: [JobController],
      providers: [
        // {
        //   provide: JobService,
        //   useValue: {
        //     getJobById: jest.fn().mockReturnValue(mockJob),
        //     getAllJobs: jest.fn().mockReturnValue({ jobs: [mockJob], pagination: { page: 1, limit: 1, total: 10 } })
        //   },

        // },
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository, // Mock the repository class
        },
      ],
    }).compile();

    jobController = module.get<JobController>(JobController);
    jobService = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(jobController).toBeDefined();
  });

  describe('getAllJobs', () => {
    it('should return an array of jobs', async () => {
      jest.spyOn(jobService, 'getAllJobs').mockResolvedValue({
        jobs: [mockJob],
        pagination: {
          page: 1,
          limit: 1,
          total: 10,
        },
      });

      const result = await jobController.getAllJobs(1, 10);

      expect(result['jobs']).toEqual([mockJob]);
    });
  });

  describe('getJob', () => {
    it('should return a job by ID', async () => {
      const jobId = 1;

      jest.spyOn(jobService, 'getJobById').mockResolvedValue(mockJob);

      const result = await jobController.getJob(jobId);

      expect(result).toEqual(mockJob);
    });
  });
});
