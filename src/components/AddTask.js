import React, { useState } from 'react';
import { FaRegCalendarAlt, FaRegListAlt, FaTimes } from 'react-icons/fa';
import { firebase } from '../firebase';
import moment from 'moment';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

// showAddTaskMain (should the main view show an add task button?) / showShouldMain (should the main view show the dropdown? FALSE if not clicked)
// showQuickAddTask (should the header show quick add?) / setShowQuickAddTask (set false when quick add is finished/cancelled)
export const AddTask = ({ showAddTaskMain = true, shouldShowMain = false, showQuickAddTask, setShowQuickAddTask }) => {

  // setting up our variables that we will use in AddTask.
  const [task, setTask] = useState(''); // task that is being added
  const [taskDate, setTaskDate] = useState(''); // which date it's being added
  const [taskDay, setTaskDay] = useState('');
  const [project, setProject] = useState(''); // does it belong to a project?
  const [showMain, setShowMain] = useState(shouldShowMain); // show the addTask overlay in main? default no.
  const [showProjectOverlay, setShowProjectOverlay] = useState(false); // show the project overlay? default no, unless pressed.
  const [showTaskDate, setShowTaskDate] = useState(false); // show the task due date? default no, unless pressed.
  const [projectName, setProjectName] = useState(''); // show selected projectName
  const [updatedProject, setUpdatedProject] = useState(''); // which project was altered? (find the docId) add 1 to tasks
  
  const { selectedProject } = useSelectedProjectValue(); // context for adding tasks INTO the selected project (quick add).
  const { projects } = useProjectsValue();

  // resets to all original values for next task to be added
  const resetAll = () => {
    setTask('');
    setTaskDay('');
    setTaskDate('');

    setProject('');
    setProjectName('');
    setUpdatedProject('');

    setShowMain(false);
    setShowProjectOverlay(false);
    setShowTaskDate(false);
  }

  // calling firestore to add the task in
  const addTask = () => {
    const projectId = project || selectedProject; // not a traditional 'or' statement. the project id is project, else selectedProject.
    let collatedDate = ''; // what date is our task due? (IF NOT SET BY TASK DATE IN THE DROPDOWN!)
    let name = '';
    let docId = '';

    if (projectId === "TODAY") { // if we are ADDING our task to Project-TODAY, then the date is today
      collatedDate = moment().format('MM/DD/YYYY')
      setTaskDay(moment().format('dddd'));
    }
    else if (projectId === "NEXT_7") { // if we are ADDING our task to Project-NEXT_7, then the date is 7 days from today
      collatedDate = moment().add(7, 'days').format('MM/DD/YYYY')
      setTaskDay(moment().add(7, 'days').format('dddd'));
    }

    // find the name of the project (if NO PROJECT SELECTED)
    for (var i = 0; i < projects.length; ++i) {
      if (projects[i].projectId === projectId) {
        name = projects[i].name;
        docId = projects[i].docId;
      }
    }

    // keeps increment of how many total tasks for EACH project
    // const updateValue = async () => {
    //   if (!updatedProject && !(collatedTasksExist(selectedProject))) {
    //     const projectReferences = firebase.firestore().collection('projects');
    //     const snapshot = await projectReferences.doc(docId).get();
    //     const newCount = snapshot.data().count + 1;
    //     snapshot.ref.update({
    //       count: newCount,
    //     });
    //   }
    //   if (updatedProject) {
    //     const projectReferences = firebase.firestore().collection('projects');
    //     const snapshot = await projectReferences.doc(updatedProject).get();
    //     const newCount = snapshot.data().count + 1;
    //     snapshot.ref.update({
    //       count: newCount,
    //     });
    //   }
    // }

    return (
      task && projectId && // if theres a task and a projectId available, then add it to the firebase.
      firebase
        .firestore()
        .collection('tasks')
        .add({
          projectId,
          userId: 'randomUser',
          date: taskDate || collatedDate,
          archived: false,
          task,
          projectName: projectName || name,
        })
        .then(() => { // then, reset everything for the next adding task.
          // updateValue();
          resetAll();
        })
    );
  };

  return (
    // is showQuickAddTask true? adds another class if it is.
    <div className={showQuickAddTask ? 'add-task add-task_overlay' : 'add-task'} data-testid="add-task-comp">
      {showAddTaskMain && (
        // showAddTaskMain will be true (we ARE able to add tasks from main). if clicked, show the dropdown/overlay.
        <div className="add-task_shallow" data-testid="show-main-action" onClick={() => setShowMain(!showMain)}>
          <span className="add-task_plus">+</span>
          <span className="add-task_text">Add Task</span>
        </div>
      )}

      {/* if we have showMain || (OR) showQuickAddTask && (THEN) render what is inside () */}
      {(showMain || showQuickAddTask) && (
        <div className="add-task_main" data-testid="add-task-main">

          {/* what to show if showQuickAddTask is true */}
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task" className="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task_cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => { // if we cancel it, set everything back to normal (show is all false)
                    resetAll();
                    setShowQuickAddTask(false);
                  }}
                >
                  <FaTimes />
                </span>
              </div>
            </>
          )}

          {/* what shows up if only showMain is true (not quick add) */}
          
          <input // input for adding our task. Giving it a value={task} refers it to task whenever it changes (onChange).
            className="add-task_content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {(projectName || taskDate) && (
            <div className="add-task_selections">
              {/* adding selected project name for task */}
              {projectName && (
                <div className="add-task_projectName">
                  <span className="add-task_projectText">
                    { projectName }
                  </span>
  
                  <span>
                    <FaTimes 
                      className="add-task_project-cancel" 
                      onClick={() => {
                        setProjectName('');
                        setProject('');
                      }}
                    />
                  </span>
  
                </div>
              )}
  
              {/* adding selected date for task */}
              {taskDate && (
                <div className="add-task_selected-date">
                  {taskDay}, {taskDate}
  
                  <FaTimes 
                    className="add-task_project-cancel" 
                    onClick={() => {
                      setTaskDate('');
                      setTaskDay('');
                    }}
                  />
                </div>
              )}
            </div>
          )}
          

          {/* for NOT quick add, confirm adding a task */}
          <button
            type="button"
            className="add-task_submit"
            data-testid="add-task"
            onClick={() => 
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            } // if this is clicked, add a task (all variables are defined)
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task_cancel"
              data-testid="add-task-main-cancel"
              onClick={() => { // resets everything if cancelled. Note quick add is already false.
                resetAll();
              }}
            >
              Cancel
            </span>
          )}

          {/* icons for project and date overlays */}
          <span
            className="add-task_project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>

          <span
            className="add-task_date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>

          {/* this is the ProjectOverlay Component (passed in a few props) */}
          <ProjectOverlay 
            setProject={setProject} 
            setShowProjectOverlay={setShowProjectOverlay}
            showProjectOverlay={showProjectOverlay}
            setProjectName={setProjectName}
            setUpdatedProject={setUpdatedProject}
          />


          {/* <TaskDate /> */}
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
            setTaskDay={setTaskDay}
          />

        </div>
      )}
    </div>
  );
}