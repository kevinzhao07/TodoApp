// from constants (used to filter tasks)
import { collatedTasks } from '../constants';

// this is for checking if tasks exist for inbox, today, and next 7 days
export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

// checking if theres projects where the projectId are equal.
export const getProject = (projects, projectId) => 
  projects.find(project => project.projectId === projectId);

// checking if theres projects where the key are equal.
export const getCollatedProject = (projects, key) =>
  projects.find(project => project.key === key);

export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();