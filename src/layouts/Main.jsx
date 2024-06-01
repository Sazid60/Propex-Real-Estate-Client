import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <div className='container mx-auto '>
        <Navbar></Navbar>
        <div className=' container mx-auto px-5 min-h-[calc(100vh-448px)]'>
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;