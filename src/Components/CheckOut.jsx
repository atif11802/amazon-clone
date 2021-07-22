import React from "react";
import "../Styles/CheckOut.css";
import tea from "../Images/kettle-desaturated._CB445243794_.svg";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import CheckOutProduct from "./CheckOutProduct";
import FlipMove from "react-flip-move";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";

const CheckOut = () => {
	const state = useSelector((state) => state);

	const products = state.reducerBasket.basket;

	const total = state.reducerBasket.basket.reduce(
		(sum, item) => sum + item.qty * item.price,
		0
	);

	console.log(total, products.length);

	let history = useHistory();

	function handleClick() {
		history.push("/");
	}

	return (
		<div className="checkout">
			<div className="checkout__left">
				<h3>
					{state.isLogged.user &&
						"hello " +
							state.isLogged.user
								.email}
				</h3>
				
				{state.reducerBasket.basket.length > 0 ?
				
				(
					
					products.map((product)=> 
					(
						<CheckOutProduct
							key={product.id}
							title={product.title}
							image={product.image}
							price={product.price}
							id={product.id}
						/>
					))
					
				)
				 : (
					//    4.54 time

					<>
						<img src={tea} alt="" />
						<div className="checkout__empty">
							<h2>
								Your Cart is
								Empty
							</h2>
							<p
								onClick={
									handleClick
								}
							>
								Buy Some?
							</p>
						</div>
					</>
				)}
				
			</div>
			<div className="checkout__right">
				{products.length ? (
					<div className="checkout__subtotal">
						<h2>
							your total items is{" "}
							{products.length}
						</h2>
						<p>
							subtotal is total amount
							${total.toFixed()}
						</p>
						<button
							onClick={() => {
								if (
									state
										.isLogged
										.user
								) {
									history.push(
										"/payment"
									);
								} else {
									alert(
										"sign in to proceed"
									);
								}
							}}
						>
							Proceed TO CheckOut
						</button>
					</div>
				) : (
					""
				)}
			</div>
			<NotificationContainer />
		</div>
	);
};

export default CheckOut;
