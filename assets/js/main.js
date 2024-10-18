const texto = document.querySelector('.texto');
const lista = document.querySelector('.tarefas');

criaUl = () => {
    const li = document.createElement('li');
    return li;
}

criaBtnDelete = () => {
    const btnDelete = document.createElement('button')
    btnDelete.setAttribute('class', 'remove');
    return btnDelete;
}

limpaCampo = () => {
    texto.value = '';
    texto.focus();
}

insereNoDocumento = (texto) => {
    const li = criaUl();
    const btnRemove = criaBtnDelete();
    lista.appendChild(li);
    li.innerText = texto;
    btnRemove.innerText = 'Remover'
    li.appendChild(btnRemove);
    limpaCampo();
}

salvaTarefas = () => {
    const allTarefas = lista.querySelectorAll('li');
    const listTarefas = [];

    for (let tarefa of allTarefas) {
        let tarefaTxt = tarefa.innerText;
        tarefaTxt = tarefaTxt.replace('Remover', '')
        listTarefas.push(tarefaTxt);
    }
    const tarefasJSON = JSON.stringify(listTarefas);
    localStorage.setItem('tarefas', tarefasJSON );
    console.log(tarefasJSON);
}

addTarefaSalva = () => {
    const tarefas = localStorage.getItem('tarefas')
    const listTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listTarefas) {
        insereNoDocumento(tarefa);
    }
}

addTarefaSalva();

texto.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        insereNoDocumento(texto.value);
        limpaCampo();
    }
})

document.addEventListener('click', (event) => {
    const element = event.target;

    //removendo o parente 
    if (element.classList.contains('remove')) {
        element.parentElement.remove();
        salvaTarefas();
    }

    //esse if não fazer nada caso o campo esteja vazio
    if (!texto.value) return;

    //ao clicar no btn de adicionar ele executa varias funcoes
    if (element.classList.contains('add-btn')) {
        insereNoDocumento(texto.value);
        limpaCampo();
        salvaTarefas();
    } 

    if (event.keyCode === 13) {
        insereNoDocumento(texto.value);
        limpaCampo();
        salvaTarefas();
    }

});



