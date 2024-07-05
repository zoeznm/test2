import { IdChecker } from "./auth/idChecker.js";
import { ValidationManager } from "./auth/loginValidation.js";
import { PwChecker } from "./auth/pwChecker.js";

window.onload = () => {
  const idValid = new IdChecker(new ValidationManager());
  idValid.check();

  const pwValid = new PwChecker(new ValidationManager());
  pwValid.check();
};

