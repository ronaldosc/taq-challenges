import { dataORM } from "./db/dbconfig"
import { TimeTraveller } from "./db/entities"

// enum ViolationSeverity {
//     low = 3,
//     medium = 5,
//     HIGH = 7,
//     HIGHEST = 12
//     }

interface getTravellerInfoInput {
    passport: number
}

interface CreateTimeTravellerInput {
    name: string
    birth: string
    passport: number
}


// interface InsertViolation {
//     passport: number
//     description: string
//     occurred_at: string // | Date
//     time_traveller: TimeTraveller
//     severity: number // ViolationSeverity   // InfractionSeverity
// }

//  console.log(body.data, (body as any).input);
export const resolvers = {
    // hello: () => 'Hey woorld !',  _limit: -1)
    Query: { 
        getTravellerInfo: async (_header: never, body: { data: getTravellerInfoInput }) => {
            return dataORM.getRepository(TimeTraveller).findOne({ where: { passport: body.data.passport } })
          
            // if (responseGet) {
            //   // ja existe esse ussuario no banco
            //   // retornar o usuario
            // }
            
            // joga o not found erro
    
    
    //         if (time_traveller[passport]) {
    //             throw new Error('no message exists with id ' + id);
    //           }
    //           return new Message(id, fakeDatabase[id]);
    //     }
    //     usuario(_, args) {
    //   return db.usuarios.find((db) => db.id === args.id);
    // },
    // usuarios: () => db.usuarios,

    // console.log(responseGet);
      },
    },

    Mutation: {
        createTimeTraveller: async (_header: never, body: { input: CreateTimeTravellerInput }) => {
          const repository = dataORM.getRepository(TimeTraveller);

          const traveller = await repository.findOne({  where: { passport: body.input.passport }});

          if (traveller) {
            const error = new Error(`Usuário com o passaporte ${body.input.passport} já exite.`);
            (error as any).code = 401;

            throw error;
          }

          const responseTraveller = await repository.save({
                name: body.input.name,
                birth: body.input.birth,
                passport: body.input.passport
          });
          console.log(responseTraveller);
          
          return responseTraveller
        }
        // insertViolation:  (_header: never, body: { input: InsertViolation }) => {
        //     const responseViolation = dataORM.getRepository(Violation).insert(
        //         {
        //             passport: body.input.passport,
        //             description: body.input.description,
        //             occurred_at: body.input.occurred_at,
        //             time_traveller: body.input.time_traveller,
        //             // severity: body.input.severity
        //         }
        //     )
        //     console.log(responseViolation)
        //     return responseViolation
        // }

    }
}

// TODO string ""  nao deve entrar no banco
// TODO nome e/ou passaporte duplicado
// TODO checagem de todas as inputs, validadas
// TODO data de nascimento nao pode ser futura, formato DD/MM/AAAA ou separador com caractere -










//benawad
/*
import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}


type {
  Query: {
    me () {}
  }
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = result[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
*/