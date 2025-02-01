import { format, parseISO } from 'date-fns';

export class Todo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // 'low', 'medium', 'high'
    this.projectId = projectId;
    this.isComplete = false;
    this.notes = '';
    this.checklist = [];
    if (!['low', 'medium', 'high'].includes(priority)) {
      throw new Error('Invalid priority');
    }
  }

  formatDueDate() {
    return format(parseISO(this.dueDate), 'MM/dd/yyyy HH:mm');
  }

  toggleStatus() {
    this.isComplete = !this.isComplete;
  }

  updateDetails(updatedFields) {
    Object.assign(this, updatedFields);
  }
}