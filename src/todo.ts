// todo.ts

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

class TodoApp {
  private todos: Todo[] = [];
  private nextId: number = 1;

  // Add a new task
  addTask(task: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      task: task,
      completed: false,
    };

    this.todos.push(newTodo);
    console.log(`Added: ${task}`);
  }

  // Remove a task by id
  removeTask(id: number): void {
    const taskToRemove = this.todos.find((todo) => todo.id === id);
    if (taskToRemove) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      console.log(`Removed: ${taskToRemove.task}`);
    } else {
      console.log("Task not found.");
    }
  }

  // Edit a task's description
  editTask(id: number, newTask: string): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.task = newTask;
      console.log(`Task edited: ${todo.id} - ${newTask}`);
    } else {
      console.log("Task not found.");
    }
  }

  // Mark a task as completed or not
  toggleCompletion(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      console.log(
        `Task ${todo.completed ? "Completed" : "Not Completed"}: ${todo.task}`
      );
    } else {
      console.log("Task not found.");
    }
  }

  // Display all tasks
  displayTodos(): void {
    if (this.todos.length === 0) {
      console.log("No tasks to display.");
      return;
    }

    console.log("Todo List:");
    this.todos.forEach((todo) => {
      console.log(
        `${todo.id}. ${todo.task} ${todo.completed ? "(Completed)" : ""}`
      );
    });
  }
}

// Interactive part
const app = new TodoApp();
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser(): void {
  rl.question(
    "\nChoose an option: \n1. Add Task\n2. Remove Task\n3. Edit Task\n4. Toggle Task Completion\n5. Display Tasks\n6. Exit\n",
    (choice: string) => {
      switch (choice) {
        case "1":
          rl.question("\nEnter task to add: ", (task: string) => {
            app.addTask(task);
            promptUser();
          });
          break;
        case "2":
          rl.question("\nEnter task ID to remove: ", (id: string) => {
            app.removeTask(parseInt(id));
            promptUser();
          });
          break;
        case "3":
          rl.question("\nEnter task ID to edit: ", (id: string) => {
            rl.question("Enter new task description: ", (newTask: string) => {
              app.editTask(parseInt(id), newTask);
              promptUser();
            });
          });
          break;
        case "4":
          rl.question(
            "\nEnter task ID to toggle completion: ",
            (id: string) => {
              app.toggleCompletion(parseInt(id));
              promptUser();
            }
          );
          break;
        case "5":
          console.log("\n");
          app.displayTodos();
          promptUser();
          break;
        case "6":
          rl.close();
          break;
        default:
          console.log(" Invalid option. Please try again.");
          promptUser();
      }
    }
  );
}

promptUser();
