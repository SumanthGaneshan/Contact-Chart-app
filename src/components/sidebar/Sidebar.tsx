import React, { useState, FC } from 'react';
import './Sidebar.css';
import { Outlet, Link } from "react-router-dom";

import { BsArrowRightSquare } from 'react-icons/bs';




const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="parent">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <BsArrowRightSquare className={`toggle-button ${!isOpen && 'toggle-open'}`} onClick={toggleSidebar} />
        <ul className="sidebar-items">
          <Link to='/' className='s-item'>Contact</Link>
          <Link to='/ChartsAndMaps' className='s-item'>Charts and Maps</Link>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
