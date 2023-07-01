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
    },
    imgs: {
        logo: `${process.env.PUBLIC_URL}/assets/icons/logo_white.ico`,
    }
}

export default darktheme
// export default lighttheme