import { dataORM } from "./db/dbconfig"
import { TimeTraveller } from "./db/entities"

interface getTravellerInfoInput {
    passport: number
}

interface CreateTimeTravellerInput {
    name: string
    birth: string
    passport: number
}

export const resolvers = {
  
    Query: { 
        getTravellerInfo: async (_header: never, body: { data: getTravellerInfoInput }) => {
            return dataORM.getRepository(TimeTraveller).findOne({ where: { passport: body.data.passport } })
      },
    },

    Mutation: {
        createTimeTraveller: async (_header: never, body: { input: CreateTimeTravellerInput }) => {
          // acessando a table time_traveller
          const repository = dataORM.getRepository(TimeTraveller);

          // verifica se o traveller ja existe com o passport enviado
          const traveller = await repository.findOne({  where: { passport: body.input.passport }});

          if (traveller) {
            throw new Error(`Usuário com o passaporte ${body.input.passport} já exite.`);
          }

          // salva o traveller (cria a entidade) no banco, caso nao exista
          return repository.save({
            name: body.input.name,
            birth: body.input.birth,
            passport: body.input.passport
          });
        }
    }
}
