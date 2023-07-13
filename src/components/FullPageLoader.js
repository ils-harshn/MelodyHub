import Logo from "../assets/logo.png"
import "../styles/FullPageLoader.scss"

const FullPageLoader = () => (
    <div className="full-page-loader">
        <div className="loader">
            <img src={Logo} alt="image"/>
        </div>
    </div>);

export default FullPageLoader;