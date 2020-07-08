import React from 'react';
import { FaMoon, FaPlus } from 'react-icons/fa';

export const Header = () => {
  return (
    // the data-testid is for accessing variables
    <header className="header" data-testid="header">  
      <nav>
        <div className="logo">
          <img src="/images/logo_alt.png" alt="todoist app"/>
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings_add"><FaPlus /></li>
            <li data-testid="dark-mode-action" className="settings_darkmode"><FaMoon /></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}