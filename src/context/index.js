// importing and exporting from here allows for other lower-level components to use the context.
import { ProjectsContext, ProjectsProvider, useProjectsValue } from './projects-context';
import { SelectedProjectContext, SelectedProjectProvider, useSelectedProjectValue } from './selected-project-context';

export { SelectedProjectContext, SelectedProjectProvider, useSelectedProjectValue };
export { ProjectsContext, ProjectsProvider, useProjectsValue };
