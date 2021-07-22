import React from "react";
import "../Styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import {auth } from "../firebase"


const Header = () => {

	const state = useSelector(state => state)

	

	const handleAuthentication = ()=>{
		if(state.isLogged.user){
			auth.signOut()
			.then(() => {
				// Sign-out successful.
			  }).catch((error) => {
				// An error happened.
			  });
			  
		}
	}

	return (
		<div className="header">
			<div className="header__left">
				<Link to="/">
					<img
						className="header__logo"
						src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
						alt="amazon-logo"
					/>
				</Link>
				<div className="header__deliver">
					<span>Deliver To</span>
					<span>Bangladesh</span>
				</div>
			</div>
			<div className="header__middle">
				<button>ALL</button>
				<input type="text" />
				<SearchIcon className="header__search" />
			</div>
			<div className="header__right">
				<div className="header__option">
					<img
						className="header__logo"
						src="https://image.flaticon.com/icons/png/512/330/330459.png"
						alt=""
					/>
				</div>
				<Link to={!state.isLogged.user && "/login"}>
				<div onClick={handleAuthentication} className="header__option">
					<span>Hello,{
						state.isLogged.user? state.isLogged.user.email : "Guest"
						
						}</span>
					<span>{state.isLogged.user? "Logout":"sign in"} </span>
				</div>
				</Link>
				
				<div className="header__option">
					<span>Returns</span>
					<span>& Orders</span>
				</div>
				<Link to="/checkout">
					<div className="header__price">
						<div className="header__cart">
							<ShoppingCartIcon />
						</div>
						<span>{state.reducerBasket.basket.length}</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
