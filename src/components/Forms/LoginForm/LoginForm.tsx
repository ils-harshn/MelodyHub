import { FORGET_PASSWORD } from "../../../router/routes";
import { getClassName } from "../../../utils";
import Error from "../../Error/Error";
import { PasswordInput, TextInput } from "../../Inputs/Inputs";
import Label from "../../Label/Label";
import A from "../../Links/Links";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  return (
    <form className={getClassName(styles["form"])}>
      <div className="form-group">
        <Label>Email address or username</Label>
        <TextInput placeholder="Email address or username" width="full" />
        <Error className="error">*Required</Error>
      </div>
      <div className="form-group">
        <Label>Password</Label>
        <PasswordInput placeholder="Password" width="full" />
        <Error className="error">*Required</Error>
      </div>
      <A to={FORGET_PASSWORD.endpoint}>Forgot your password?</A>
    </form>
  );
};

export default LoginForm;
