Dois codigos, um funcionando corretamente porém sem menu de usuario.
o outro com menu usuario porém com erro ao inserir os propios dados.



versão codigos em txt = 
Certo - 
/*
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
*/



Com bug - 
/*
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
*/


**************************************************************************************************************************ADD NOVO*****************************************************************************************************************************************

const readlineSync = require('readline-sync');

class Usuario {
    #senha = "";
    #login = "";
    #nome = "";
    #endereco = "";
    #id = "";
    #peso = null;
    #altura = null;
    #tipoSanguineo = null;

    constructor(nome, login, senha,endereco) {
        this.#nome = nome;
        this.#senha = senha;
        this.#login = login;
        this.#endereco = endereco;
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
    
    get endereco() {
        return this.#endereco;
    }

    set endereco(endereco) {
        this.#endereco = endereco;
    }
    
    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
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

        let usuario = new Usuario(nome, login, senha, id, endereco);
        this.#usuarios.push(usuario);
        console.log("Usuário cadastrado com sucesso!");
    }
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
                console.log(`Peso: ${usuario.id}`);
                console.log(`Peso: ${usuario.endereco}`);
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
            let novoId = readlineSync.question("Digite a nova altura (deixe vazio para manter o atual): ");
            let novoEndereco = readlineSync.question("Digite a nova altura (deixe vazio para manter o atual): ");
            let novoTipoSanguineo = readlineSync.question("Digite o novo tipo sanguíneo (deixe vazio para manter o atual): ");

            if (novoNome) usuario.nome = novoNome;
            if (novaSenha) usuario.senha = novaSenha;
            if (novoPeso) usuario.peso = novoPeso;
            if (novaAltura) usuario.altura = novaAltura;
            if (novaId) usuario.id = novoId;
            if (novaEndereco) usuario.endereco = novoEndereco;
            if (novoTipoSanguineo) usuario.tipoSanguineo = novoTipoSanguineo;

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.log("Usuário não encontrado.");
        }
    }
    atualizarConsulta(login) {
        let usuario = this.#usuarios.find(u => u.login === login);
        if (usuario) {
            let novoPeso = readlineSync.question("Digite o novo peso (deixe vazio para manter o atual): ");
            let novaAltura = readlineSync.question("Digite a nova altura (deixe vazio para manter o atual): ");
            let novoTipoSanguineo = readlineSync.question("Digite o novo tipo sanguíneo (deixe vazio para manter o atual): ");

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
            console.log("2. Sair");
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
                    }
                    break;
                case '2':
                    console.log("Saindo...");
                    break;
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
            console.log("4. Atualizar consulta");
            console.log("5. Remover usuário");
            console.log("6. Sair");
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
                    let consultaParaAtualizar = readlineSync.question("Digite a Consulta do usuário a ser atualizada: ");
                    this.atualizarUsuario(consultaParaAtualizar);
                    break;
                case '5':
                    let loginParaRemover = readlineSync.question("Digite o login do usuário a ser removido: ");
                    this.removerUsuario(loginParaRemover);
                    break;
                case '6':
                    console.log("Saindo do menu de administrador...");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } while (opcao !== '6');
    }
}

const app = new Aplicacao();
app.menu();



----------------------------------------------------------------------------------------------------------------------------------NOVO CODIGO---------------------------------------------------------------------------------------------------------------------------------

const readlineSync = require('readline-sync');

class Usuario {
    static #contadorIds = 0;

    #senha = "";
    #login = "";
    #nome = "";
    #endereco = "";
    #id = 0;
    #peso = null;
    #altura = null;
    #tipoSanguineo = null;

    constructor(nome, login, senha, endereco) {
        this.#nome = nome;
        this.#senha = senha;
        this.#login = login;
        this.#endereco = endereco;
        this.#id = ++Usuario.#contadorIds;
        this.#peso = 0
        this.#altura = 0
        this.#tipoSanguineo = ""
        
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
    
    get endereco() {
        return this.#endereco;
    }

    set endereco(endereco) {
        this.#endereco = endereco;
    }
    
    get id() {
        return this.#id;
    }

    static reiniciarContador() {
        Usuario.#contadorIds = 0;
    }
}

class Aplicacao {
    #usuarios = [];
    #adminLogin = 'admin';
    #adminSenha = 'admin123';

    cadastrarUsuario(nome, login, senha, endereco) {
        if (this.#usuarios.find(u => u.login === login)) {
            console.log("Erro: Login já existe. Tente novamente com um login diferente.");
            return;
        }
        if (login.toLowerCase() === this.#adminLogin) {
            console.log("Erro: Login 'admin' é reservado. Tente novamente com um login diferente.");
            return;
        }

        let usuario = new Usuario(nome, login, senha, endereco);
        this.#usuarios.push(usuario);
        console.log("Usuário cadastrado com sucesso!");
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
                console.log(`ID: ${usuario.id}`);
                console.log(`Endereço: ${usuario.endereco}`);
                console.log(`Tipo Sanguíneo: ${usuario.tipoSanguineo}`);
                console.log('-------------------------');
            }
        }
    }

    atualizarUsuario(id) {
        let usuario = this.#usuarios.find(u => u.id === parseInt(id));
        if (usuario) {
            let novoNome = readlineSync.question("Digite o novo nome (deixe vazio para manter o atual): ");
            let novoLogin = readlineSync.question("Digite o novo login (deixe vazio para manter o atual): ");
            let novaSenha = readlineSync.question("Digite a nova senha (deixe vazio para manter a atual): ");
            let novoEndereco = readlineSync.question("Digite o novo endereço (deixe vazio para manter o atual): ");

            if (novoNome) usuario.nome = novoNome;
            if (novoLogin) usuario.login = novoLogin;
            if (novaSenha) usuario.senha = novaSenha;
            if (novoEndereco) usuario.endereco = novoEndereco;

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    buscarUsuarioPorId(id) {
        let usuario = this.#usuarios.find(u => u.id === parseInt(id));
        if (usuario) {
            console.log(`Nome: ${usuario.nome}`);
            console.log(`Login: ${usuario.login}`);
            console.log(`Senha: ${usuario.senha}`);
            console.log(`Peso: ${usuario.peso}`);
            console.log(`Altura: ${usuario.altura}`);
            console.log(`ID: ${usuario.id}`);
            console.log(`Endereço: ${usuario.endereco}`);
            console.log(`Tipo Sanguíneo: ${usuario.tipoSanguineo}`);
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    atualizarConsulta(id) {
        let usuario = this.#usuarios.find(u => u.id === parseInt(id));
        if (usuario) {
            let novoPeso = readlineSync.question("Digite o novo peso (deixe vazio para manter o atual): ");
            let novaAltura = readlineSync.question("Digite a nova altura (deixe vazio para manter o atual): ");
            let novoTipoSanguineo = readlineSync.question("Digite o novo tipo sanguíneo (deixe vazio para manter o atual): ");

            if (novoPeso) usuario.peso = novoPeso;
            if (novaAltura) usuario.altura = novaAltura;
            if (novoTipoSanguineo) usuario.tipoSanguineo = novoTipoSanguineo;

            console.log("Consulta atualizada com sucesso!");
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    removerUsuario(id) {
        let index = this.#usuarios.findIndex(u => u.id === parseInt(id));
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
            this.menuUsuario(login);
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
            console.log("2. Sair");
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
                    }
                    break;
                case '2':
                    console.log("Saindo...");
                    break;
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
            console.log("4. Buscar usuário por ID");
            console.log("5. Atualizar consulta");
            console.log("6. Remover usuário");
            console.log("7. Sair");
            opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    var nome = readlineSync.question("Digite seu nome: ");
                    var login = readlineSync.question("Digite seu login: ");
                    var senha = readlineSync.question("Digite sua senha: ");
                    var endereco = readlineSync.question("Digite seu endereço: ");
                    this.cadastrarUsuario(nome, login, senha, endereco);
                    break;
                case '2':
                    this.listarUsuarios();
                    break;
                case '3':
                    let idParaAtualizar = readlineSync.question("Digite o ID do usuário para atualizar: ");
                    this.atualizarUsuario(idParaAtualizar);
                    break;
                case '4':
                    let idParaBuscar = readlineSync.question("Digite o ID do usuário a ser buscado: ");
                    this.buscarUsuarioPorId(idParaBuscar);
                    break;
                case '5':
                    let idParaAtualizarConsulta = readlineSync.question("Digite o ID do usuário para atualizar consulta: ");
                    this.atualizarConsulta(idParaAtualizarConsulta);
                    break;
                case '6':
                    let idParaRemover = readlineSync.question("Digite o ID do usuário a ser removido: ");
                    this.removerUsuario(idParaRemover);
                    break;
                case '7':
                    console.log("Saindo do menu de administrador...");
                    return; // Retorna ao menu principal
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } while (opcao !== '7');
    }

    menuUsuario(login) {
        let usuario = this.#usuarios.find(u => u.login === login);
        let opcao;
        do {
            console.log("\nMenu de Usuário");
            console.log("1. Exibir dados");
            console.log("2. Atualizar nome");
            console.log("3. Atualizar login");
            console.log("4. Atualizar senha");
            console.log("5. Atualizar endereço");
            console.log("6. Sair");
            opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case '1':
                    console.log(`Nome: ${usuario.nome}`);
                    console.log(`Login: ${usuario.login}`);
                    console.log(`Senha: ${usuario.senha}`);
                    console.log(`Peso: ${usuario.peso}`);
                    console.log(`Altura: ${usuario.altura}`);
                    console.log(`ID: ${usuario.id}`);
                    console.log(`Endereço: ${usuario.endereco}`);
                    console.log(`Tipo Sanguíneo: ${usuario.tipoSanguineo}`);
                    break;
                case '2':
                    let novoNome = readlineSync.question("Digite o novo nome: ");
                    usuario.nome = novoNome;
                    console.log("Nome atualizado com sucesso!");
                    break;
                case '3':
                    let novoLogin = readlineSync.question("Digite o novo login: ");
                    if (this.#usuarios.find(u => u.login === novoLogin)) {
                        console.log("Erro: Login já existe. Tente novamente com um login diferente.");
                    } else {
                        usuario.login = novoLogin;
                        console.log(`Login atualizado com sucesso! Bem-vindo, ${usuario.nome}!`);
                    }
                    break;
                case '4':
                    let novaSenha = readlineSync.question("Digite a nova senha: ");
                    usuario.senha = novaSenha;
                    console.log("Senha atualizada com sucesso!");
                    break;
                case '5':
                    let novoEndereco = readlineSync.question("Digite o novo endereço: ");
                    usuario.endereco = novoEndereco;
                    console.log("Endereço atualizado com sucesso!");
                    break;
                case '6':
                    console.log("Saindo do menu de usuário...");
                    return; // Retorna ao menu principal
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } while (opcao !== '6');
    }
}

const app = new Aplicacao();
app.menu();



---------------------------------------------------------------------------------------------------------------------------CRUD DA ESCOLA -----------------------------------------------------------------------------------------------------------------------------------


const readlineSync = require('readline-sync');

class Disciplina {
    static #contadorIds = 0;

    #nome = "";
    #curso = "";
    #cargaHoraria = null;
    #teorica = null;
    #pratica = null;
    #nota1 = null;
    #nota2 = null;
    #nota3 = null;
    #nota4 = null;

    constructor(nome, curso, cargaHoraria) {
        this.#nome = nome;
        this.#curso = curso;
        this.#cargaHoraria = cargaHoraria;
        this.#teorica = this.calcularTeorica();
        this.#pratica = this.calcularPratica();
        this.id = ++Disciplina.#contadorIds;
    }

    calcularTeorica() {
        if (this.#cargaHoraria === 30) return 15;
        else if (this.#cargaHoraria === 45) return 30;
        else if (this.#cargaHoraria === 80) return 40;
        else if (this.#cargaHoraria === 90) return 45;
        else return 0;
    }

    calcularPratica() {
        if (this.#cargaHoraria === 30) return 15;
        else if (this.#cargaHoraria === 45) return 15;
        else if (this.#cargaHoraria === 80) return 40;
        else if (this.#cargaHoraria === 90) return 45;
        else return 0;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get curso() {
        return this.#curso;
    }

    set curso(curso) {
        this.#curso = curso;
    }

    get cargaHoraria() {
        return this.#cargaHoraria;
    }

    set cargaHoraria(cargaHoraria) {
        this.#cargaHoraria = cargaHoraria;
        this.#teorica = this.calcularTeorica();
        this.#pratica = this.calcularPratica();
    }

    get teorica() {
        return this.#teorica;
    }

    get pratica() {
        return this.#pratica;
    }

    inserirNota(nota) {
        if (this.#cargaHoraria === 30 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 30 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 45 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 45 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 45 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 80 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 80 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 80 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 90 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && this.#nota2 && this.#nota3 && !this.#nota4) {
            this.#nota4 = nota;
        } else {
            console.log("Número máximo de notas atingido para esta disciplina.");
        }
    }

    listarNotas() {
        console.log(`Notas da disciplina ${this.#nome}:`);
        if (this.#nota1) console.log(`Nota 1: ${this.#nota1}`);
        if (this.#nota2) console.log(`Nota 2: ${this.#nota2}`);
        if (this.#nota3) console.log(`Nota 3: ${this.#nota3}`);
        if (this.#nota4) console.log(`Nota 4: ${this.#nota4}`);
    }
}

class Aplicacao {
    #disciplinas = [];

    cadastrarDisciplina(nome, curso, cargaHoraria) {
        const existeDisciplina = this.#disciplinas.some(disciplina => disciplina.nome === nome && disciplina.curso === curso);
        if (existeDisciplina) {
            console.log("Já existe uma disciplina com esse nome neste curso.");
            return;
        }
        let disciplina = new Disciplina(nome, curso, cargaHoraria);
        this.#disciplinas.push(disciplina);
        console.log("Disciplina cadastrada com sucesso!");
    }

    listarDisciplinas() {
        if (this.#disciplinas.length === 0) {
            console.log("Nenhuma disciplina cadastrada.");
        } else {
            for (let disciplina of this.#disciplinas) {
                console.log(`Nome: ${disciplina.nome}`);
                console.log(`Curso: ${disciplina.curso}`);
                console.log(`Carga Horária: ${disciplina.cargaHoraria}`);
                console.log(`Teórica: ${disciplina.teorica}`);
                console.log(`Prática: ${disciplina.pratica}`);
                disciplina.listarNotas();
                console.log('-------------------------');
            }
        }
    }

    atualizarDisciplina(id) {
        let disciplina = this.#disciplinas.find(d => d.id === parseInt(id));
        if (disciplina) {
            let novoNome = readlineSync.question("Digite o novo nome (deixe vazio para manter o atual): ");
            let novoCurso = readlineSync.question("Digite o novo curso (deixe vazio para manter o atual): ");
            let novaCargaHoraria = readlineSync.question("Digite a nova carga horária (deixe vazio para manter a atual): ");
            if (novoNome) disciplina.nome = novoNome;
            if (novoCurso) disciplina.curso = novoCurso;
            if (novaCargaHoraria) disciplina.cargaHoraria = parseInt(novaCargaHoraria);
            console.log("Disciplina atualizada com sucesso!");
        } else {
            console.log("Disciplina não encontrada.");
        }
    }

    inserirNota(id) {
        let disciplina = this.#disciplinas.find(d => d.id === parseInt(id));
        if (disciplina) {
            let nota = readlineSync.question("Digite a nota a ser inserida (deixe em branco para cancelar): ");
            if (nota !== "") {
                disciplina.inserirNota(nota);
            } else {
                console.log("Inserção de nota cancelada.");
            }
        } else {
            console.log("Disciplina não encontrada.");
        }
    }

    removerDisciplina(id) {
        let index = this.#disciplinas.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
            this.#disciplinas.splice(index, 1);
            console.log("Disciplina removida com sucesso!");
        } else {
            console.log("Disciplina não encontrada.");
        }
    }
}

const app = new Aplicacao();

function menu() {
    let opcao;
    do {
        console.log("1. Cadastrar disciplina");
        console.log("2. Listar disciplinas");
        console.log("3. Atualizar disciplina");
        console.log("4. Inserir nota");
        console.log("5. Remover disciplina");
        opcao = readlineSync.question("Escolha uma opção: ");

        switch (opcao) {
            case '1':
                let nome = readlineSync.question("Digite o nome da disciplina: ");
                let curso = readlineSync.question("Digite o curso da disciplina: ");
                let cargaHoraria = readlineSync.question("Digite a carga horária da disciplina (30/45/80/90): ");
                if (![30, 45, 80, 90].includes(parseInt(cargaHoraria))) {
                    console.log("Carga horária inválida.");
                    break;
                }
                app.cadastrarDisciplina(nome, curso, parseInt(cargaHoraria));
                break;
            case '2':
                app.listarDisciplinas();
                break;
            case '3':
                let idParaAtualizar = readlineSync.question("Digite o ID da disciplina para atualizar: ");
                app.atualizarDisciplina(idParaAtualizar);
                break;
            case '4':
                let idParaInserirNota = readlineSync.question("Digite o ID da disciplina para inserir nota: ");
                app.inserirNota(idParaInserirNota);
                break;
            case '5':
                let idParaRemover = readlineSync.question("Digite o ID da disciplina a ser removida: ");
                app.removerDisciplina(idParaRemover);
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (opcao !== '5');
}

menu();



------------------------------------------------------------------------------------------------------------------------------parte 2 crud escola ---------------------------------------------------------------------------------------------------------------------------


const readlineSync = require('readline-sync');

class Disciplina {
    static #contadorIds = 0;

    #nome = "";
    #curso = "";
    #cargaHoraria = null;
    #teorica = null;
    #pratica = null;
    #nota1 = null;
    #nota2 = null;

    constructor(nome, curso, cargaHoraria ,nota1, nota2 ) {
        this.#nome = nome;
        this.#curso = curso;
        this.#cargaHoraria = cargaHoraria;
        this.#teorica = this.calcularTeorica();
        this.#pratica = this.calcularPratica();
        this.#nota1 = nota1
        this.#nota2 = nota2
        this.id = ++Disciplina.#contadorIds;
    }

    calcularTeorica() {
        if (this.#cargaHoraria === 30) return 15;
        else if (this.#cargaHoraria === 45) return 30;
        else if (this.#cargaHoraria === 80) return 40;
        else if (this.#cargaHoraria === 90) return 45;
        else return 0;
    }

    calcularPratica() {
        if (this.#cargaHoraria === 30) return 15;
        else if (this.#cargaHoraria === 45) return 15;
        else if (this.#cargaHoraria === 80) return 40;
        else if (this.#cargaHoraria === 90) return 45;
        else return 0;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get curso() {
        return this.#curso;
    }

    set curso(curso) {
        this.#curso = curso;
    }

    get cargaHoraria() {
        return this.#cargaHoraria;
    }

    set cargaHoraria(cargaHoraria) {
        this.#cargaHoraria = cargaHoraria;
        this.#teorica = this.calcularTeorica();
        this.#pratica = this.calcularPratica();
    }

    get teorica() {
        return this.#teorica;
    }

    get pratica() {
        return this.#pratica;
    }

    inserirNota(nota) {
        /*if (this.#cargaHoraria === 30 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 30 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 45 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 45 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 45 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 80 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 80 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 80 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 90 && !this.#nota1) {
            this.#nota1 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && !this.#nota2) {
            this.#nota2 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && this.#nota2 && !this.#nota3) {
            this.#nota3 = nota;
        } else if (this.#cargaHoraria === 90 && this.#nota1 && this.#nota2 && this.#nota3 && !this.#nota4) {
            this.#nota4 = nota;
        } else {
            console.log("Número máximo de notas atingido para esta disciplina.");
        }*/
    }

    listarNotas() {
        console.log(`Notas da disciplina ${this.#nome}:`);
        if (this.#nota1) console.log(`Nota 1: ${this.#nota1}`);
        if (this.#nota2) console.log(`Nota 2: ${this.#nota2}`);
        if (this.#nota3) console.log(`Nota 3: ${this.#nota3}`);
        if (this.#nota4) console.log(`Nota 4: ${this.#nota4}`);
    }
}


class CargaHoraria {
    #teorica;
    #pratica;

    constructor(teorica, pratica) {
        this.#teorica = teorica;
        this.#pratica = pratica;
    }

    getTeorica() {
        return this.#teorica;
    }

    getPratica() {
        return this.#pratica;
    }
}



class CargaHoraria45 extends Disciplina {
    #nota3 = 0;
    constructor(nome, curso, cargaHoraria ,nota1, nota2, nota3) {
        super(nome, curso, cargaHoraria ,nota1, nota2);
        this.#nota3 = nota3
    }
}

class CargaHoraria80 extends Disciplina {
    #nota3 = 0;
    constructor(nome, curso, cargaHoraria ,nota1, nota2, nota3) {
        super(nome, curso, cargaHoraria ,nota1, nota2);
        this.#nota3 = nota3
    }
}

class CargaHoraria90 extends Disciplina {
    #nota3 = 0;
    #nota4 = 0;
    constructor(nome, curso, cargaHoraria ,nota1, nota2, nota3, nota4) {
        super(nome, curso, cargaHoraria ,nota1, nota2);
        this.#nota3 = nota3
        this.#nota4 = nota4
    }
}

class Aplicacao {
    #disciplinas = [];

    cadastrarDisciplina(nome, curso, cargaHoraria) {
        const existeDisciplina = this.#disciplinas.some(disciplina => disciplina.nome === nome && disciplina.curso === curso);
        if (existeDisciplina) {
            console.log("Já existe uma disciplina com esse nome neste curso.");
            return;
        }
        let disciplina = new Disciplina(nome, curso, cargaHoraria);
        this.#disciplinas.push(disciplina);
        console.log("Disciplina cadastrada com sucesso!");
    }

    listarDisciplinas() {
        if (this.#disciplinas.length === 0) {
            console.log("Nenhuma disciplina cadastrada.");
        } else {
            for (let disciplina of this.#disciplinas) {
                console.log(`Nome: ${disciplina.nome}`);
                console.log(`Curso: ${disciplina.curso}`);
                console.log(`Carga Horária: ${disciplina.cargaHoraria}`);
                console.log(`Teórica: ${disciplina.teorica}`);
                console.log(`Prática: ${disciplina.pratica}`);
                disciplina.listarNotas();
                console.log('-------------------------');
            }
        }
    }

    atualizarDisciplina(id) {
        let disciplina = this.#disciplinas.find(d => d.id === parseInt(id));
        if (disciplina) {
            let novoNome = readlineSync.question("Digite o novo nome (deixe vazio para manter o atual): ");
            let novoCurso = readlineSync.question("Digite o novo curso (deixe vazio para manter o atual): ");
            let novaCargaHoraria = readlineSync.question("Digite a nova carga horária (deixe vazio para manter a atual): ");
            if (novoNome) disciplina.nome = novoNome;
            if (novoCurso) disciplina.curso = novoCurso;
            if (novaCargaHoraria) disciplina.cargaHoraria = parseInt(novaCargaHoraria);
            console.log("Disciplina atualizada com sucesso!");
        } else {
            console.log("Disciplina não encontrada.");
        }
    }

    inserirNota(id) {
        let disciplina = this.#disciplinas.find(d => d.id === parseInt(id));
        if (disciplina) {
            let nota = readlineSync.question("Digite a nota a ser inserida (deixe em branco para cancelar): ");
            if (nota !== "") {
                disciplina.inserirNota(nota);
            } else {
                console.log("Inserção de nota cancelada.");
            }
        } else {
            console.log("Disciplina não encontrada.");
        }
    }

    removerDisciplina(id) {
        let index = this.#disciplinas.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
            this.#disciplinas.splice(index, 1);
            console.log("Disciplina removida com sucesso!");
        } else {
            console.log("Disciplina não encontrada.");
        }
    }
}

const app = new Aplicacao();

function menu() {
    let opcao;
    do {
        console.log("1. Cadastrar disciplina");
        console.log("2. Listar disciplinas");
        console.log("3. Atualizar disciplina");
        console.log("4. Inserir nota");
        console.log("5. Remover disciplina");
        opcao = readlineSync.question("Escolha uma opção: ");

        switch (opcao) {
            case '1':
                let nome = readlineSync.question("Digite o nome da disciplina: ");
                let curso = readlineSync.question("Digite o curso da disciplina: ");
                let cargaHoraria = readlineSync.question("Digite a carga horária da disciplina (30/45/80/90): ");
                if (![30, 45, 80, 90].includes(parseInt(cargaHoraria))) {
                    console.log("Carga horária inválida.");
                    break;
                }
                app.cadastrarDisciplina(nome, curso, parseInt(cargaHoraria));
                break;
            case '2':
                app.listarDisciplinas();
                break;
            case '3':
                let idParaAtualizar = readlineSync.question("Digite o ID da disciplina para atualizar: ");
                app.atualizarDisciplina(idParaAtualizar);
                break;
            case '4':
                let idParaInserirNota = readlineSync.question("Digite o ID da disciplina para inserir nota: ");
                app.inserirNota(idParaInserirNota);
                break;
            case '5':
                let idParaRemover = readlineSync.question("Digite o ID da disciplina a ser removida: ");
                app.removerDisciplina(idParaRemover);
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (opcao !== '5');
}

menu();
