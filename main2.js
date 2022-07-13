window.addEventListener('load', ()=> {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    DisplayTodos();

    //const nameInput = document.querySelector('#name'); //not using
    const newTodoForm = document.querySelector('#new-task-form');

    //const input = document.querySelector("#new-task-input")


    // const username = localStorage.getItem('username') || '';

    // nameInput.value = username;

    // nameInput.addEventListener('change', e => {
    //     localStorage.setItem('username', e.target.value);
    // })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        // console.log(todos);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos () {
    const todoList = document.querySelector('#tasks');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('task')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if(todo.category == 'Mom'){
            span.classList.add('Mom')
        }
        else if(todo.category == 'Dad'){
            span.classList.add('Dad')
        }
        else if(todo.category == 'Jason'){
            span.classList.add('Jason')
        }
        else if(todo.category == 'Aly'){
            span.classList.add('Aly')
        }

        content.classList.add('content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete')

        content.innerHTML = `<input type="text" class="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done')
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            }
            else{
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e=> {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })

}