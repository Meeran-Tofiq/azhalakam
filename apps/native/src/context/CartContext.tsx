import React, { createContext, useState, ReactNode, useMemo } from "react";

interface CartItem {
	image: any;
	name: string;
	price: number;
	quantity: number;
}

interface CartContextProps {
	cartItems: CartItem[];
	totalPrice: number;
	totalItemCount: number;
	addToCart: (item: CartItem) => void;
	increaseQuantity: (itemName: string) => void;
	decreaseQuantity: (itemName: string) => void;
	clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
	cartItems: [],
	totalPrice: 0,
	totalItemCount: 0,
	addToCart: () => {},
	increaseQuantity: () => {},
	decreaseQuantity: () => {},
	clearCart: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const totalItemCount = useMemo(
		() => cartItems.reduce((count, item) => count + item.quantity, 0),
		[cartItems]
	);

	const addToCart = (item: CartItem) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.name === item.name);
			if (existingItem) {
				return prevItems.map((i) =>
					i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
			return [...prevItems, { ...item, quantity: 1 }];
		});
		setTotalPrice((prevTotal) => prevTotal + item.price);
	};

	const increaseQuantity = (itemName: string) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
		const item = cartItems.find((item) => item.name === itemName);
		if (item) {
			setTotalPrice((prevTotal) => prevTotal + item.price);
		}
	};

	const decreaseQuantity = (itemName: string) => {
		setCartItems((prevItems) =>
			prevItems
				.map((item) =>
					item.name === itemName
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
		const item = cartItems.find((item) => item.name === itemName);
		if (item) {
			setTotalPrice((prevTotal) => prevTotal - item.price);
		}
	};

	const clearCart = () => {
		setCartItems([]);
		setTotalPrice(0);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				totalPrice,
				totalItemCount,
				addToCart,
				increaseQuantity,
				decreaseQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
