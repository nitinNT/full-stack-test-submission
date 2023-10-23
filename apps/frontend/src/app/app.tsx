import Navbar from './components/Navbar/navbar';
import JobList from './components/JobList/job-list';

import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
      </Routes>
    </div>
  );
}

export default App;
