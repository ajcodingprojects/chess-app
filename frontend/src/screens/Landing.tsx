import { useNavigate } from "react-router-dom";
import ChessBoard from "../assets/chess_board.png";
import Button from "../components/Button";

const Landing = () => {
    const nav = useNavigate();
    return (
        <div>
            <div className="mt-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={ChessBoard} className="max-w-96" />
                    </div>

                    <div className="pt-16">
                        <h1 className="text-4xl font-bold">Play Chess Online!</h1>
                        <div className="mt-4">
                            <Button onClick={() => nav('game')}>
                                Play Online
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;