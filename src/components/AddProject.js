import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';
import { ProjectColor } from './ProjectColor';
import { FaChevronDown } from 'react-icons/fa';

export const AddProject = ({ shouldShow = false }) => {

  // should our AddProject button even show (have we toggled it off)?
  const [show, setShow] = useState(shouldShow);
  const [selectedColor, setSelectedColor] = useState('#db4c3f');
  const [showColor, setShowColor] = useState(false);

  // for our new project. we must get a name, id, and update our existing projects
  const [projectName, setProjectName] = useState("");
  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  // creating the function to actually ADD our project
  const addProject = () => {
    projectName && // this basically means if projectName exists, then... 
      firebase
        .firestore()
        .collection('projects') // default way of getting all projects
        .add({ // adding a new project (saved). we have to give it all parameters
          projectId,
          name: projectName,
          userId: 'randomUser',
          count: 0,
          color: selectedColor,
        })
        .then(() => {
          setProjects([...projects]); // tricks firebase into pulling all new projects again (like a refresh)
          setProjectName(''); // resets for next use
          setShow(false); // addProject is not open by default
        });
  }

  return (
    <div className="add-project" data-testid="add-project">
      {show && (// seen here again. if show is true, show the place where we can enter a name
        <div className="add-project_input">
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)} // 'each time it changes, set the target name' (constant updating)
            className="add-project_name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />

          <button
            className="add-project_submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project!
          </button>

          <span
            data-testid="hide-project-overlay"
            className="add-project_cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </span>

          <span className="add-project_color-toggle">
            <FaChevronDown
              onClick={() => setShowColor(!showColor)}
            />
          </span>

          <span
            className="add-project_color-display"
          >

            {/* creates a circle */}
            <svg
              height="24"
              width="24"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill={selectedColor}
              />

            </svg>

          </span>

          {/* this is the select color overlay */}
          <ProjectColor
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
            showColor={showColor}
            setShowColor={setShowColor}
          />


        </div>
      )}
      <span className="add-project_plus">+</span>
      <span
        data-testid="add-project-action"
        className="add-project_text"
        onClick={() => setShow(!show)}
      >
        Add Project
      </span>
    </div>
  );
}