import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthNavbar } from "../../components/Navbars/navbars";
import React, { useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/helpers/tokenkeeper";
import { LOGIN } from "../../router/routes";
import { useVerifyTokenMutation } from "../../apis/src/queryHooks";
import FullPageLoader from "../../components/Loaders/Loaders";

import styles from "./Layouts.module.css";
import { getClassName } from "../../utils";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import {
  TRIOLOGY_ID,
  SIDEBAR_CONTAINER_ID,
  SIDEBAR_OPENER_ID,
} from "../../consts/ids";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bread, Cross } from "../../assests/icons";
import Header from "../../components/Header/Header";
import { PlaylistComponentProvider } from "../../hooks/PlaylistComponentHooks";
import { PlaylistShower } from "../../components/PlaylistFetcher/PlaylistFetcher";
import { useToken, useTokenDispatch } from "../../hooks/TokenHooks";
import { LoginResponseType } from "../../apis/src/response.types";

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
      <div
        className="sidebar"
        ref={sidebarContainerRef}
        id={SIDEBAR_CONTAINER_ID}
      >
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
            <Bread id={SIDEBAR_OPENER_ID} />
          </div>
          <Header />
        </div>
        <div className="outlet primary-scroll-bar">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

type AuthWrapperType = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperType> = ({ children }) => {
  const { token } = useToken();
  if (token === "") return <Navigate to={LOGIN.endpoint} />;
  return <>{children}</>;
};

export const Layout = () => {
  const dispatchTokenData = useTokenDispatch();
  const { token } = useToken();
  const storageProvidedToken = getToken();

  const [loading, setLoading] = useState(token === "");

  const navigate = useNavigate();

  // to let animation complete
  const delayedCall = 3000;

  const { mutate: verifyStorageToken } = useVerifyTokenMutation({
    onSuccess: (data: LoginResponseType) => {
      dispatchTokenData({
        type: "SET_ACTION",
        payload: {
          ...data,
          token: storageProvidedToken || "",
        },
      });
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
    if (token === "") {
      chechTokenFromStorage();
    }
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <AuthWrapper>
      <PlaylistComponentProvider>
        <PlaylistShower />
        <TrioLogicalDesign />
      </PlaylistComponentProvider>
    </AuthWrapper>
  );
};
