import { useFormik } from "formik";
import { FORGET_PASSWORD } from "../../../router/routes";
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

const LoginForm: React.FC = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
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
        />
        <Error className="error">
          {formik.touched.email ? formik.errors.email : ""}
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
          />
          <Label htmlFor={"rememberMe"} varient="secondary">
            Remember Me
          </Label>
        </div>
        <div className="submit-button-container">
          <Button
            width="full"
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
            loading={formik.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
