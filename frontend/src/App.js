import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/404';
import AddEvent from './pages/add-event';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new/event' element={<AddEvent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
