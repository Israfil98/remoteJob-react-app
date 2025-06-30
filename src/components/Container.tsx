import { Route, Routes } from 'react-router-dom';
import EmptyJobContent from './EmptyJobItemContent';
import JobItemContent from './JobItemContent';
import Sidebar from './Sidebar';

export default function Container() {
  return (
    <div className='container'>
      <Sidebar />
      <Routes>
        <Route
          path='/'
          element={<EmptyJobContent />}
        />
        <Route
          path='/:id'
          element={<JobItemContent />}
        />
      </Routes>
    </div>
  );
}
