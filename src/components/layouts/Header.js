import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

export const Header = () => {
  return (
    // the data-testid is for accessing variables
    <header className="header" data-testid="header">  
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="todoist app"/>
        </div>
        <div className="settings">
          <ul>
            <li><FaPlus /></li>
            <li><FaMoon /></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}