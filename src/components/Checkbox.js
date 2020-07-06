import React from 'react';

export const Checkbox = ({id}) => {
  // writing a "django view". when checkbox is checked, the function archiveTask
  // is run. This calls our database, and sets the task id=id to archived.
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks') // gets all tasks from database
      .doc(id)
      .update({ // sets them to be archvied
        archived: true,
      });
  };
}