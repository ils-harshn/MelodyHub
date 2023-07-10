const lighttheme = {
    colors: {
        bodyBackground: "white",
        bodyColor: "black",
        navbarBackground: "white",
        navbarBorderBottom: "#949494",
        inputBorder: "#878787",
        inputBackground: "white",
        inputColor: "black",
        buttonPrimaryBackground: "#1ed760",
        buttonPrimaryBackgroundDisabled: "#00ba42",
        LinkColor: "blue",
        LinkHoverColor: "#004cff",
        LinkVisitedColor: "purple",
        themeChangerBackground: "#ededed",
        onHoverColor: "white",
        onHoverBackground: "black",
        dropDownBackground: "#ededed",
        inputFileBackground: "white",
        inputFileBorder: "#999",
        inputFileBorderHover: "black",
        buttonDangerBackground: "#ff0011",
        buttonDangerBackgroundDisabled: "#ed5249",
        selectorBackground: "#c4c4c4",
        selectorHoverBackground: "black",
        selectorHoverColor: "white",
    },
    shadows: {
        background: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    },
    imgs: {
        logo: `${process.env.PUBLIC_URL}/assets/icons/logo.ico`,
    }
}

export const darktheme = {
    colors: {
        bodyBackground: "#171717",
        bodyColor: "white",
        navbarBackground: "#171717",
        navbarBorderBottom: "white",
        inputBorder: "#737373",
        inputBackground: "#171717",
        inputColor: "white",
        buttonPrimaryBackground: "#1ed760",
        buttonPrimaryBackgroundDisabled: "#00ba42",
        LinkColor: "#00e1ff",
        LinkHoverColor: "#2f9aa8",
        LinkVisitedColor: "#00ffae",
        themeChangerBackground: "#000000",
        onHoverColor: "black",
        onHoverBackground: "white",
        dropDownBackground: "#171717",
        inputFileBackground: "black",
        inputFileBorder: "#404040",
        inputFileBorderHover: "white",
        buttonDangerBackground: "#c91d12",
        buttonDangerBackgroundDisabled: "#ed5249",
        selectorBackground: "#424242",
        selectorHoverBackground: "white",
        selectorHoverColor: "black",
    },
    shadows: {
        background: "rgba(255, 255, 255, 0.16) 0px 10px 36px 0px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px",
    },
    imgs: {
        logo: `${process.env.PUBLIC_URL}/assets/icons/logo_white.ico`,
    }
}

export default lighttheme