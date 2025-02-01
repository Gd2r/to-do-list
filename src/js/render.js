// render.js
export const renderProjects = (projects, currentProjectId) => {
    const sidebar = document.getElementById('projects-sidebar');
    sidebar.innerHTML = `
        <h2>Projects</h2>
        ${projects.map(project => `
            <div class="project ${project.id === currentProjectId ? 'active' : ''}" 
                 data-project-id="${project.id}">
                <div class="project-name">
                    <i class="fas fa-folder"></i>
                    <span>${project.name}</span>
                </div>
                <div class="project-actions">
                    <span class="todo-count">${project.todos.length}</span>
                    ${project.name !== 'Default' ? `
                        <button type="button" class="delete-btn project-delete-btn" data-project-id="${project.id}" title="Delete project">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('')}
        <button id="new-project-btn">
            <i class="fas fa-plus"></i> New Project
        </button>
    `;
};


  // render.js
export const renderTodos = (todos) => {
    const mainContent = document.getElementById('main-content');
    
    if (todos.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks fa-3x"></i>
                <p>No tasks yet. Add your first task!</p>
            </div>
        `;
        return;
    }

    mainContent.innerHTML = todos.map(todo => `
        <div class="todo-card priority-${todo.priority}">
            <div class="todo-header">
                <input type="checkbox" 
                       ${todo.isComplete ? 'checked' : ''} 
                       class="todo-checkbox"
                       data-todo-id="${todo.id}">
                <h3>${todo.title}</h3>
                <button type="button" class="delete-btn todo-delete-btn" data-todo-id="${todo.id}" title="Delete task">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="todo-details">
                <div class="due-date">
                    <i class="far fa-calendar-alt"></i> ${todo.formatDueDate()}
                </div>
                <p>${todo.description}</p>
            </div>
        </div>
    `).join('');

    addTodoEventListeners();
};

function addTodoEventListeners() {
    // Add delete button listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const todoId = e.currentTarget.dataset.todoId;
            document.dispatchEvent(new CustomEvent('deleteTodo', {
                detail: { todoId }
            }));
        });
    });

    // Add checkbox listeners
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const todoId = e.currentTarget.dataset.todoId;
            document.dispatchEvent(new CustomEvent('toggleTodo', {
                detail: { todoId }
            }));
        });
    });
}