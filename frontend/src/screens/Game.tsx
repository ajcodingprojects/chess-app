import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from '../shared/types';
import { useEffect, useState } from "react";
import { Chess } from 'chess.js';
import board_img from '../assets/chess_board.png';
import { Header } from "../components/Header";

const Game = () => {
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    const [color, setColor] = useState<string | null>(null);
    const [canMove, setCanMove] = useState(false);
    const [hasWon, setHasWon] = useState<boolean | null>(null);
    const [player, setPlayer] = useState('');

    useEffect(() => {
        if (player === '') {
            setPlayer(sessionStorage.getItem('playerName') ?? 'Unknown User');
        }
    }, [player]);

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
                    setHasWon(color === message.payload.winner);
                    setCanMove(false);
                    break;
            }
        }
    }, [canMove, chess, color, socket])

    if (!socket) return <div><h2>Connecting...</h2><br/><p>Please refresh the page if this message lasts for more than a few seconds</p></div>;

    return (
        <div className="flex h-screen container-div before-board">
            <Header />

            <div className="flex-1 flex justify-center items-center flex-column-b margin-sm">
                <ChessBoard canMove={canMove} setCanMove={setCanMove} chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
            
            <div className="side-card p-6 rounded-md shadow-md bg-[#000F2F] text-white">
                <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase text-blue-300">Game Info</span>
                </div>
                <div>
                    <h2>Welcome, { player }!</h2>
                </div>
                {!started ?
                    <Button disabled={false} onClick={() => {
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
                                <div className="fl-row">
                                    <div className="right-m">
                                        <h2 className="text-xl font-semibold tracking-wide turn">Your Color:</h2>
                                        <p className="color-m">{color === 'black' ? 'Black' : 'White'}</p>
                                    </div>
                                    <br />
                                    <div> 
                                        <h2 className="text-xl font-semibold tracking-wide turn">Turn:</h2>
                                        <p className="color-m">{canMove ? color === 'black' ? 'Black' : 'White' : (color === 'white' ? 'Black' : 'White')}</p>
                                    </div>
                                </div>
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
            
            {
                hasWon != null ?
                    <>
                        <div className="loading-overlay">
                            <div className="middle-div">
                                <div className="flex justify-center">
                                    <img src={board_img} className="max-w-96" />
                                </div>

                                <div className="pt-16">
                                    <h1 className="text-4xl font-bold">
                                        {hasWon ? "You Won!" : "You Lost"}
                                    </h1>
                                    <Button disabled={false} onClick={() => {
                                            sessionStorage.setItem('playerName', player)
                                            window.location.reload();
                                    }}>
                                        Play Again
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    ""
            }
        </div>
    );
}

export default Game;