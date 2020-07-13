import React, { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

// always using this syntax to export components
export const Tasks = () => {

  // use our context in order to get the selectedProjects and projects
  const { selectedProject } = useSelectedProjectValue(); 
  const { projects } = useProjectsValue();

  // get all specified tasks (use react hooks!)
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  // getting regular tasks (if exists) that are not inbox, tomorrow, or next 7
  if (projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  // if our selectedProject was one of (inbox, tomorrow, next 7), get those. 
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  // whenever we select a new project, we update the document's title tag. 
  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });


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
      <AddTask />
    </div>
  );
}

