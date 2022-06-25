window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector('#new-task-input');
    const tasksElement = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value;

        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const contentElement = document.createElement('div');
        contentElement.classList.add('content');

        const taskInputElement = document.createElement('input');
        taskInputElement.classList.add('text');
        taskInputElement.type = 'text';
        taskInputElement.value = taskText;
        taskInputElement.setAttribute('readonly', 'readonly');

        const actionsElement = document.createElement('actions');
        actionsElement.classList.add('actions');

        const taskEditElement = document.createElement('button');
        taskEditElement.classList.add('edit');
        taskEditElement.innerHTML = 'Edit';

        const taskDeleteElement = document.createElement('button');
        taskDeleteElement.classList.add('delete');
        taskDeleteElement.innerHTML = 'Delete';

        contentElement.appendChild(taskInputElement);
        actionsElement.appendChild(taskEditElement);
        actionsElement.appendChild(taskDeleteElement);
        taskElement.appendChild(contentElement);
        taskElement.appendChild(actionsElement);
        tasksElement.appendChild(taskElement);

        input.value = '';

        taskEditElement.addEventListener('click', (e) => {
            if (taskEditElement.innerHTML.toLowerCase() === 'edit') {
                taskEditElement.innerHTML = 'Save';
                taskInputElement.removeAttribute('readonly');
                taskInputElement.focus();
            } else {
                taskEditElement.innerHTML = 'Edit';
                taskInputElement.setAttribute('readonly', 'readonly');
            }
        });

        taskDeleteElement.addEventListener('click', (e) => {
            tasksElement.removeChild(taskElement);
        });

    });
})