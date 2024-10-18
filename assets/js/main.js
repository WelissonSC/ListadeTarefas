escopo = () => {

    //pegando os elementos do html
const texto = document.querySelector('.texto');
const lista = document.querySelector('.tarefas');

//função que cria uma ul e retorna a mesma
criaUl = () => {
    const li = document.createElement('li');
    return li;
}

//funcoa que cria um botão já setando uma classe 
criaBtnDelete = () => {
    const btnDelete = document.createElement('button')
    btnDelete.setAttribute('class', 'remove');
    return btnDelete;
}

//limpa o campo de texto após a digitação do usuário
limpaCampo = () => {
    texto.value = '';
    texto.focus();
}

//insera as tarefas no documento após clicar no botão de adicionar
insereNoDocumento = (texto) => {
    const li = criaUl();
    const btnRemove = criaBtnDelete();
    lista.appendChild(li);
    li.innerText = texto;
    btnRemove.innerText = 'Remover'
    li.appendChild(btnRemove);
    limpaCampo();
}

//essa função salva na propria página atravez do JSON as tarefas que ficaram salvas 
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


//pega as tarefas em formato JSON tras de volta para html e insere na página
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

}

escopo()




