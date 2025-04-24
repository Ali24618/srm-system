import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/add';
import Home from './components/home';
import Admin from './components/adminpanelforadmins';
import Doctors from './components/doctors';
import Users from './components/users';
import Category from './components/category';
import Adddoc from './components/adddoc';
import Doclist from './components/doclist';
import AddGroup from './components/add_group';
import Services from './components/services';
import Servicesid from './components/servicesid';
import Reviews from './components/reviews';
import Edit from './components/edit';
import Docusers from './components/doctorsusers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/adminpanelforadmins" element={<Admin />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/adddoc" element={<Adddoc />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/doctorusers" element={<Docusers/>} />
          <Route path="/doclist/:id" element={<Doclist />} />
          <Route path="/add_group/:id" element={<AddGroup />} />
          <Route path="/servicesid/:id" element={<Servicesid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
