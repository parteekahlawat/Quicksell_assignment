import React, { useEffect, useState } from 'react';
import './App.css';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import TaskCard from './comps/card';
import UserColumn from './comps/priority';
import UserPage from './comps/userSort';
import Urgent from './comps/urgent';
// import axios from "axios";
// Main App Component
const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGroup, setGroup] = useState(false);
  const [isOpenOrder, setOrder] = useState(false);
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleGroup = ()=>{
    setGroup(!isOpenGroup);
  }
  const handleOrder = ()=>{
    setGroup(!isOpenGroup);
  }
  const groupings = ["Status", "User", "Priority"];

  return (
    <>
     <nav className="Navbar">
      <div className="navbar-content">
        {/* <div className="navbar-title">Navbar</div> */}
        <div className="dropdown">
        
          <button onClick={toggleDropdown} className="dropdown-btn">
            <img src='./img/Display.svg' className='display-icon'/>
          
            Display
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <div className='items'>
                <span className='dropdown-items'>Grouping</span>
                <button className='items-btn' onClick={handleGroup}><span>{grouping}</span> <img src='./img/down.svg'/></button>
                {
                  isOpenGroup && (
                    <div className='group-dropdown'>
                      <button className='drop-btn' onClick={()=>{setGrouping("Status"); setGroup(!isOpenGroup)}}>Status</button>
                      <button className='drop-btn' onClick={()=>{setGrouping("User"); setGroup(!isOpenGroup)}}>User</button>
                      <button className='drop-btn' onClick={()=>{setGrouping("Priority"); setGroup(!isOpenGroup)}}>Priority</button>
                      </div>
                  )
                }
                </div>
              
                <div className='items'>
                <span className='dropdown-items'>Ordering</span>
                <button className='items-btn' onClick={()=>setOrder(!isOpenOrder)}><span>{ordering}</span> <img src='./img/down.svg'/></button>
                {
                  isOpenOrder && (
                    <div className='group-dropdown'>
                      <button className='drop-btn' onClick={()=>{setOrdering("Title"); setOrder(!isOpenOrder)}}>Title</button>
                      <button className='drop-btn' onClick={()=>{setOrdering("Priority"); setOrder(!isOpenOrder)}}>Priority</button>
                      </div>
                  )
                }
                </div>
            </div>
          )}
        </div>
      </div>
    </nav>


    <div className="app-container">
      
      {
        grouping==="Status" ? <UserColumn sort={ordering}/> : ((grouping==="User") ? <UserPage sort={ordering}/> : <Urgent sort={ordering}/>)
      }
      {/* <UserColumn/> */}
      {/* <UserPage/> */}
      {/* <Urgent/> */}
    </div>
    </>
    
  );
};

export default App;
