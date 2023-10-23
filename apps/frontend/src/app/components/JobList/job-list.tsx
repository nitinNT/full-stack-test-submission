import { useEffect, useState } from 'react';
import { getJobs } from '../../services/api';
import JobCard from './job-card';
import { useSearchParams } from 'react-router-dom';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 0, page: 1 });
  const [queryParams] = useSearchParams();
  const activePage = Number(queryParams.get('page') ?? 1);

  useEffect(() => {
    getJobs(activePage).then((resp) => {
      setJobs(resp['jobs']);
      setPagination(resp['pagination']);
    });
  }, [activePage]);
  const getPageNumbers = () => {
    const totalPages = Math.ceil(pagination['total'] / pagination['limit']);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <div>
      <div className="flex flex-col container mx-auto p-10 space-x-4">
        <p className="font-bold text-3xl text-center">Jobs List</p>
        <div className="p-4 flex flex-col space-y-4">
          {jobs.map((job: any) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <nav className="block">
            <ul className="flex">
              {getPageNumbers().map((page) => (
                <li key={page} className="mx-1">
                  <a
                    href={`/?page=${page}`}
                    className={`px-3 py-1 rounded-lg ${
                      page === activePage
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
