import { Button } from "../../components/Buttons/buttons";
import { LoginForm } from "../../components/Forms";
import A from "../../components/Links/Links";
import { getClassName } from "../../utils";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <div className={getClassName(styles["container"])}>
      <LoginForm />
      <hr className="seperator" />
      <div className="footer">
        <A to={""} varient="secondary" underline="underline-none">
          Don't have an account?
        </A>
        <Button width="full" varient="secondary">
          Sign up for ARythm
        </Button>
      </div>
    </div>
  );
};

export default Login;
