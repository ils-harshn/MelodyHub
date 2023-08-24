import { useFormik } from "formik";
import INDEX, { FORGET_PASSWORD } from "../../../router/routes";
import { getClassName } from "../../../utils";
import { Button } from "../../Buttons/buttons";
import Error from "../../Error/Error";
import { CheckBox, PasswordInput, TextInput } from "../../Inputs/Inputs";
import Label from "../../Label/Label";
import A from "../../Links/Links";
import styles from "./LoginForm.module.css";
import validationSchema, {
  initialValues,
} from "../../../formSchemas/loginFormSchema";
import { useLoginMutation } from "../../../apis/src/queryHooks";
import { LoginResponseType } from "../../../apis/src/response.types";
import { removeToken, setToken } from "../../../utils/helpers/tokenkeeper";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError } = useLoginMutation({
    onSuccess: (data: LoginResponseType) => {
      removeToken();
      setToken(data.token, formik.values.rememberMe);
      navigate(INDEX.endpoint);
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldTouched(name, true); // Remember to mark the toched field first
    formik.setFieldValue(name, value);
  };

  return (
    <form
      className={getClassName(styles["form"])}
      onSubmit={formik.handleSubmit}
    >
      <div className="form-group">
        <Label>Email address or username</Label>
        <TextInput
          placeholder="Email address or username"
          width="full"
          name="email"
          onChange={handleTextChange}
          value={formik.values.email}
          disabled={isLoading}
        />
        <Error className="error">
          {isError
            ? "Email or password is wrong!"
            : formik.touched.email
            ? formik.errors.email
            : ""}
        </Error>
      </div>
      <div className="form-group">
        <Label>Password</Label>
        <PasswordInput
          placeholder="Password"
          width="full"
          name="password"
          onChange={handleTextChange}
          value={formik.values.password}
          disabled={isLoading}
        />
        <Error className="error">
          {formik.touched.password ? formik.errors.password : ""}
        </Error>
      </div>
      <A to={FORGET_PASSWORD.endpoint}>Forgot your password?</A>
      <div className="form-activator">
        <div className="remember-me-container">
          <CheckBox
            name="rememberMe"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
            disabled={isLoading}
          />
          <Label htmlFor={"rememberMe"} varient="secondary">
            Remember Me
          </Label>
        </div>
        <div className="submit-button-container">
          <Button
            type="submit"
            width="full"
            disabled={!formik.dirty || !formik.isValid || isLoading}
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
