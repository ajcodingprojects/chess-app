import React from "react";

const Button = ({ onClick, children, disabled }: { onClick: () => void, children: React.ReactNode, disabled: boolean }) => {
    return (
        <div className="flex justify-center m-8">
            <button disabled={disabled} onClick={onClick} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                {children}
            </button>
        </div>
    );
};
export default Button;