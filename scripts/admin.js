function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    if (nome && email) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const novoUsuario = { nome, email, data: new Date().toLocaleString() };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        carregarUsuarios();
        limparCampos();
    } else {
        alert("Preencha todos os campos!");
    }
}

function carregarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${usuario.nome} (${usuario.email}) <br> ${usuario.data}
        <button class="excluir-usuario" onclick="excluirUsuario(${index})">Excluir</button>`;
        lista.appendChild(li);
    });
}

function excluirUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
}

function excluirTodos() {
    if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
        localStorage.removeItem("usuarios");
        carregarUsuarios();
    }
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

function pesquisarUsuarios() {
    const filtro = document.getElementById("pesquisa").value.toLowerCase();
    const lista = document.getElementById("listaUsuarios");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    lista.innerHTML = "";
    usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(filtro) || 
        usuario.email.toLowerCase().includes(filtro))
        .forEach((usuario, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${usuario.nome} (${usuario.email}) - ${usuario.data} 
            <button onclick="excluirUsuario(${index})">Excluir</button>`;
            lista.appendChild(li);
        });
}