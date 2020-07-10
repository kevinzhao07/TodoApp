import React, { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { IndividualProject } from './layouts/IndividualProject';

export const Projects = ({ activeValue = null }) => {
  // set an active project for now IF IT EXISTS
  const [active, setActive] = useState(activeValue);

  // able to set selected projects (we are using context)
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    // if projects exist, map every singular project (this is what keyword map is for)
    projects && projects.map(project => (
      // make sure to assign unique keys (required), and a doc-id (in order to delete), test is optional
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId // according to our variable, is this project the active one?
            ? 'active sidebar_project' // if it is, then give it the class active as well
            : 'sidebar_project'
        }
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
      {/* displaying project in JSON format */}
      <IndividualProject project={project}/>

      </li>
    ))
  );
}