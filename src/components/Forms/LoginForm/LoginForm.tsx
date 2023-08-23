import { FORGET_PASSWORD } from "../../../router/routes";
import { getClassName } from "../../../utils";
import { Button } from "../../Buttons/buttons";
import Error from "../../Error/Error";
import { CheckBox, PasswordInput, TextInput } from "../../Inputs/Inputs";
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
      <div className="form-activator">
        <div className="remember-me-container">
          <CheckBox name="remember-me" />
          <Label htmlFor={"remember-me"} varient="secondary">
            Remember Me
          </Label>
        </div>
        <div className="submit-button-container">
          <Button width="full">Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
