import { Todo } from './todo.js';
import { TodoManager } from './todoManager.js';
import { renderProjects, renderTodos } from './render.js';

const todoManager = new TodoManager();

// Event Delegation Setup
export const initializeEventListeners = () => {
  const appContainer = document.getElementById('app');

  appContainer.addEventListener('click', (e) => {
    // Delete Todo
    if (e.target.closest('.todo-delete-btn')) {
      const todoId = e.target.closest('.todo-delete-btn').dataset.todoId;
      const currentProject = todoManager.getCurrentProject();
      if (currentProject) {
        currentProject.deleteTodo(todoId);
        todoManager.saveProjects();
        renderTodos(currentProject.todos);
      }
    }

    // Delete Project
    if (e.target.closest('.project-delete-btn')) {
      const projectId = e.target.closest('.project-delete-btn').dataset.projectId;
      if (confirm('Are you sure you want to delete this project and all its tasks?')) {
        todoManager.deleteProject(projectId);
        // If deleted project was current, switch to first project
        if (projectId === todoManager.currentProjectId) {
          todoManager.currentProjectId = todoManager.projects[0]?.id;
        }
        renderProjects(todoManager.projects, todoManager.currentProjectId);
        const newCurrentProject = todoManager.getCurrentProject();
        if (newCurrentProject) {
          renderTodos(newCurrentProject.todos);
        }
      }
    }

    // Switch Projects
    if (e.target.closest('.project')) {
      const projectElement = e.target.closest('.project');
      // Don't trigger on delete button click
      if (!e.target.closest('.delete-btn')) {
        const projectId = projectElement.dataset.projectId;
        todoManager.currentProjectId = projectId;
        const currentProject = todoManager.getCurrentProject();
        if (currentProject) {
          renderProjects(todoManager.projects, projectId);
          renderTodos(currentProject.todos);
        }
      }
    }
  });

  // Todo Form Submission
  document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const title = formData.get('title')?.trim();
    const description = formData.get('description')?.trim() || '';
    const dueDate = formData.get('dueDate');
    const priority = formData.get('priority');

    if (!title || !dueDate || !priority) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const currentProject = todoManager.getCurrentProject();
      if (!currentProject) {
        alert('Please select a project first');
        return;
      }

      const newTodo = new Todo(
        title,
        description,
        dueDate,
        priority,
        todoManager.currentProjectId
      );

      currentProject.addTodo(newTodo);
      todoManager.saveProjects();
      renderTodos(currentProject.todos);
      e.target.reset();
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Error creating todo: ' + error.message);
    }
  });

  // Project Creation
  document.getElementById('new-project-btn').addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (projectName && projectName.trim()) {
      todoManager.addProject(projectName.trim());
      const currentProject = todoManager.getCurrentProject();
      renderProjects(todoManager.projects, todoManager.currentProjectId);
      if (currentProject) {
        renderTodos(currentProject.todos);
      }
    }
  });

  // Toggle Todo Completion
  appContainer.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const todoId = e.target.dataset.todoId;
      const currentProject = todoManager.getCurrentProject();
      if (currentProject) {
        const todo = currentProject.todos.find(t => t.id === todoId);
        if (todo) {
          todo.toggleStatus();
          todoManager.saveProjects();
        }
      }
    }
  });
};

// Initial Render
export const initializeApp = () => {
  renderProjects(todoManager.projects, todoManager.currentProjectId);
  renderTodos(todoManager.getCurrentProject().todos);
  initializeEventListeners();
};