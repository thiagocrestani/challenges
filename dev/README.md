### iHero
    
Você está no ano de 3150 e está a frente do setor de tecnologia responsável pelo desenvolvimento do sistema de gerenciamento de distribuição de Heros para combater ameaças. O sistema deve monitorar o sistema de alertas de ameças provido pela ONU e alocar os herois para cada nova ameaça existente no globo terrestre. 

O sistema contém as funcionalidades:
 - Autenticação
 - Cadastro, edição, remoção e listagem de herois
 - Alocação automatica de heroi quando uma nova ameaça surge.
 - Desaloação de herói (Final da batalha).
 - Histórico de ameaças.

Além disso, existem algumas regras de negócio:
- Cada **Hero** e **Ameaça** tem um rank
- Os herois são alocados de acordo com sua localização e rank adequado ao nível de ameaças.

O projeto está divido em duas partes:  
- Back-end – Desenvolvido em Node js.  
- Front-end – Desenvolvido em React JS.  
Além disso ele utiliza NoSql com um banco de dados utilizando MongoDB.  


## Back-end
O back-end da aplicação foi construído em NodeJS respeitando os padrões MVC. Ele fornece a API para conexão do front-end e é responsável pela comunicação com o servidor de banco de dados. É no back-end que é feita a integração com o socket de ameaças, ele analisa todas as ameaças e faz a alocação do herói mais adequado para determinada ameaça de forma automática.
Para testar seu funcionamento foram desenvolvidos alguns casos de testes que analisam o funcionamento da aplicação em diferentes situações.

## Front-end
O front-end da aplicação foi desenvolvido em React Js. Ele tem uma estrutura componentizada para facilitar sua organização e melhorar seu desempenho.
Ele contém alguns casos de testes, que verificam os resultados de operações básicas e o comportamento dos componentes na renderização da tela. 

Ele possui quatro páginas, Login, Heróis, Batalhas e Herói. 
- Login: Na página de Login o usuário administrador pode inserir suas credenciais para monitorar as atividades dos heróis, em seguida ele é redirecionado para a página de batalhas. 

![Login](https://uploaddeimagens.com.br/images/002/733/452/full/Captura_de_Tela_2020-06-26_a%CC%80s_17.54.24.png)


- Batalhas: Nessa página o usuário pode ver todas as batalhas que estão ocorrendo e marcar a batalha como encerrada, fazendo a desalocação do herói disponibilizando-o para uma nova batalha. 

![Batalhas](https://uploaddeimagens.com.br/images/002/733/458/full/Captura_de_Tela_2020-06-26_a%CC%80s_17.54.10.png)

- Heróis: Nessa tela é possível ver todos os heróis cadastrados no sistema e sua classificação, além de disponibilizar as opções de editar e excluir os heróis.

![Heróis](https://uploaddeimagens.com.br/images/002/733/460/original/Captura_de_Tela_2020-06-26_a%CC%80s_17.53.45.png)

- Herói: Nessa página o usuário pode cadastrar ou editar um herói indicando seu nome e classe.  

![Herói](https://uploaddeimagens.com.br/images/002/733/461/original/Captura_de_Tela_2020-06-26_a%CC%80s_17.53.57.png)


## Como utilizar
Depois de baixar ou clonar o projeto navegue até a pasta do projeto utilizando o terminal.   
Em seguida, é necessário instalar as dependências, para isso execute os comandos nas pastas api e frontend:  
  
```shell
cd challenges/dev/api  
yarn install
```
  
```shell
cd challenges/dev/frontend
yarn install
```
  
Após isso o projeto pode ser utilizado.  
Primeiro abra uma janela do terminal vá até a pasta do projeto e execute os comandos para iniciar o back-end:  
```shell
cd challenges/dev/api
node src/index.js
```
  
A aplicação devera iniciar em http://localhost:8000.  
Após isso ainda com o terminal aberto e o back-end iniciado, abra outra janela do terminal e navegue até a pasta do projeto. Depois execute os seguintes comandos:  
```shell
cd challenges/dev/frontend
yarn start
```
  
Então acessando o endereço http://localhost:3000 a aplicação já deverá estar funcionando normalmente.
Para acessar o sistema deve ser utilizado as seguintes credenciais:
- Login: **admin**
- Senha: **123456**

### Atenção
Para que o projeto funcione são necessárias as seguintes dependências instaladas na máquina:  
- NodeJs: https://nodejs.org/en/download/  
- NPM: https://docs.npmjs.com/cli/install  
- Yarn: https://yarnpkg.com/lang/en/docs/install/  


## Testes
O projeto contém testes no front-end e back-end.  
Para executar os testes de back-end é necessário iniciar o back-end da aplicação conforme os passos descritos no item anterior.  
Em seguida abrir uma nova janela do terminal, navegar até a pasta do projeto e executar os seguintes comandos:  
```shell
cd challenges/dev/api
mocha
```

Os resultados esperados são algo parecido com: 
```shell
  Test Hero methods
    ✓ Test CRUD hero

  Test User methods
    ✓ Test login method (280ms)
    ✓ Test restriced pages


  3 passing (315ms)
```

Para executar os testes no front-end é necessário abrir uma janela do terminal e acessar a pasta do projeto (com o back-end inciado), então digitar os seguintes comandos:  

```shell
cd challenges/dev/frontend
yarn test
```

Os resultados esperados são parecidos com:  
```shell
 PASS  src/tests/Pages/Battles.test.js
 PASS  src/tests/Pages/Login.test.js
 PASS  src/tests/Pages/Heroes.test.js

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.672s
```
