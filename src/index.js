(function () {
    class Task {
        constructor(description) {
            this.description = description;
            this.completed = false;
        }

        toggleCompleted() {
            this.completed = !this.completed;
        }

        toHTML(index) {
            const checkbox = `<input type="checkbox" ${
                this.completed ? "checked" : ""
            } data-index="${index}">`;
            const description = `<span>${this.description}</span>`;
            const deleteButton = `<button class="delete-button">Delete</button>`;
            return `<li>${checkbox}${description}${deleteButton}</li>`;
        }
    }

    class TodoList {
        constructor() {
            this.tasks = [];
        }

        addTask(description) {
            const task = new Task(description);
            this.tasks.push(task);
        }

        removeTask(index) {
            this.tasks.splice(index, 1);
        }

        toggleTaskCompleted(index) {
            const task = this.tasks[index];
            task.toggleCompleted();
        }

        toHTML() {
            return this.tasks.map((task, index) => task.toHTML(index)).join("");
        }
    }

    class App {
        constructor() {
            this.todoList = new TodoList();
            this.form = document.getElementById("todo-form");
            this.input = document.getElementById("todo-input");
            this.list = document.getElementById("todo-list");

            this.render();
            this.form.addEventListener("submit", (event) =>
                this.handleFormSubmit(event)
            );
            this.list.addEventListener("click", (event) =>
                this.handleListClick(event)
            );
        }

        render() {
            this.list.innerHTML = this.todoList.toHTML();
        }

        handleFormSubmit(event) {
            event.preventDefault();
            const description = this.input.value;
            if (description) {
                this.todoList.addTask(description);
                this.input.value = "";
                this.render();
            }
        }

        handleListClick(event) {
            const target = event.target;
            if (target.tagName === "INPUT") {
                const index = parseInt(target.dataset.index);
                this.todoList.toggleTaskCompleted(index);
                this.render();
            } else if (target.classList.contains("delete-button")) {
                const index = parseInt(target.parentNode.dataset.index);
                this.todoList.removeTask(index);
                this.render();
            }
        }
    }

    const app = new App();
})();
