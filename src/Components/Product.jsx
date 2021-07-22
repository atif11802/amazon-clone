import React from "react";
import "../Styles/Product.css";
import { useSelector, useDispatch } from "react-redux";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Product = ({ title, image, price, rating, id }) => {
	const dispatch = useDispatch();
	return (
		<div className="product">
			<div className="product__info">
				<h3>{title}</h3>
				<h4>
					<strong>$</strong>
					{price}
				</h4>
			</div>
			<div className="product__rating">
				{Array(rating)
					.fill()
					.map((x, ind) => (
						<p key={ind}>⭐</p>
					))}
			</div>
			<img src={image} alt="" />
			<button
				onClick={() => {
					dispatch({
						type: "ADD_TO_BASKET",
						item: {
							title,
							image,
							price,
							id,
							qty: 1,
						},
					});
					NotificationManager.success(
						"Success full added to Cart",
						`${title}`,
						600
					);
				}}
			>
				Add to Cart
			</button>
			<NotificationContainer />
		</div>
	);
};

export default Product;
