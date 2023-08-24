import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthNavbar } from "../components/Navbars/navbars";
import { TokenProvider } from "../contexts/TokenContext";
import { useEffect, useRef, useState } from "react";
import { TokenType } from "../contexts/Context.types";
import { getToken } from "../utils/helpers/tokenkeeper";
import { LOGIN } from "../router/routes";
import { useVerifyTokenMutation } from "../apis/src/queryHooks";

export const AuthLayout = () => {
  return (
    <div className="layout">
      <AuthNavbar />
      <Outlet />
    </div>
  );
};

export const Layout = () => {
  const { state: locationProvidedToken } = useLocation();
  const storageProvidedToken = getToken();

  const [loading, setLoading] = useState(locationProvidedToken === null);

  const token = useRef<TokenType>(locationProvidedToken);

  const navigate = useNavigate();

  const { mutate: verifyStorageToken } = useVerifyTokenMutation({
    onSuccess: () => {
      token.current = storageProvidedToken || "";
      setLoading(false);
    },
    onError: () => {
      navigate(LOGIN.endpoint);
    },
  });

  const chechTokenFromStorage = () => {
    if (storageProvidedToken === null) {
      navigate(LOGIN.endpoint);
    } else {
      // api call to check token
      verifyStorageToken(storageProvidedToken);
    }
  };

  useEffect(() => {
    if (locationProvidedToken === null) {
      chechTokenFromStorage();
    }
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <TokenProvider currentToken={token.current}>
      <div>{token.current}</div>
      <div className="layout">
        <Outlet />
      </div>
    </TokenProvider>
  );
};
