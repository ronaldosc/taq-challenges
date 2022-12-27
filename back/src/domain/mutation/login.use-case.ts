import { createToken, generatePasswordWithSalt } from "../../core/security";
import { dataORM } from "../../data/db/dbconfig";
import { TimeTraveller } from "../../data/db/entities";
require("dotenv").config()

/*
  Login:  
    Fluxo para criptografar:
  1. Recebe passaporte (identificador do usuário) e senha (valor plain text)
  2. Busca o usario a partir do identificador (passport)
  3. Verifica a senha comparando com a guardada no banco
    3.1 Valor da senha que está armazenada no db é um valor "hasheado" (criptografado)
    3.2 Encrypt do valor enviado no input para a senha
    3.3 Verifica se o valor gerado do encrypt é o mesmo do valor guardado no db
    3.4 Se for falso, jogamos um erro, caso contrario, seguimos para o passo seguinte
  4. Cria um token de autenticacao
  5. retorna o objeto do schema para a API de login (token, timeTraveller)


  para o mesmo input -> mesmo output
  USER / PASS / SALT / final hash
  user1 / 12345 / aj12s41d24h1ad512k5j5hasdkuasyd8a97 => ghjkl
  user2 / 12345 / 237461287974312t412 => vnmjg
  user3 = 12345 / 2174129ou4ijkaehfirqu4l => absdjtuasduy
  
  user1 = 12345 + aj12s41d24h1ad512k5j5hasdkuasyd8a97 + process.env.CRYPTO_SECRET => ghjkl
  user1 = 56789 + aj12s41d24h1ad512k5j5hasdkuasyd8a97 + process.env.CRYPTO_SECRET => ahsdjkjljuyygjqbe !== ghjkl => erro
*/

interface LoginInputModel {
  passport: number
  password: string
}
interface LoginResponseModel {
  token: string
  timeTraveller: TimeTraveller
  lastLoginAt?: string
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const loginUseCase = async (
  _parent: never,
  body: { input: LoginInputModel }
): Promise<LoginResponseModel> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: body.input.passport },
    select: {
      id: true,
      name: true,
      birth: true,
      passport: true,
      password: true,
      salt: true,
      last_login_at: true
    }
  });

  const salt = timeTraveller?.salt;
  const hashedPassword = generatePasswordWithSalt(body.input.password, salt ?? 'defaultSalt');

  if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
    throw new Error(`Credenciais de usuário inválidas.`);
  }

  const token = createToken({ timeTraveller });

  const updatedTimeTraveller = await timeTravellerRepository.save({...timeTraveller, last_login_at: new Date()});

  return {
    token,
    timeTraveller,
    lastLoginAt: (updatedTimeTraveller.last_login_at).toString()
  }
}
