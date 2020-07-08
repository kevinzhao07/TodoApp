import React from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';

// always using this syntax to export components
export const Tasks = () => {

  // get all specified tasks (use react hooks!)
  const { tasks } = useTasks('1');
  console.log(tasks);

  const projectName = '';

  return (
    <div className="tasks" data-testid="tasks">

      {/* has the classic jinja/django syntax */}
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks_list">

        {/* in order to get ALL tasks, map them (using keyword map) */}
        {tasks.map(task => (
          // syntax is a bit different for accessing values INSIDE an element
          <li key={`${task.id}`}> 
            <Checkbox id={task.id}/>
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

