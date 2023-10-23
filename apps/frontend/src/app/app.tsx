import Navbar from './components/Navbar/navbar';
import JobList from './components/JobList/job-list';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
