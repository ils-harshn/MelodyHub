import { RouterProviderDecorator } from "../../Links/stories/decorators";
import LoginForm from "../LoginForm/LoginForm";
import { LoginFormWrapper } from "./decorators";

export default {
    title: "Components/Forms",
    component: LoginForm,
    decorators: [RouterProviderDecorator, LoginFormWrapper]
  };

export const UserLoginForm = () => <LoginForm />;
