import { LoginForm } from "../../components/Forms";
import { getClassName } from "../../utils";
import styles from "./Login.module.css";

const Login: React.FC = () => {
    return <div className={getClassName(styles["container"])}>
        <LoginForm />
    </div>
}

export default Login;