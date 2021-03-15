# Para rodar o projeto:

## Client
Abrir o CMD e acessar a pasta **/client** do projeto. No meu caso:
```
cd "C:\Users\{ USUÁRIO }\Projetos\ProjetoCertificados\v5\client"
```

Em seguida, executar o comando:
```
npm run serve
```

## Server
Abrir o CMD e acessar a pasta **/server** do projeto. No meu caso:
```
cd "C:\Users\{ USUÁRIO }\Projetos\ProjetoCertificados\v5\server"
```

Em seguida, executar o arquivo **index.js** através do Node:
```
node index.js
```
ou
```
nodemon index.js
```

## Database
No Banco de Dados, utilizei MySQL. Para facilitar, baixe e instale o [WampServer](https://www.wampserver.com/en/) e o [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

### Procedimentos:
- Execute o WampServer e aguarde seu ícone ficar verde.
*Obs.: Você tem que conseguir acessar o [phpMyAdmin](http://localhost/phpmyadmin/).*

- Abra o **MySQL Workbench** e selecione a Conexão Local.
```
User: root
Password: 
```
ou
```
User: root
Password: 12345
```

- Importe o banco de dados:
*Server > Data Import > Import from Dump Project Folder >* No meu caso:
```
C:\Users\{ USUÁRIO }\Projetos\ProjetoCertificados\v5\database
```
E *> Start Import*

### Tudo Pronto!!