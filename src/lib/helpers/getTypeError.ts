export const getErrorMessage = (codeStatus: number) => {
  let message = "Erro generico";
  switch (codeStatus) {
    case 400:
      message = "Error do cliente de solicitaçao";
      break;
    case 401:
      message = "Não authorizado! Cliente deve se autenticar";
      break;
    case 403:
      message = "Não authorizado! Cliente deve se autenticar";
      break;
    case 404:
      message = "Recurso buscado nao existe";
      break;

    default:
      message = "Server Error";
      break;
  }
  return message;
};
