import { Todo } from './todo.js';
import { Project } from './project.js';
import { saveToStorage, loadFromStorage } from './storage.js';

export class TodoManager {
  constructor() {
    this.projects = [new Project('Default')];
    this.currentProjectId = this.projects[0].id;
    this.loadProjects();
  }

  addProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
    this.saveProjects();
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.saveProjects();
  }

  getCurrentProject() {
    return this.projects.find(p => p.id === this.currentProjectId);
  }

  saveProjects() {
    saveToStorage('projects', this.projects);
  }

  loadProjects() {
    try {
      const savedProjects = loadFromStorage('projects');
      if (savedProjects && Array.isArray(savedProjects)) {
        this.projects = savedProjects.map(p => {
          if (!p.name || !p.id) {
            throw new Error('Invalid project data');
          }
          const project = new Project(p.name);
          project.id = p.id;
          project.todos = Array.isArray(p.todos) ? p.todos.map(t => {
            if (!this.isValidTodoData(t)) {
              throw new Error('Invalid todo data');
            }
            return new Todo(
              t.title,
              t.description,
              t.dueDate,
              t.priority,
              t.projectId
            );
          }) : [];
          return project;
        });
        
        // Ensure current project exists or default to first project
        if (!this.projects.find(p => p.id === this.currentProjectId)) {
          this.currentProjectId = this.projects[0]?.id;
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Reset to default state
      this.projects = [new Project('Default')];
      this.currentProjectId = this.projects[0].id;
    }
  }

  isValidTodoData(todo) {
    return todo &&
      typeof todo.title === 'string' &&
      typeof todo.description === 'string' &&
      todo.dueDate &&
      ['low', 'medium', 'high'].includes(todo.priority) &&
      todo.projectId;
  }
}