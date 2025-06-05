const formulario = document.querySelector('#recurso-form');
const tabela = document.getElementById('tabela')
const btnModalAdd = document.querySelector('#btn-add')
const btnFechar = document.querySelector('#btn-fechar');
const listaRecursos = [];

btnModalAdd.addEventListener('click', abrirModal);
btnFechar.addEventListener('click', fecharModal);

function abrirModal() {
    const elModal = document.querySelector('.adicionar-recursos');

    elModal.classList.remove('fechado');
}

function fecharModal() {
    const elModal = document.querySelector('.adicionar-recursos');
    formulario.reset();
    elModal.classList.add('fechado');
};

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formulario);

    const recurso = {
        nome: formData.get('nome'),
        tipo: formData.get('tipo'),
        quantidade: formData.get('quantidade')
    };
    validarRecurso(recurso.nome) ? alert('Recurso já cadastrado!') :
    gerarRecurso(recurso);
    salvarListaRecursos(recurso);



})

function lerRecurso() {
    let novoRecurso = ''

    listaRecursos.forEach((recurso, index) => {
        novoRecurso += `<tr><td>${recurso.nome}</td>
        <td>${recurso.tipo}</td>
        <td>${recurso.quantidade}</td>
        <td><button class="btn btn-excluir" data-index="${index}">Excluir</button>
            <button class="btn btn-editar" data-index="${index}">Editar</button>
        </td></tr>
        
        `;
        formulario.value = ''
    })
    tabela.innerHTML = novoRecurso;

    document.querySelectorAll('.btn-excluir').forEach((btn) => {
        btn.addEventListener('click', excluirRecurso);

        document.querySelectorAll('.btn-editar').forEach((btn) => {
            btn.addEventListener('click', editarRecurso);
        });
    });
}

// quero que nao seja possivel cadastrar itens com o mesmo nome.

function validarRecurso(nome) {
    return listaRecursos.some(recurso => recurso.nome.toLowerCase() === nome.toLowerCase());
};

function salvarListaRecursos() {
    localStorage.setItem('listaRecursos', JSON.stringify(listaRecursos));
};

function carregarListaRecursos() {
    const recursosSalvos = localStorage.getItem('listaRecursos');
    if (recursosSalvos) {
        listaRecursos.push(...JSON.parse(recursosSalvos));
        lerRecurso();
    }
};

function excluirRecurso(e) {
    const index = e.target.dataset.index;
    listaRecursos.splice(index, 1);
    lerRecurso();
};

function editarRecurso(e) {
    const index = e.target.dataset.index;
    const recurso = listaRecursos[index];

    formulario.nome.value = recurso.nome;
    formulario.tipo.value = recurso.tipo;
    formulario.quantidade.value = recurso.quantidade;

    listaRecursos.splice(index, 1);
    lerRecurso();

    abrirModal();
};


function gerarRecurso(recurso) {
    listaRecursos.push(recurso)
    lerRecurso()
};

carregarListaRecursos();
lerRecurso();