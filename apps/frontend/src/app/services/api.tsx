const API_BASE_URL = '';

const getJobs = async (page: number) => {
  const response = await fetch(`/api/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const getJobById = async (jobId: number) => {
  const response = await fetch(`/api/job/${jobId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Export the functions
export { getJobs, getJobById };
