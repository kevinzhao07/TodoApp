import React, {useState} from 'react';
import { FaMoon, FaPlus } from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {

  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    // the data-testid is for accessing variables
    <header className="header" data-testid="header">  
      <nav>
        <div className="logo">
          <img src="/images/logo_alt.png" alt="todoist app"/>
        </div>
        <div className="settings">
          <ul>
            <li 
              data-testid="quick-add-task-action" 
              className="settings_add"
              onClick={() => {
                setShowQuickAddTask(true);
                setShouldShowMain(true);
              }}
            >
              <FaPlus />
            </li>
            <li 
              data-testid="dark-mode-action" 
              className="settings_darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaMoon />
            </li>
          </ul>
        </div>
      </nav>

      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />

    </header>
  );
}