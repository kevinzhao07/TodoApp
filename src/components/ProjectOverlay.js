import React from 'react';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({ setProject, showProjectOverlay, setShowProjectOverlay, setProjectName, setUpdatedProject }) => {
  const { projects } = useProjectsValue();

  return ( // building out the component we are about to return 
    projects && showProjectOverlay && ( // weird syntax. if projects and showPO is TRUE, then render the rest =>
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay_list"> {/* unordered list of all projects (display to user) */}
          
          {projects.map(project => ( // maps over EACH project and displays as <li> tag
            <li
              key={project.projectId} // each item needs a specific key
              data-testid="project-overlay-action"
              onClick={() => { // chose a project? close overlay, and set project to chosen one.
                setShowProjectOverlay(false);
                setProject(project.projectId);
                setProjectName(project.name);
                setUpdatedProject(project.docId);
              }}
            > 
              {project.name} {/* shows the project names in a list */}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}