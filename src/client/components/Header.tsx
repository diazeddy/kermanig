import { useState, useEffect } from "react";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

import './Header.css';

const Header = () => {
  const history = useNavigate();
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(cart)) {
      const totalQuantity = cart
        .map((item: any) => item?.quantity)
        .reduce((acc: number, curr: number) => acc + curr, 0);
      setCartQuantity(totalQuantity);
    }
  }, []);

  return (
    <div className="main">
        <div className="bg-[#8cb387] w-full text-white text-center">
            Free Shipping for California Residents for orders over $30
        </div>
        <div className="header">
            <div className="logger">
                <Link to="/">
                    <img src="https://www.kermanig.com/cdn/shop/files/logo-kermanig-crown.png?v=1613552001&width=240" />
                </Link>
            </div>
            <CiUser onClick={() => history("/admin")} size={40} />
            <div className="cart">
                <CiShoppingCart onClick={() => history("/cart")} size={40} />
                {cartQuantity > 0 && (
                    <div className="badge-container">
                        <div className="badge">{cartQuantity}</div>
                    </div>
                )}
            </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between px-20 text-[#A18642]">
            <a href="#">My Account</a>
            <a href="#">About us</a>
            <a href="#">Products</a>
            <a href="#">Readshow Email Sign up</a>
            <a href="#">Food Safety</a>
            <a href="#">Wholesale</a>
            <a href="#">Gifts</a>
        </div>
        <Outlet />
    </div>
  );
};

export default Header;
