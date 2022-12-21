import { dataORM } from "../../db/dbconfig"
import { TimeTraveller } from "../../db/entities"

interface LoginInputModel {
  passport: number
  password: string
}

interface LoginResponseModel {
    token: string
    timeTraveller: TimeTraveller
}


const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const loginUseCase = async (
  _parent: never,
  body: { input: LoginInputModel }
): Promise<LoginResponseModel> => {
    const timeTraveller = await timeTravellerRepository.findOne({
        where: { passport: body.input.passport }, select: { id:true, name: true, birth: true, passport: true, password: true  }
      })
      if (!timeTraveller || timeTraveller.password !== body.input.password) {
        throw new Error(
          `Usuário sem credenciais válidas.`
        )
      }
      console.log(timeTraveller);
      
      const token = "mysecret"
      //TODO usar a lib jsonwebtoken pra criar o token com o ID e passaporte do TimeTrav no payload assinado por um secret que somente o servidor detém ... como retorno os dados no lugar do 'mysecret'

      return {
        token,
        timeTraveller
      }
}
