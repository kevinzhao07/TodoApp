import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getProject, getCollatedProject, collatedTasksExist } from '../helpers';
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
    projectName = getCollatedProject(collatedTasks, selectedProject).name;
  }

  // getting regular tasks (if exists) that are not inbox, tomorrow, or next 7
  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getProject(projects, selectedProject).name;
  }

  // whenever we select a new project, we update the document's title tag. 
  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  // on first load of the page, delete all archived values
  useEffect(() => {

    async function deleteArchived() {
      const archivedTasks = firebase.firestore().collection('tasks');
      const snapshot = await archivedTasks.where('archived', '==', true).get();
      snapshot.forEach(task => {
        
        // save all our archvied tasks to deleted, so we can look back
        firebase
          .firestore()
          .collection('deleted-tasks')
          .add({
            projectId: task.data().projectId,
            userId: task.data().userId,
            task: task.data().task,
            date: task.data().date,
          })
        
        // // decrement remaining tasks (TODO: need to test)
        // firebase
        //   .firestore()
        //   .collection('projects')
        //   .where('projectId','==', task.data().projectId)
        //   .get()
        //   .then(snapshot => {
        //     snapshot.forEach(project => {
        //       const newCount = (project.data().count - 1) >= 0 ? project.data().count - 1 : 0;
        //       project.ref.update({
        //         count: newCount,
        //       })
        //     })
        //   })
        
        task.ref.delete();

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
            <div className={collatedTasksExist(selectedProject) && task.projectName ? 'item' : 'item item_short'}>
              <span className={task.archived ? "tasks_task crossed-out" : "tasks_task"}>{task.task}</span>
            </div>

            <div className="tasks_information">
              {collatedTasksExist(selectedProject) && task.projectName && (
                <span className="associated-project" style={{backgroundColor: task.color}}>
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
