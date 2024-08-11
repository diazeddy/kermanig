import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf"

type CartItem = {
    title: string;
    description: string;
    quantity: number;
    image: string;
};

const CartPage = () => {
    const reportTemplateRef = useRef<HTMLDivElement | null>(null);
    const [cartData, setCartData] = useState<Record<string, CartItem>>({});
    useEffect(() => {
        fetchCartDataFromStorage();
    }, []);

    const fetchCartDataFromStorage = () => {
        const cartStorage: CartItem[] = JSON.parse(localStorage.getItem("cart") || "{}");
        const newCartData: Record<string, CartItem> = {};
        cartStorage?.forEach((cartItem) => {
            if (newCartData[cartItem.title]) {
                newCartData[cartItem.title].quantity += cartItem.quantity;
            } else {
                newCartData[cartItem.title] = cartItem;
            }
        });
        setCartData(newCartData);
    };

    const onRemoveCartItem = (title: string) => {
        const existingCartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "{}");
        const newCartItems = existingCartItems.filter(
            (cartItem) => cartItem.title !== title
        );
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        fetchCartDataFromStorage();
    };

    const onCheckOut = async () => {
        const doc = new jsPDF({
            format: 'a0',
            unit: 'px',
        });

        doc.setFont('Inter-Regular', 'small');

        const reportTemplate = reportTemplateRef.current;
            if (reportTemplate) {
                doc.html(reportTemplate, {
                    async callback(doc) {
                        await doc.save('document');
                    },
                });
            } else {
                console.error("Report template is not available.");
            }
    };

    return (
        <>
            <div className="flex flex-col w-full items-center justify-between p-4 space-y-4">
                {!Object.keys(cartData).length ? (
                    <p className="text-center text-gray-500">No cart items available!</p>
                ) : (
                <div ref={reportTemplateRef} className="w-full space-y-4">
                    {Object.keys(cartData).map((title) => {
                        const cartItem = cartData[title];
                        return (
                            <div key={title} className="flex flex-row w-full items-center border-b pb-4">
                                <img src={cartItem.image} className="w-24 h-24 object-cover mr-4 rounded" />
                                <div className="flex flex-col flex-grow">
                                    <p className="font-bold text-lg">{title}</p>
                                    <p className="text-gray-600">{cartItem.description}</p>
                                    <p className="text-sm text-gray-500">Quantity: {cartItem.quantity}</p>
                                </div>
                                <button 
                                    onClick={() => onRemoveCartItem(title)} 
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                    <button 
                        onClick={() => onCheckOut()} 
                        className="bg-green-500 text-white float-right p-4 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Check out
                    </button>
                </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
