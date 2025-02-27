import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/add';
import Home from './components/home';
import Admin from './components/admin';
import Doctors from './components/doctors';
import Users from './components/users';
import Category from './components/category';
import Adddoc from './components/adddoc';
import Doc from './components/doclist';
import Doclist from './components/doclist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/adddoc" element={<Adddoc />} />
          <Route path="/doclist/:id" element={<Doclist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
