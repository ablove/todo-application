"use strict";
class TodoApp {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    addTask(task) {
        const newTodo = {
            id: this.nextId++,
            task: task,
            completed: false,
        };
        this.todos.push(newTodo);
        console.log(`Added: ${task}`);
    }
    removeTask(id) {
        const taskToRemove = this.todos.find((todo) => todo.id === id);
        if (taskToRemove) {
            this.todos = this.todos.filter((todo) => todo.id !== id);
            console.log(`Removed: ${taskToRemove.task}`);
        }
        else {
            console.log("Task not found.");
        }
    }
    editTask(id, newTask) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.task = newTask;
            console.log(`Task edited: ${todo.id} - ${newTask}`);
        }
        else {
            console.log("Task not found.");
        }
    }
    toggleCompletion(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            console.log(`Task ${todo.completed ? "Completed" : "Not Completed"}: ${todo.task}`);
        }
        else {
            console.log("Task not found.");
        }
    }
    displayTodos() {
        if (this.todos.length === 0) {
            console.log("No tasks to display.");
            return;
        }
        console.log("Todo List:");
        this.todos.forEach((todo) => {
            console.log(`${todo.id}. ${todo.task} ${todo.completed ? "(Completed)" : ""}`);
        });
    }
}
const app = new TodoApp();
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function promptUser() {
    rl.question("\nChoose an option: \n1. Add Task\n2. Remove Task\n3. Edit Task\n4. Toggle Task Completion\n5. Display Tasks\n6. Exit\n", (choice) => {
        switch (choice) {
            case "1":
                rl.question("\nEnter task to add: ", (task) => {
                    app.addTask(task);
                    promptUser();
                });
                break;
            case "2":
                rl.question("\nEnter task ID to remove: ", (id) => {
                    app.removeTask(parseInt(id));
                    promptUser();
                });
                break;
            case "3":
                rl.question("\nEnter task ID to edit: ", (id) => {
                    rl.question("Enter new task description: ", (newTask) => {
                        app.editTask(parseInt(id), newTask);
                        promptUser();
                    });
                });
                break;
            case "4":
                rl.question("\nEnter task ID to toggle completion: ", (id) => {
                    app.toggleCompletion(parseInt(id));
                    promptUser();
                });
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
    });
}
promptUser();
//# sourceMappingURL=todo.js.map