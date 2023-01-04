type InputModel = {}; 
type ResponseModel = {
  a: string;
};

export class ExempleUseCase {
  async exec(input: InputModel): Promise<ResponseModel>  {
    // vem a antiga funcao (o q a funcao executa)

    return { a: '' };
  }
}

// typedi

class ExempleResolver  {
  login(data: InputModel): Promise<ResponseModel> {
    return new ExempleUseCase().exec(data);
  }
}