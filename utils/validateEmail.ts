const validateEmail = (emailAdress: string) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(emailAdress);
};

export default validateEmail;
