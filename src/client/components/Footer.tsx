import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-content bg-[#8CB387] text-white">
            <p className="w-full justify-content text-center font-extrabold">
                Quick Links
            </p>
            <div className="flex flex-row items-center justify-between w-full px-20">
                <p>Contact Us</p>
                <p>Privacy Policy</p>
                <p>Refund Policy</p>
                <p>Terms of Services</p>
                <p>Food Safety</p>
                <p>Wholesale</p>
            </div>
        </div>
    );
};

export default Footer;
  