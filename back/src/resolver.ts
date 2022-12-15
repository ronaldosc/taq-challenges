import { dataORM } from "./db/dbconfig";
import { InfractionSeverity, TimeTraveller, Violation } from "./db/entities";

interface getTravellerInfoInput {
    passport: number
}

interface CreateTimeTravellerInput {
    name: string;
    birth: string;
    passport: number;
}

interface RegistryViolationInput {
    passport: number;
    description: string;
    occurredAt: Date;
    severity: number;
}

interface ViolationType {
  id: string;
  timeTraveller: TimeTraveller;
  description: string;
  severity: number;
}

export const resolvers = {
  
    Query: { 
        getTravellerInfo: async (_header: never, body: { data: getTravellerInfoInput }) => {
            const getTraveller = await dataORM.getRepository(TimeTraveller).findOne({ where: { passport: body.data.passport } })
            if (!getTraveller) {
                throw new Error(`Usuário com o passaporte nº ${body.data.passport} não cadastrado.`)}
            return getTraveller
      },
          },

    Mutation: {
        createTimeTraveller: async (_header: never, body: { input: CreateTimeTravellerInput }) => {
          // acessando a table time_traveller
          const repository = dataORM.getRepository(TimeTraveller);

          // verifica se o traveller ja existe com o passport enviado
          const traveller = await repository.findOne({ where: { passport: body.input.passport }});

          if (traveller) {
            throw new Error(`Usuário com o passaporte nº ${body.input.passport} já possui cadastro.`);
          }

          // salva o traveller (cria a entidade) no banco, caso nao exista
          return repository.save({
            name: body.input.name,
            birth: body.input.birth,
            passport: body.input.passport
          });
        },

        registryViolation: async (_header: never, body: { input: RegistryViolationInput }): Promise<ViolationType> => {
          // acessar a table time_traveller
          const timeTravellerRepository = dataORM.getRepository(TimeTraveller);
          // acessar a table violation
          const violationRepository = dataORM.getRepository(Violation);
          // acessar a table infraction_severity
          const severityRepository = dataORM.getRepository(InfractionSeverity);

          // procurar o viajante que recebeu a infração
          const timeTraveller = await timeTravellerRepository.findOne({ where: { passport: body.input.passport }});

          if (!timeTraveller) {
            throw new Error(`Usuário com o passaporte nº ${body.input.passport} não existe.`);
          }

          const severity = await severityRepository.findOne({ where: { grade: body.input.severity }});

          if (!severity) {
            throw new Error(`Infração com gravidade nível ${body.input.severity} inexistente.`);
          }

          // regstrar uma violação na tavela violantion com uma relacao com o viajante em questao
          const violation = await violationRepository.save({
            description: body.input.description,
            occurred_at: new Date(body.input.occurredAt),
            time_traveller: { id: timeTraveller.id }, // poderia ser o objeto inteiro do timeTraveller
            severity, // poderia ser apenas do objet { id: severity.id }
          });

          // return de um objeto que concorde com o objeto de schema declarado
          return {
            description: violation.description,
            id: violation.id,
            timeTraveller,
            severity: severity.grade,
          };
        }
    }
}


// TODO query getTraveller