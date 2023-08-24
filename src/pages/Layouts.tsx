import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthNavbar } from "../components/Navbars/navbars";
import { TokenProvider } from "../contexts/TokenContext";
import { useEffect, useRef, useState } from "react";
import { TokenType } from "../contexts/Context.types";
import { getToken } from "../utils/helpers/tokenkeeper";
import { LOGIN } from "../router/routes";
import { useVerifyTokenMutation } from "../apis/src/queryHooks";
import FullPageLoader from "../components/Loaders/Loaders";

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

  // to let animation complete
  const delayedCall = 2000;

  const { mutate: verifyStorageToken } = useVerifyTokenMutation({
    onSuccess: () => {
      token.current = storageProvidedToken || "";
      setTimeout(() => setLoading(false), delayedCall);
    },
    onError: () => {
      setTimeout(() => navigate(LOGIN.endpoint), delayedCall);
    },
  });

  const chechTokenFromStorage = () => {
    if (storageProvidedToken === null) {
      setTimeout(() => navigate(LOGIN.endpoint), delayedCall);
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
    return <FullPageLoader />;
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
