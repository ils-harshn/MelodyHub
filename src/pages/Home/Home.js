import { useState } from "react";
import CardSongsCollections from "../../components/CardSongsCollections";
import EmptyHeader from "../../components/EmptyHeader";
import "./Home.scss";
import MainLoader from "../../components/MainLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 1000);

    return (<>
        {
            loading ? <MainLoader /> :
                <div className="home-page">
                    <EmptyHeader />
                    <div className="container">
                        <CardSongsCollections title={"Liked Songs"} />
                    </div>
                    <div className="container" >
                        <CardSongsCollections title={"Most Viewed Songs"} />
                    </div>
                </div>
        }
    </>
    )
}

export default Home;