import { dataORM } from "./db/dbconfig";
import { InfractionSeverity, TimeTraveller, Violation } from "./db/entities";

interface GetTravellerInfoInputModel {
  passport: number
}
interface GetTravellerViolationsInputModel {
  passport: number
}
interface VerifyTimeTravelPossibilityInputModel {
    passport: number;
    travelDate: string;
}
interface CreateTimeTravellerInputModel {
  name: string;
  birth: string;
  passport: number;
}
interface RegistryViolationInputModel {
  passport: number;
  description: string;
  occurredAt: Date;
  severity: number;
}

interface ViolationModel {
  id: string;
  timeTraveller: TimeTraveller;
  description: string;
  severity: number;
}

export const resolvers = {
    Query: { 
        getTravellerInfo: async (_header: never, body: { data: GetTravellerInfoInputModel }) => {
            const getTraveller = await dataORM.getRepository(TimeTraveller).findOne({ where: { passport: body.data.passport } })
            if (!getTraveller) {
                throw new Error(`Usuário com o passaporte nº ${body.data.passport} não cadastrado.`)}
                return getTraveller;
            },
            getTravellerViolationsInfo: async (_header: never, body: { data: GetTravellerViolationsInputModel }): Promise<ViolationModel[]> => {
                const timeTraveller = await dataORM.getRepository(TimeTraveller).findOne({ where: { passport: body.data.passport } });
                
                if (!timeTraveller) {
                    throw new Error(`Usuário com o passaporte nº ${body.data.passport} já possui cadastro.`);
            }
            
            // retorna as violations com os campos/colunas `time_traveller` e `severity` populados
            const violations = await dataORM.getRepository(Violation).find({ where: { time_traveller: timeTraveller }, relations: ['time_traveller', 'severity'] });

            return violations.map((violation) => ({ ...violation, timeTraveller, severity: violation.severity.grade }));
        },
    },

    Mutation: {
        createTimeTraveller: async (_header: never, body: { input: CreateTimeTravellerInputModel }) => {
            // acessando a table time_traveller
            const repository = dataORM.getRepository(TimeTraveller);
            
            // verifica se o traveller ja existe com o passport enviado
            const traveller = await repository.findOne({ where: { passport: body.input.passport }});
            
            if (traveller) {
                throw new Error(`Usuário com o passaporte nº ${body.input.passport} já possui cadastro.`);
            }

            if (!new Date(body.input.birth)?.getTime()) {
                throw new Error(`A data de nascimento ${body.input.birth} não é válida.`)
                
            }
            
            // salva o traveller (cria a entidade) no banco, caso nao exista
            // "YYYY-MM-DDTHH:MM:SS:MMMZ"
            return repository.save({
                name: body.input.name,
                birth: new Date(body.input.birth).toJSON(),
                passport: body.input.passport
            });
        },
        
        registryViolation: async (_header: never, body: { input: RegistryViolationInputModel }): Promise<ViolationModel> => {
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
        },
        verifyTravelPossibility: async (_header: never, body: { input: VerifyTimeTravelPossibilityInputModel }) => {
            // new Date(body.input.travelDate) -> Invalid Date
            // new Date(body.input.travelDate).getTime() -> NaN (Not a Number)
            // !NaN = true
            if (!new Date(body.input.travelDate)?.getTime()) {
                throw new Error(`A data ${body.input.travelDate} não é valida'.`);
            }

            const timeTravellerRepository = dataORM.getRepository(TimeTraveller);
            const timeTraveller = await timeTravellerRepository.findOne({ where: { passport: body.input.passport }});
            if (!timeTraveller) {
                throw new Error(`Usuário com o passaporte nº ${body.input.passport} não existe.`);
            }
            if ((new Date(timeTraveller.birth)) > (new Date(body.input.travelDate))) {
                return {
                    message: "Não é possível viajar para antes da data de nascimento de um viajante.",possibility: false}
            }

            const violations = await dataORM.getRepository(Violation).find({ where: { time_traveller: timeTraveller }, relations: ['severity'] });
            const sumGrades = violations.reduce((acum, violation) => {
                if ((new Date(violation.occurred_at) < (new Date()))
                    && (new Date(violation.occurred_at).getTime() > (Date.now() - 3600*24*365*1000))) {return acum + violation.severity.grade}
                    else {return acum}
            }, 0);
            if (sumGrades > 12) {
                return {message: "Não é possível viajar tendo 12 pontos de infração acumulados nos últimos 12 meses.", possibility: false}
            };
            

            //sub(new Date(), { year: 2 } )   e add( )   // lib date-fns

            // verficar se ha infrações 1 ano antes ou depois da data enviada
            // startDate = travelDate - 1 year
            const startDate = new Date(new Date(body.input.travelDate).getTime() - 3600 * 24 * 365 * 1000);
            // endDate = travelDate + 1 year
            const endDate = new Date(new Date(body.input.travelDate).getTime() + 3600 * 24 * 365 * 1000);
            
            // startDate <= travelDate <= endDate
            /**
             * SELECT * FROM violation violation
             * WHERE violation.occurred_at >= "2021-12-19T13:41:00:000Z"
             * AND violation.occurred_at <= "2023-12-19T13:41:00:000Z"
             */
            const travelRangePossibility = await dataORM.getRepository(Violation)
                .createQueryBuilder("violation")
                .where("violation.occurred_at >= :startDate", { startDate })
                .andWhere("violation.occurred_at <= :endDate", { endDate })
                .getOne()

            if (travelRangePossibility) {
                return {message: "Não é possível viajar para a data pois há uma violação no periodo de 1 ano.", possibility: false} 
            }
            
            return { message: "É possível viajar para a data requerida.", possibility: true}
        }
    }
}

        // enum eSeverity {
        //     _,
        //     low = 3,
        //     medium,
        //     high,
        //     highest
        // }