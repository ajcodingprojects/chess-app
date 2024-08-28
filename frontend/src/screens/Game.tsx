import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from '../../../backend/src/messages';
import { useEffect, useState } from "react";
import { Chess } from 'chess.js';

const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    const [color, setColor] = useState<string | null>(null);
    const [canMove, setCanMove] = useState(false);
    const [hasWon, setHasWon] = useState<boolean | null>(null);

    useEffect(() => {
        if (!socket) return;
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setColor(message.payload.color);
                    setCanMove(message.payload.color === 'white');
                    break;
                case MOVE:
                    chess.move(message.payload);
                    setBoard(chess.board());
                    setCanMove(true);
                    break;
                case GAME_OVER:
                    setHasWon(!canMove);
                    setCanMove(false);
                    break;
            }
        }
    }, [chess, color, socket])

    if (!socket) return <div>Connecting...</div>;

    return (
        <div className="flex h-screen container-div">
            <div className="flex-1 flex justify-center items-center">
                <ChessBoard canMove={canMove} setCanMove={setCanMove} chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
            
            <div className="side-card p-6 rounded-md shadow-md bg-[#000F2F] text-white">
                <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase text-blue-300">Controls</span>
                </div>
                {!started ?
                    <Button onClick={() => {
                            socket.send(JSON.stringify({
                                type: INIT_GAME
                            }));
                            setStarted(true);
                    }}>
                        Find Match
                    </Button>
                    : 
                    <>
                        {
                            color !== null ? 
                                <>
                                    <h2 className="text-xl font-semibold tracking-wide turn">Your Color:</h2>
                                    <p className="color-m">{color === 'black' ? 'Black' : 'White'}</p>
                                    <br />
                                    <h2 className="text-xl font-semibold tracking-wide turn">Turn:</h2>
                                    <p className="color-m">{canMove ? color === 'black' ? 'Black' : 'White' : (color === 'white' ? 'Black' : 'White')}</p>
                                </>
                                :
                                <div className="flex w-full l-cont">
                                    <div className="loading flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-600"></div>
                                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-600"></div>
                                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-600"></div>
                                    </div>
                                    <p className="finding">Finding another player</p>
                                </div>
                        }
                    </>
                }
            </div>

        </div>
    );
}

export default Game;