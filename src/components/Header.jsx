import React from "react";
const Header = () => {
  return (
      <div
      className="text-white py-7 px-4 text-center shadow-md"
      style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
    >
      <h1 className="text-3xl font-bold tracking-tight">
         Money Collection System
      </h1>
      <p className="text-sm mt-2 opacity-80">
        Target per member: <strong>130,000/=</strong>
      </p>   
    </div>
  );
};
export default Header;