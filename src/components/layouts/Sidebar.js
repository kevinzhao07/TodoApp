import React, { useState } from 'react';
import { FaInbox, FaCalendarDay, FaCalendarWeek, FaChevronDown, FaRocket } from 'react-icons/fa';
// allows us to get the project that is currently selected.
import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar_generic">

        {/* inbox */}
        <li 
          data-testid="inbox" 
          className={active === 'inbox' ? 'active' : undefined} 
          onClick={() => {
            setActive('inbox'); 
            setSelectedProject('INBOX');
          }}
        >
          <span><FaInbox /></span><span>Inbox</span>
        </li>

        {/* today */}
        <li 
          data-testid="today" 
          className={active === 'today' ? 'active' : undefined} 
          onClick={() => {
            setActive('today'); 
            setSelectedProject('TODAY');
          }}
        >
          <span><FaCalendarDay /></span><span>Today</span>
        </li>
        
        {/* next 7 */}
        <li 
          data-testid="next_7" 
          className={active === 'next_7' ? 'active' : undefined} 
          onClick={() => {
            setActive('next_7'); 
            setSelectedProject('NEXT_7');
          }}
        >
          <span><FaCalendarWeek /></span><span>Next 7 Days</span>
        </li>

        {/* further goals */}
        <li 
          data-testid="goals" 
          className={active === 'goals' ? 'active' : undefined} 
          onClick={() => {
            setActive('goals'); 
            setSelectedProject('GOALS');
          }}
        >
          <span><FaRocket /></span><span>Goals</span>
        </li>

      </ul>

      <div className="sidebar_middle" onClick={() => setShowProjects(!showProjects)}>
        <span>< FaChevronDown className={!showProjects ? 'hidden-projects' : undefined}/></span>
        <h2> Projects </h2>
      </div>

      <ul className="sidebar_projects">
        { showProjects && <Projects />}
      </ul>
      { showProjects && <AddProject />}
    </div>
  );
}