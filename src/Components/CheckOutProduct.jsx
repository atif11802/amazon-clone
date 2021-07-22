import React from "react";
import "../Styles/CheckOutProduct.css";

import { useSelector, useDispatch } from "react-redux";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const CheckOutProduct = ({ title, id, price, image }) => {
	const dispatch = useDispatch();

	const state = useSelector((state) => state);

	const onRemove = (id) => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
		NotificationManager.error(
			`${title}`,
			"Removed From Cart",
			700
		);
	};

	return (
		<div className="checkoutproduct">
			<img src={image} alt={title} />
			<h4>{title}</h4>
			<h4>
				$ <span>{price}</span>
			</h4>
			<button onClick={() => onRemove(id)}>
				remove from cart
			</button>
		</div>
	);
};

export default CheckOutProduct;
