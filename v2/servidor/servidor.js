const { ApolloServer } = require("apollo-server");

const typeDefs = `

    type Aluno {
        id: Int
        nome: String
    }

    type Curso {
        id: Int
        nome: String
        imagem: String
    }

    type Query {
        alunos: [Aluno]
        cursos: [Curso]
    }

    input AlunoInput {
        nome: String
    }

    input CursoInput {
        nome: String
        imagem: String
    }

    type Mutation {
        registraAluno(item: AlunoInput): Aluno
        registraCurso(item: CursoInput): Curso
    }

`;

const alunos = [
    { id: 1, nome: "João Pedro da Silva" },
    { id: 2, nome: "Maria Eduarda Gonzales" },
    { id: 3, nome: "Enzo José Ribeiro Dantas da Cunha Barros" }
];

const cursos = [
    { id: 1, nome: "Português", imagem: "fundo_01.jpg" },
    { id: 2, nome: "Matemática", imagem: "fundo_02.jpg" },
    { id: 3, nome: "Informática", imagem: "fundo_03.jpg" }
];

const resolvers = {
    Query: {
        alunos() {
            return alunos;
        },
        cursos() {
            return cursos;
        }
    },
    Mutation: {
        registraAluno(_, args) {
            const aluno = args.aluno;
            aluno.id = Math.floor(Math.random() * 1000);
            alunos.push(aluno);
            return aluno;
        },
        registraCurso(_, args) {
            const curso = args.curso;
            curso.id = Math.floor(Math.random() * 1000);
            cursos.push(curso);
            return curso;
        }
    }
};

const servidor = new ApolloServer({ typeDefs, resolvers });
servidor.listen();
