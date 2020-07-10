// in order to use context, we must import these two from react
import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks';

// syntax to define your own context. in our case, it is for projects.
export const ProjectsContext = createContext();

// we are at the top level, so we will write a provider for consumers to use.
// children is passed as parameter? not sure why for now.
export const ProjectsProvider = ({children}) => {
    // we are setting projects here (this looks like syntax for useState()) (PULLED FROM HOOKS)
    const { projects, setProjects } = useProjects();

    return (
        // this is the project PROVIDER (which is only seen at the upper level). the values
        // passed in is the hook, which can be used to modify projects at other levels.
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            {children} {/* not sure why */}
        </ProjectsContext.Provider>
    );
};

// exporting context to other places that can use this calling useProjectsValue.
export const useProjectsValue = () => useContext(ProjectsContext);