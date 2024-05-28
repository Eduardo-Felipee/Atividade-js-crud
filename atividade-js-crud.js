const readlineSync = require('readline-sync');

class Usuario {
    #senha = "";
    #login = "";
    #nome = "";
    #peso = null;
    #altura = null;
    #tipoSanguineo = null;

    constructor(nome, login, senha) {
        this.#nome = nome;
        this.#senha = senha;
        this.#login = login;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get login() {
        return this.#login;
    }

    set login(login) {
        this.#login = login;
    }

    get senha() {
        return this.#senha;
    }

    set senha(senha) {
        this.#senha = senha;
    }

    get peso() {
        return this.#peso;
    }

    set peso(peso) {
        this.#peso = peso;
    }

    get altura() {
        return this.#altura;
    }

    set altura(altura) {
        this.#altura = altura;
    }

    get tipoSanguineo() {
        return this.#tipoSanguineo;
    }

    set tipoSanguineo(tipoSanguineo) {
        this.#tipoSanguineo = tipoSanguineo;
    }
}

class Aplicacao {
    #usuarios = [];
    #adminLogin = 'admin';
    #adminSenha = 'admin123';

    cadastrarUsuario(nome, login, senha) {
        if (this.#usuarios.find(u => u.login === login)) {
            console.log("Erro: Login já existe. Tente novamente com um login diferente.");
            return;
        }
        if (login.toLowerCase() === this.#adminLogin) {
    console.log("Erro: Login 'admin' é reservado. Tente novamente com um login diferente.");
    return;
}
        let usuario = new Usuario(nome, login, senha);
        this.#usuarios.push(usuario);
        console.log("Usuário cadastrado com sucesso!");
    }
    
    atualizarDadosPessoais(usuario) {
    let novoPeso = readlineSync.question("Digite o novo peso (deixe vazio para manter o atual): ");
    let novaAltura = readlineSync.question("Digite a nova altura (deixe vazio para manter a atual): ");
    let novoTipoSanguineo = readlineSync.question("Digite o novo tipo sanguíneo (deixe vazio para manter o atual): ");

    if (novoPeso) usuario.peso = novoPeso;
    if (novaAltura) usuario.altura = novaAltura;
    if (novoTipoSanguineo) usuario.tipoSanguineo = novoTipoSanguineo;

    console.log("Dados atualizados com sucesso!");
}

    listarUsuarios() {
        if (this.#usuarios.length === 0) {
            console.log("Nenhum usuário cadastrado.");
        } else {
            for (let usuario of this.#usuarios) {
                console.log(`Nome: ${usuario.nome}`);
                console.log(`Login: ${usuario.login}`);
                console.log(`Senha: ${usuario.senha}`);
                console.log(`Peso: ${usuario.peso}`);
                console.log(`Altura: ${usuario.altura}`);
                console.log(`Tipo Sanguíneo: ${usuario.tipoSanguineo}`);
                console.log('-------------------------');
            }
        }
    }

    atualizarUsuario(login) {
        let usuario = this.#usuarios.find(u => u.login === login);
        if (usuario) {
            let novoNome = readlineSync.question("Digite o novo nome (deixe vazio para manter o atual): ");
            let novaSenha = readlineSync.question("Digite a nova senha (deixe vazio para manter a atual): ");
            let novoPeso = readlineSync.question("Digite o novo peso (deixe vazio para manter o atual): ");
            let novaAltura = readlineSync.question("Digite a nova altura (deixe vazio para manter o atual): ");
            let novoTipoSanguineo = readlineSync.question("Digite o novo tipo sanguíneo (deixe vazio para manter o atual): ");

            if (novoNome) usuario.nome = novoNome;
            if (novaSenha) usuario.senha = novaSenha;
            if (novoPeso) usuario.peso = novoPeso;
            if (novaAltura) usuario.altura = novaAltura;
            if (novoTipoSanguineo) usuario.tipoSanguineo = novoTipoSanguineo;

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    removerUsuario(login) {
        let index = this.#usuarios.findIndex(u => u.login === login);
        if (index !== -1) {
            this.#usuarios.splice(index, 1);
            console.log("Usuário removido com sucesso!");
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    fazerLogin(login, senha) {
        let usuario = this.#usuarios.find(u => u.login === login && u.senha === senha);
        if (usuario) {
            console.log(`Bem-vindo, ${usuario.nome}!`);
            return true;
        } else {
            console.log("Login ou senha incorretos.");
            return false;
        }
    }

    fazerLoginAdmin(login, senha) {
        return login === this.#adminLogin && senha === this.#adminSenha;
    }

    menu() {
        let opcao;
        do {
            console.log("1. Fazer login");
            console.log("2. Se cadastrar");
            console.log("3. Sair");
            opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    var login = readlineSync.question("Digite seu login: ");
                    var senha = readlineSync.question("Digite sua senha: ");
                    if (this.fazerLoginAdmin(login, senha)) {
                        console.log("Login de administrador bem-sucedido.");
                        this.menuAdministrador();
                    } else if (this.fazerLogin(login, senha)) {
                        console.log("Login de usuário bem-sucedido.");
                        this.menuUsuario();
                    }
                    break;
                case '2':
                    var nome = readlineSync.question("Digite seu nome: ");
                    var login = readlineSync.question("Digite seu login: ");
                    var senha = readlineSync.question("Digite sua senha: ");
                    this.cadastrarUsuario(nome, login, senha);
                    break;
                case '3':
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } while (opcao !== '3');
    }
    
menuUsuario(usuario) {
    let opcao;
    do {
        console.log("\nMenu de Usuário:");
        console.log("1. Atualizar dados pessoais");
        console.log("2. Sair para o menu inicial");
        opcao = readlineSync.question("Escolha uma opção: ");

        switch (opcao) {
            case '1':
                this.atualizarDadosPessoais(usuario);
                break;
            case '2':
                console.log("Saindo para o menu inicial...");
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (opcao !== '2');
}


    menuAdministrador() {
        let opcao;
        do {
            console.log("1. Cadastrar usuário");
            console.log("2. Listar usuários");
            console.log("3. Atualizar usuário");
            console.log("4. Remover usuário");
            console.log("5. Sair");
            opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    var nome = readlineSync.question("Digite seu nome: ");
                    var login = readlineSync.question("Digite seu login: ");
                    var senha = readlineSync.question("Digite sua senha: ");
                    this.cadastrarUsuario(nome, login, senha);
                    break;
                case '2':
                    this.listarUsuarios();
                    break;
                case '3':
                    let loginParaAtualizar = readlineSync.question("Digite o login do usuário a ser atualizado: ");
                    this.atualizarUsuario(loginParaAtualizar);
                    break;
                case '4':
                    let loginParaRemover = readlineSync.question("Digite o login do usuário a ser removido: ");
                    this.removerUsuario(loginParaRemover);
                    break;
                case '5':
                    console.log("Saindo do menu de administrador...");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } while (opcao !== '5');
    }
}

const app = new Aplicacao();
app.menu();
