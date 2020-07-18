import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId) // this docId is necessary to find the project we are going to delete. projectId wont work.
      .delete()
      .then(() => { // the 'then' keyword suggests what to do afterwards.
        setProjects([...projects]); // a mapping from previous projects to now. these are projects after it has been deleted.
        setSelectedProject('INBOX'); // since project is gone, go to INBOX as default.
      });
  };

  return (
    <>
      <span className="sidebar_dot">•</span>
      <span className="sidebar_project-name">{project.name}</span>
      <span
        className="sidebar_project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)} // reverse the value of showConfirm (clicking the trash icon starts deleting process)
      >
        <FaTrashAlt />

        {/* means if showConfirm is true, then render the rest of the HTML */}
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal_inner">
              <p>Are you sure you want to delete this project?</p>
              <button type="button" onClick={() => deleteProject(project.docId)}> Delete </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel </span> {/* cancels, sets showConfirm back to false (takes away popup) */}
            </div>
          </div>
        )}

      </span>
    </>
  )
}