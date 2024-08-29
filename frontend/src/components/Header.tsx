import bKing from '../assets/bk.png';

export const Header = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-gray-700 text-white p-2 shadow-md z-50">
                <div className="container mx-auto flex">
                    <img className="m-1 header-size" src={ bKing }></img>
                    <span className="text-lg font-semibold center-content">
                    ChessOnTheGo
                    </span>
                </div>
            </div>
    )
}