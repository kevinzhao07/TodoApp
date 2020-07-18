import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { firebase } from '../firebase';

// always using this syntax to export components
export const Tasks = () => {

  // use our context in order to get the selectedProjects and projects
  const { selectedProject } = useSelectedProjectValue(); 
  const { projects } = useProjectsValue();

  // get all specified tasks (use react hooks!)
  const { tasks } = useTasks(selectedProject);

  let projectName = '';
  
  // if our selectedProject was one of (inbox, tomorrow, next 7), get those. 
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  // getting regular tasks (if exists) that are not inbox, tomorrow, or next 7
  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  // whenever we select a new project, we update the document's title tag. 
  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  useEffect(() => {

    async function deleteArchived() {
      const archivedTasks = firebase.firestore().collection('tasks');
      const snapshot = await archivedTasks.where('archived', '==', true).get();
      snapshot.forEach(task => {
        firebase
          .firestore()
          .collection('tasks')
          .doc(task.id)
          .delete()
        
        firebase
          .firestore()
          .collection('deleted-tasks')
          .add({
            projectId: task.data().projectId,
            userId: task.data().userId,
            task: task.data().task,
            date: task.data().date,
          })

      });
    }
    deleteArchived();
  },[]);

  return (

    <div className="tasks" data-testid="tasks">

      {/* has the classic jinja/django syntax */}
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks_list">

        {/* in order to get ALL tasks, map them (using keyword map) */}
        {tasks.map((task) => (
          // syntax is a bit different for accessing values INSIDE an element
          <li key={`${task.id}`}> 
            <Checkbox 
              id={task.id} 
              archived={task.archived ? true : false}
            />
            <div className={task.projectName ? 'item' : 'item item_short'}>
              <span className={task.archived ? "tasks_task crossed-out" : "tasks_task"}>{task.task}</span>
            </div>

            <div className="tasks_information">
              {collatedTasksExist(selectedProject) && task.projectName && (
                <span className="associated-project">
                  {task.projectName}
                </span>
              )}

              <span>
                {task.date && (
                  <small className="tasks_display-date">Due: {task.date}</small>
                )}
                {!task.date && (
                  <small className="tasks_display-date">No due date</small>
                )}
              </span>
            </div>

          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
}
