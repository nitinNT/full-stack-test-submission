import { useEffect, useState } from 'react';
import { getJobById } from '../../services/api';
import Markdown from 'react-markdown';

type JobCardProps = {
  id: number;
  company: string;
  title: string;
  description: string;
  skills: string;
  postedDate: string;
  location: string;
};
const JobDetailsModal = (props: any) => {
  const [s, se] = useState();
  useEffect(() => {
    getJobById(props.id).then((r) => {
      console.log(r);
      se(r.details);
    });
  }, [props.id]);
  return (
    <div
      className={`${
        props.isOpen ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden'
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="relative z-50 w-full max-w-3xl p-4 sm:p-8">
          <div className="relative transform bg-white text-left shadow-xl rounded-lg">
            <div className="p-4 sm:p-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {props.title}
              </h3>
              <p className="text-gray-500 mt-2">
                {props.company} , {props.location}
              </p>
              <p className="text-gray-500 mt-2">{props.salary}</p>
              <Markdown className="overflow-hidden">{s}</Markdown>
              <div className="mt-4 overflow-hidden">{props.description}</div>
            </div>

            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-equal">
              <button
                type="button"
                className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-400"
              >
                Apply
              </button>
              <button
                type="button"
                className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md bg-white text-gray-900 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={props.closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function JobCard(props: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full">
      <div className="border border-gray-300 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {props.company + ' - ' + props.title}
          </div>
          <p className="text-gray-700 text-base w-full line-clamp-3">
            {props.description}
          </p>
        </div>
        <div className="flex flex-row">
          {props.skills?.split(',').map((e, index) => (
            <div
              key={index}
              className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-green-200 text-green-700 rounded-full"
            >
              {e}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-2">
            <button
              onClick={openModal}
              className="text-blue-500 hover:underline"
            >
              View Details
            </button>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">
              Posted on {new Date(props.postedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <JobDetailsModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        {...props}
      />
    </div>
  );
}
