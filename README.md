# Documentação da Aplicação: Gerenciamento de Filmes

## 1. Visão Geral

Esta aplicação é um **sistema de gerenciamento de filmes**, permitindo **cadastrar, listar, atualizar e deletar filmes**.

- **Backend:** Ruby on Rails
- **Frontend:** React + TypeScript
- **Banco de dados:** SQLite (local)
- **Bibliotecas:** Axios, React-Bootstrap, Material UI (MUI), React Router

O recurso principal da aplicação é o **filme (`Movie`)**.

---

## 2. Recurso: Movie

O recurso `Movie` possui as seguintes propriedades:

| Campo           | Tipo      | Obrigatório | Observações                               |
|-----------------|-----------|------------|--------------------------------------------|
| `id`            | number    | Sim        | Gerado automaticamente pelo Rails          |
| `name`          | string    | Sim        | Nome do filme                              |
| `price`         | number    | Sim        | Preço do ingresso do filme                 |
| `release_date`  | string    | Sim        | Data de lançamento no formato `YYYY-MM-DD` |

---

## 3. Linguagens e Tecnologias

**Backend:**
- Ruby 3.4.4
- Rails 8.0.2.1
- SQLite
- Rack::Cors

**Frontend:**
- React 18.x + TypeScript
- React-Bootstrap
- Material UI (MUI)
- Axios
- React Router

---

## 4. Instalação e Configuração

### 4.1 Backend (Rails)

1. **Instalar Ruby e Rails**
```bash
(linux)
sudo apt update
sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate)"' >> ~/.bashrc
source ~/.bashrc
mise use -g ruby@3

ou

(windows)
wsl --install --distribution Ubuntu-24.04
sudo apt update
sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
mise use -g ruby@3

apos instalar ruby:
gem install rails

Documentação oficial: "https://guides.rubyonrails.org/install_ruby_on_rails.html#install-ruby-on-ubuntu"
```

2. **Iniciando Bando de Dados**
```bash
bundle install
db:create
db:migrate
```

3. **Iniciando Servidor**
```bash
rails s
```

### 4.2 FrontEnd (React)

1. **Instalando NPM e Node**
```bash
sudo apt install nodejs (Linux)
ou
docker pull node:22-alpine
docker run -it --rm --entrypoint sh node:22-alpine (macOS/Windows)
documentação oficial : "https://nodejs.org/en/download"
```

2. **Istalando modulos**
```bash
npm install
```

3. **Iniciando Servidor**
```bash
npm start
```

## 5. Funcionalidades

### 5.1 Listar Filmes
- Tela inicial exibe tabela de filmes (`ListMovies.tsx`) com:
  - Nome
  - Preço
  - Data de Lançamento
- Ações disponíveis:
  - **Editar:** redireciona para `/updateMovie?id=<id>`
  - **Deletar:** abre modal de confirmação antes de remover

### 5.2 Cadastrar Novo Filme
- Acessar `/newMovie`
- Campos obrigatórios:
  - Nome (`name`)
  - Data de Estreia (`release_date`, formato `YYYY-MM-DD`)
- Campos opcionais:
  - Preço do ingresso (`price`)
- Clique em **Atualizar** para enviar ao backend via `POST`

### 5.3 Atualizar Filme
- Acessar `/updateMovie?id=<id>`
- Os campos são preenchidos com os dados atuais do filme
- Alterações enviadas via `PUT` com o botão **Atualizar**

### 5.4 Deletar Filme
- Clicar no ícone de **lixeira** na tabela
- Confirmar remoção no modal (`ConfirmDelete.tsx`)
- O filme é removido via `DELETE`
