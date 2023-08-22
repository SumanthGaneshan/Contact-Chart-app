// Navbar.js
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

interface RouteInfo {
  path: string;
  title: string;
}

const Navbar: FC = () => {
  const location = useLocation();
  const pageTitle = getTitleForPath(location.pathname);

  return <div className="navbar">{pageTitle}</div>;
};

const getTitleForPath = (path: string): string => {
  const routes: RouteInfo[] = [
    { path: '/', title: 'Contact Page' },
    { path: '/CreateContact', title: 'Contact Page' },
    { path: '/ChartsAndMaps', title: 'Charts and Maps' },
    // Add more routes as needed
  ];

  const matchingRoute = routes.find((route) => route.path === path);
  return matchingRoute ? matchingRoute.title : 'Unknown Page';
};

export default Navbar;
