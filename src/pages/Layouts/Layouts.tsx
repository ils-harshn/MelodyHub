import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthNavbar } from "../../components/Navbars/navbars";
import { TokenProvider } from "../../contexts/TokenContext";
import React, { useEffect, useRef, useState } from "react";
import { TokenType } from "../../contexts/Context.types";
import { getToken } from "../../utils/helpers/tokenkeeper";
import { LOGIN } from "../../router/routes";
import { useVerifyTokenMutation } from "../../apis/src/queryHooks";
import FullPageLoader from "../../components/Loaders/Loaders";

import styles from "./Layouts.module.css";
import { getClassName } from "../../utils";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { TRIOLOGY_ID } from "../../consts/ids";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bread, Cross } from "../../assests/icons";
import Header from "../../components/Header/Header";

export const AuthLayout: React.FC = () => {
  return (
    <div className="layout">
      <AuthNavbar />
      <Outlet />
    </div>
  );
};

const TrioLogicalDesign: React.FC = () => {
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={getClassName(styles["triologicaldesign-layout"])}
      id={TRIOLOGY_ID}
    >
      <div className="sidebar" ref={sidebarContainerRef}>
        <div
          className="sidebar-closer"
          onClick={() => {
            sidebarContainerRef.current?.classList.remove("open");
          }}
        >
          <Cross />
        </div>
        <Sidebar />
      </div>
      <div className="main">
        <div className="header">
          <div
            className="sidebar-opener"
            onClick={() => {
              sidebarContainerRef.current?.classList.add("open");
            }}
          >
            <Bread />
          </div>
          <Header />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
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
  const delayedCall = 3000;

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
      <TrioLogicalDesign />
    </TokenProvider>
  );
};
