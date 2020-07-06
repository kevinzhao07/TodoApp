// these will be necessary to use hooks in react
import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment'; // make sure to include inside package.json!

// returns how many tasks are up next (empty for testing)
// const collatedTasksExist = () => {}

// this is the beginning of creating our own custom react hook, useTasks
export const useTasks = selectedProject => {

    // what's going on here? tasks is the name of our variable, initialized to an empty array by 
    // useState, and setTasks is used to update the value of tasks later on. This is the popular syntax. 
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    // this is the useEffect hook, but what is happening?
    useEffect(() => {

        // tells firebase to get tasks associated with userId == randomUser. the variable "unsubscribe" 
        // now are the collection tasks, where the userId is equal to randomUser.
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'randomUser');

        // down below are three nested if statements

        // we don't want ALL tasks, we only want tasks from each project we select. The code to handle that
        // is complicated and messy, but commented below.
        unsubscribe = // what do we really want unsubscribe to be equal to?
            selectedProject && !collatedTasksExist(selectedProject) // if the project doens't exist in collated tasks, 
                ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) // only show tasks of selectedProjects
                : selectedProject == "TODAY" // if not, is it equal to today's tasks?
                    ? (unsubscribe = unsubscribe.where('date', '==', moment.format("MM/DD/YYYY"))) // only show tasks from today
                    : selectedProject == "INBOX" || selectedProject === 0 // if not, is it equal to inbox?
                        ? (unsubscribe = unsubscribe.where('date', '==', '')) // only show inbox tasks
                        : unsubscribe; // leave unsubscribe as it is

        // editing unsubscribe using snapshots, which is for detecting real-time updates in firebase!
        unsubscribe = unsubscribe.onSnapshot(snapshot => {

            // snapshot is used to get real updates (new tasks added), and retreives all of their ids. GRABS ALL TASKS!
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            // from here on, we are setting tasks and archived tasks using newTasks (contains all tasks)

            // what are we setting tasks to? If the next 7 are selected, only set tasks for the next 7 days and NOT archived.
            // if that is not selected, set to ALL tasks that are NOT archived. 
            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true)
                : newTasks.filter(task => task.archived !== true)
            );

            // we are setting archived tasks to all tasks that ARE archived. this goes hand in hand witH:
            // const [archivedTasks, setArchviedTasks] = useState([]);
            setArchivedTasks(newTasks.filter(task => task.archived !== false));

            return () => unsubscribe(); // return unsubscribe (don't want to check projects every time)
        });
    }, [selectedProject]); // ONLY when selectedProject changes, rerun everything (change tasks)

    return { tasks, archivedTasks }; // return array of tasks/archived tasks related to project. 
};

export const useProjects = () => {
    // again, writing hooks for each custom hooks
    const [projects, setProjects] = useState([]);

    // this is another useEffect hook, updating on each time [OBJECT] updates.
    useEffect(() => {
        // same as before, but get ALL projects
        firebase
            .firestore() // get into firestore database
            .collection('projects') // get projects collection
            .where('userId', '==', 'randomUser') // where the userId is randomUser (we made that)
            .get() // we dont need to filter projects, so we can go right into snapshots (GETS THEM ONCE!)
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({ // synonymous with newTasks (from before). gets all projects
                    ...project.data(), // all projects
                    docId: project.id, // makes an ID in case we want to delete/modify projects
                }));

                // to stop an infinite loop from happening when we reset our projects (using setProjects), we have a check:
                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects); // only set if JSON is different (won't have infinite loop)
                }
            });

    }, [projects]);

    return { projects, setProjects };
}