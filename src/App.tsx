import React, { FC } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Contact from './components/contact/Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewContact from './components/contact/NewContact';
import Chart from './components/ChartsMaps/Chart';
import { QueryClient, QueryClientProvider } from 'react-query';


const App: FC = () => {
  const queryClient = new QueryClient();
  return <div>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar/>
        <Sidebar />
        <Routes>


          <Route path="/" element={<Contact />} />
          <Route path="/CreateContact" element={<NewContact />} />
          <Route path="/ChartsAndMaps" element={<Chart />} />


        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </div>
}

export default App;
