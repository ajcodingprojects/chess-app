import { useNavigate } from "react-router-dom";
import ChessBoard from "../assets/chess_board.png";
import Button from "../components/Button";
import { useState } from "react";
import { Header } from "../components/Header";

const Landing = () => {
    const [name, setName] = useState('');

    const nav = useNavigate();
    return (
        <div>
            <Header />
            <div className="mt-2 height-full">
                <div className="center-content grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={ChessBoard} className="max-w-96" />
                    </div>

                    <div className="pt-16">
                        <h1 className="text-4xl font-bold justify-center align-center">
                            Play Chess Online!
                        </h1>
                        <p className="finding my-1">Developed by: Andrew Nerud</p>
                        <div className="mt-4 play-online-btn">
                            <div>
                                <label htmlFor="lastname" className="text-sm sr-only">Email address</label>
                                <input onChange={(event) => setName(event.target.value) } id="lastname" type="text" placeholder="Enter your name" className="p-2 my-3 w-full rounded-md focus:ring focus:dark:ring-blue-600 dark:border-gray-300" />
                            </div>
                            {
                                name == null || name == '' ?
                                    <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden dark:bg-gray-50 dark:border-blue-600 absolute left-1/2 transform -translate-x-1/2 bottom-0 special-width">
                                        <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full dark:bg-blue-600 dark:text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <div className="flex-1 p-2">
                                            <p className="text-sm dark:text-gray-800">You must enter a name to begin playing</p>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            <Button disabled={name == null || name == ''} onClick={() => { sessionStorage.setItem('playerName', name); nav('game') }}>
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