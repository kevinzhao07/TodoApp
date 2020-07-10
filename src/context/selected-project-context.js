// in order to use context, we must import these two from react
import React, { createContext, useContext, useState } from 'react';

// syntax to define your own context. in our case, it is for SelectedProjects.
export const SelectedProjectContext = createContext();

// we are at the top level, so we will write a provider for consumers to use.
// children is passed as parameter? not sure why for now.
export const SelectedProjectProvider = ({ children }) => {
  // we are setting SelectedProjects here (this looks like syntax for useState())
  const [ selectedProject, setSelectedProject ] = useState('INBOX');

  return (
    // this is the SelectedProject PROVIDER (which is only seen at the upper level). the values
    // passed in is the hook, which can be used to modify SelectedProjects at other levels.
    <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children} {/* not sure why */}
    </SelectedProjectContext.Provider>
  );
};

// exporting context to other places that can use this calling useSelectedProjectsValue.
export const useSelectedProjectValue = () => useContext(SelectedProjectContext);