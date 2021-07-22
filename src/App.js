import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckOut from "./Components/CheckOut";
import Login from "./Components/Login";
import { auth } from "./firebase.js";

import { useDispatch } from "react-redux";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51JF0fXHhxC62XHhcmgT7LBtjpLFLyI5xw4suXJ2mR8UlKBcKUeYztW5eMihcpiAOxHMql6duDcMVj0s2qFuLC3NO00TTQaCyFn"
);

function App() {
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SUCCESS",
					payload: authUser,
				});
				setUser(authUser);
			} else {
				dispatch({ type: "FAILURE", payload: null });
				setUser(null);
			}
		});
		return () => {
			//perform clean action;
			unsubscribe();
		};
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route exact path="/">
						<Header />
						<Home />
					</Route>
					<Route exact path="/checkout">
						<Header />
						<CheckOut />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/payment">
						<Header />
						<Elements stripe={promise}>
						<Payment />
						</Elements>
						
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
