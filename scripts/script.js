let newTaskInput = document.querySelector('.task-name-input');
let newTaskBtn = document.querySelector('.add-task');
let main = document.querySelector('.main');
let footer = document.querySelector('footer');

let tasksNumber = document.createElement('div');
tasksNumber.classList.add('task-number');

let allFilter = document.createElement('div');
let doneFilter = document.createElement('div');
let progressFilter = document.createElement('div');
allFilter.classList.add('filter');
allFilter.classList.add('filter-pressed');
doneFilter.classList.add('filter');
progressFilter.classList.add('filter');
allFilter.textContent = 'All';
doneFilter.textContent = 'Done';
progressFilter.textContent = 'In progress';

footer.append(tasksNumber);
footer.append(allFilter);
footer.append(doneFilter);
footer.append(progressFilter);

let doneFlag = false;
let progressFlag = false;
let i = 0;
tasksNumber.textContent = `Tasks: ${i}`

newTaskBtn.addEventListener('click', () => {
    if (newTaskInput.value !== '') {
        if (!doneFlag) i++;
        let newTask = document.createElement('div');
        newTask.classList.add('new-task');

        let check = document.createElement('button');
        check.classList.add('not-checked');
        check.addEventListener('click', () => {
            if (check.parentElement.classList.contains('done')) {
                check.parentElement.classList.remove('done');
                check.classList.replace('checked', 'not-checked');
                if (doneFlag) {
                    check.parentElement.classList.add('hidden-filter');
                    i--;
                    tasksNumber.textContent = `Tasks: ${i}`;
                }
            } else {
                check.parentElement.classList.add('done');
                check.classList.replace('not-checked', 'checked');
                if (progressFlag) {
                    check.parentElement.classList.add('hidden-filter');
                    i--;
                    tasksNumber.textContent = `Tasks: ${i}`;
                }
            }
        });

        let newTaskText = document.createElement('input');
        newTaskText.setAttribute('type', 'text');
        newTaskText.disabled = true;
        newTaskText.classList.add('task-text');

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => {
            deleteBtn.parentElement.remove();
            i--;
            newTaskInput.setAttribute('placeholder', 'Enter new task...');
            tasksNumber.textContent = `Tasks: ${i}`;
            checkOverflow();
        });
        newTaskText.value = newTaskInput.value;

        tasksNumber.textContent = `Tasks: ${i}`;

        if (doneFlag) {
            newTask.classList.add('hidden-filter');
        }

        main.prepend(newTask);
        newTask.append(check);
        newTask.append(newTaskText);
        newTask.append(deleteBtn);
        newTaskInput.value = '';
        footer.prepend(tasksNumber);

        let tasks = document.querySelectorAll('.new-task');
        let taskTexts = document.querySelectorAll('.task-text');

        if (progressFlag || doneFlag) {
            i = 0;
            taskCounter();
            checkOverflow();
        } else {
            i = 0;
            for (const task of tasks) {
                i++;
            }
            checkOverflow()
        }


        allFilter.addEventListener('click', () => {
            for (const task of tasks) {
                task.classList.remove('hidden-filter');
            }
            i = 0;
            taskCounter();
            tasksNumber.textContent = `Tasks: ${i}`;
            checkOverflow(i);
            doneFlag = false;
            progressFlag = false;

            doneFilter.classList.remove('filter-pressed');
            allFilter.classList.add('filter-pressed');
            progressFilter.classList.remove('filter-pressed');

        });
        doneFilter.addEventListener('click', () => {
            for (const task of tasks) {
                if (task.classList.contains('done')) {
                    task.classList.remove('hidden-filter');
                } else {
                    task.classList.add('hidden-filter');
                }
            }
            i = 0;
            taskCounter();
            tasksNumber.textContent = `Tasks: ${i}`;
            checkOverflow();
            doneFlag = true;
            progressFlag = false;

            doneFilter.classList.add('filter-pressed');
            allFilter.classList.remove('filter-pressed');
            progressFilter.classList.remove('filter-pressed');

        });
        progressFilter.addEventListener('click', () => {
            for (const task of tasks) {
                if (task.classList.contains('done')) {
                    task.classList.add('hidden-filter');
                } else {
                    task.classList.remove('hidden-filter');
                }
            }
            i = 0;
            taskCounter();
            tasksNumber.textContent = `Tasks: ${i}`;
            checkOverflow();
            doneFlag = false;
            progressFlag = true;

            doneFilter.classList.remove('filter-pressed');
            allFilter.classList.remove('filter-pressed');
            progressFilter.classList.add('filter-pressed');

        });

        function checkOverflow() {
            if (i <= 9) {
                for (const task of tasks) {
                    task.classList.remove('new-task-overflow');
                }
                for (const text of taskTexts) {
                    text.classList.remove('task-text-overflow');
                }
            } else {
                for (const task of tasks) {
                    task.classList.add('new-task-overflow');
                }
                for (const text of taskTexts) {
                    text.classList.add('task-text-overflow');
                }
            }
        }

        function taskCounter() {
            for (const task of document.querySelectorAll('.new-task')) {
                if (!task.classList.contains('hidden-filter')) {
                    i++;
                }
            }
        }

    }
});