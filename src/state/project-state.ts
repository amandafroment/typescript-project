namespace App {
  //ProjectState management class

  // we dont need any return type, they just expect to get some items when the listener fires
  type Listener<T> = (items: T[]) => void;

  //listeners can be accessed from any class that inherits
  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    //holds an array of projects
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      for (const listenerFn of this.listeners) {
        //gets a copy of projects from the slice
        listenerFn(this.projects.slice());
        this.updateListeners();
      }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  //global instance of projectState
  // we'll always have one object of this type in the entire application
  // we only want one state management object for our project
  export const projectState = ProjectState.getInstance();
}
