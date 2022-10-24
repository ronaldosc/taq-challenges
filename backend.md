# Desafio Backend

# O desafio

O desafio é criar uma API Rest ou Graphql em Node.js para uma aplicação de Sistema de Fiscalização de Viajantes do tempo em que ficais podem cadastrar viajantes e infrações, e validar viagens.

A aplicação deverá permitir:

- Cadastro de viajante no tempo com nome, data de nascimento e número de passaporte de viajante;
- Cadastro de infração de um viajante com descrição da infração, o número do passaporte, data e hora em que a infração foi cometida e gravidade;
- Consulta de detalhes de viajante por número de passaporte;
- Listagem de infrações por viajante;
- Verificar se um viajante pode realizar viagens em um dado período temporal.

Toda infração no espaço-tempo pode ter as seguintes gravidades e pontos:

- Baixa: 3 pontos
- Média: 5 pontos
- Grave: 7 pontos
- Gravíssima: 12 pontos

Para verificar se um viajante pode viajar para um dado período, existem as seguintes regras:

- Por questões de segurança do espaço-tempo o viajante não pode viajar para antes de seu nascimento;
- O viajante não pode viajar se houver mais de 12 pontos de infações nos ultimos 12 meses (considerando a data UTC atual);
- O viajante não pode viajar se tiver cometido qualquer tipo de infração um ano antes ou depois do período desejado.

O desafio deverá ser entregue num repositório privado no Github e deverá chamar como colaboradores os usuários: `LucasGobatto` e `rafaelsandoval`

OBS: Para todas as operações temporais, considere UTC.

OBS: Desconsidere paradoxos temporais fora do escopo do projeto.

# Critérios de avaliação

- Não esperamos que você seja super familiarizado com Node.js, Typescript, ou nada que utilizamos como stack padrão em nossa empresa.
- Fazer perguntas é positivo. Não penalizaremos por questionarem. No nosso ambiente de trabalho, preferimos que a pessoa gaste um tempo para entender o que deve ser feito, do que despender o dia inteiro implementando algo errado.
- Buscamos levantar indícios que você entende conceitos como separação de responsabilidades, reaproveitamento de código, composição e programação assíncrona.
- Esperamos que seu código seja limpo, fácil de ser compreendido e testado. Comente seu código mas lembre-se que excesso de comentários também é fonte de poluição.
- Se você considerar este desafio muito complexo ou se sente travado, sinta-se à vontade em pedir nossa ajuda. Preferimos candidatos que atinjam seu objetivo, mesmo com auxílio, do que simplesmente desistir.

# Bônus

- Testes automatizados
- Completar o CRUD de viajante e multas
- Autenticação e cadastro de fiscais
- Logs de utilização do sistema

# FAQ

### Posso usar Nest.js ou outros frameworks?

Não, para esse desafio queremos também avaliar a arquitetura da solução, então pedimos que só utilize algum frameworks minimalistas como express, Koa, fastify, ou similar

## Posso utilizar Typescript para escrever meu código?

Sim.

## Como devo organizar as pastas e nomear meus arquivos?

Não há uma regra para isto. Apenas tenha em mente que esta separação deve seguir alguma regra consistente.

## Eu preciso fazer o deploy da resposta?

Não. A sua resolução deve ser enviada através do e-mail e deverá rodar através do comando `npm start` sem erros.
