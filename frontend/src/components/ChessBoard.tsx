import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../shared/types";
import bk from '../assets/bk.png';
import bp from '../assets/bp.png';
import bq from '../assets/bq.png';
import bb from '../assets/bb.png';
import br from '../assets/br.png';
import bn from '../assets/bn.png';
import wk from '../assets/wk.png';
import wp from '../assets/wp.png';
import wq from '../assets/wq.png';
import wb from '../assets/wb.png';
import wr from '../assets/wr.png';
import wn from '../assets/wn.png';

const ChessBoard = ({ canMove, chess, board, setBoard, setCanMove, socket }: { canMove: boolean, chess: Chess, board: ({square: Square, type: PieceSymbol, color: Color} | null)[][], setBoard: any, setCanMove: any, socket: WebSocket}) => {
    const [from, setFrom] = useState<Square | null>(null);

    const image_mapping = new Map<string, any>([
        ['bk', bk],
        ['bp', bp],
        ['bb', bb],
        ['bq', bq],
        ['br', br],
        ['bn', bn],
        ['wk', wk],
        ['wp', wp],
        ['wb', wb],
        ['wq', wq],
        ['wr', wr],
        ['wn', wn],
    ]);
    
    return (
        <div className="w-full max-w-[50vw] grid place-items-center real-width">
            <div className="relative w-full pb-[100%]">
                <div className="absolute inset-0 grid grid-cols-8 gap-1">
                    {board.map((row, i) => (
                        row.map((square, j) => (
                            <div 
                                onClick={() => {
                                    if (canMove) {
                                        const representation = (String.fromCharCode(65 + j) + (8 - i)).toLowerCase();
                                        if (!from) {
                                            setFrom(square?.square ? square.square : null);
                                        } else {
                                            socket.send(JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    move: {
                                                        from,
                                                        to: representation
                                                    }
                                                }
                                            }));
                                            setFrom(null);
                                            chess.move({
                                                from,
                                                to: representation
                                            });
                                            setBoard(chess.board());
                                            setCanMove(false);
                                        }
                                    }
                                }}
                                key={`${i}${j}`}
                                className={`${(i + j) % 2 === 0 ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}
                                style={{ aspectRatio: '1/1' }} // ensures each square is a perfect square
                            >
                                {square ? <img src={image_mapping.get(`${square?.color === 'b' ? `b${square.type}` : `w${square.type}`}`)}></img> : null}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChessBoard;
