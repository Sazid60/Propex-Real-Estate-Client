
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div className='font-gruppo'>
      <div>
        <div className="h-16">
          <Navbar></Navbar>
        </div>
        <div className='px-5 min-h-[calc(100vh-448px)]'>
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;