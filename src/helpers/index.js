// from constants (used to filter tasks)
import { collatedTasks } from '../constants'

// this is for checking if tasks exist for inbox, today, and next 7 days
export const collatedTasksExist = selectedProject => {
    collatedTasksExist.find(task => task.key === selectedProject);
}