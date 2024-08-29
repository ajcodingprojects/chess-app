import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

const Loading = () => {
    const nav = useNavigate();
    function sleep(ms: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {
        if (sessionStorage.getItem('playerName') != null) {
            sleep(1500).then(() => {
                nav('chess/game');
            });
        } else {
            nav('chess');
        }
    }, [nav]);

    return (
        <div className="height-full w-[100vw] loading-section inline-center center-content flex">
            <Header />
            <div className="align-center justify-center">
                <div className="spinner">
                    <div className="spinnerin"></div>
                </div>
            </div>
            <div className="my-[20px]">
                    Loading Data...
            </div>
        </div>
    );
};

export default Loading;