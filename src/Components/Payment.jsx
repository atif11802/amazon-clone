import React, { useEffect, useState } from "react";
import "../Styles/Payment.css";

import { useSelector } from "react-redux";
import { db } from "../firebase";
import CheckOutProduct from "./CheckOutProduct";
import { Link } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "axios"

const Payment = () => {
	const state = useSelector((state) => state);
	const [house, setHouse] = useState();
	const [road, setRoad] = useState();
	const [area, setArea] = useState();
	const [dist, setDist] = useState();
	const [location, setLoation] = useState([]);

	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState("");
	const [succeeded, setSucceeded] = useState("");
	const [disabled, setDisabled] = useState(true);
	const[clientSecret,setClientSecret]=useState(true)

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {

		const getClientSecret = async ()=>{
			const response = await axios(
				{
					method: "post",
					url:`/payments/create?Total=${getBasketTotal(total) * 100}`
				}
			)

		}
getClientSecret();
	},[state.reducerBasket.basket])

	// console.log(state.isLogged.user?.uid)

	location && location.map((x) => console.log(x));

	useEffect(() => {
		const cleanUp = db
			.collection("location")

			.onSnapshot((snapshot) =>
				setLoation(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return () => {
			cleanUp();
		};
	}, [state]);

	const total = state.reducerBasket.basket.reduce(
		(sum, item) => sum + item.qty * item.price,
		0
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

	};
	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	const update = (e) => {
		e.preventDefault();

		if (house && road && area && state.isLogged.user) {
			db.collection("location")
				.doc(state.isLogged.user.uid)
				.set({
					house: house,
					road: road,
					area: area,
					dist: dist,
					uui: state.isLogged.user.uid,
					email: state.isLogged.user.email,
				});

			// db.collection('location').add({
			setHouse("");
			setRoad("");
			setArea("");
			setDist("");

			// })
		}
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					CheckOut{" "}
					{
						<Link to="/checkout">
							{
								state
									.reducerBasket
									.basket
									?.length
							}{" "}
							items
						</Link>
					}
				</h1>
				<div className="payment__section">
					<div className="payment__wrapper">
						<div className="payment__details">
							<div className="payment__title">
								<h3>
									Delivery
									Address
								</h3>
							</div>
							<div className="payment__address">
								{location &&
									location.map(
										(
											x
										) => {
											if (
												x.id ===
												state
													.isLogged
													.user
													?.uid
											) {
												return (
													<div>
														<p>
															{
																x
																	.data
																	.email
															}
														</p>
														<p>
															{
																x
																	.data
																	.house
															}
														</p>
														<p>
															{
																x
																	.data
																	.road
															}
														</p>
														<p>
															{
																x
																	.data
																	.area
															}
														</p>
														<p>
															{
																x
																	.data
																	.dist
															}
														</p>
													</div>
												);
											}
										}
									)}
							</div>
						</div>

						<div className="payment__update">
							<h3>
								Update your
								location
							</h3>
							<form>
								<input
									value={
										house
									}
									onChange={(
										e
									) =>
										setHouse(
											e
												.target
												.value
										)
									}
									type="text"
									placeholder="house No"
								/>
								<input
									value={
										road
									}
									onChange={(
										e
									) =>
										setRoad(
											e
												.target
												.value
										)
									}
									type="text"
									placeholder="road"
								/>
								<input
									value={
										area
									}
									onChange={(
										e
									) =>
										setArea(
											e
												.target
												.value
										)
									}
									type="text"
									placeholder="area name"
								/>
								<input
									value={
										dist
									}
									onChange={(
										e
									) =>
										setDist(
											e
												.target
												.value
										)
									}
									type="text"
									placeholder="dist"
								/>
								<button
									onClick={
										update
									}
								>
									submit
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>
							Review Items and
							Delivery
						</h3>
					</div>
					<div className="payment__items">
						{/* products */}
						{state.reducerBasket?.basket.map(
							(item) => (
								<CheckOutProduct
									id={
										item.id
									}
									title={
										item.title
									}
									image={
										item.image
									}
									price={
										item.price
									}
									rating={
										item.rating
									}
								/>
							)
						)}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						{/* stripe */}
						<form onSubmit={handleSubmit}>
							<CardElement
								onChange={
									handleChange
								}
							/>
							<div className="payment__priceContainer">
								${total}
								<button
									disabled={
										processing ||
										disabled ||
										succeeded
									}
								>
									<span>
										{processing ? (
											<p>
												processing
											</p>
										) : (
											"buy now"
										)}
									</span>
								</button>
							</div>
							{error && (
								<div>
									{error}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
