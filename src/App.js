import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./Data/Context";
import Store from "./Data/Store";
import Routers from "./Routes";
import { SetAuthToken, SetDefaultHeaders } from "./Data/Config";
import { TOKEN } from "./Data/Actions/ActionTypes";
import DocumentMeta from "react-document-meta";
import { loadUser } from "./Data/Actions/AuthActions";

// Preloader
$(window).on("load", function () {
	$(".lds-ellipsis").fadeOut(); // will first fade out the loading animation
	$(".preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
	$("body").delay(333);
});
SetDefaultHeaders();

if (localStorage.getItem(TOKEN)) {
	SetAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
	// useEffect(() => {
	// 	const getInnerText = () => {
	// 		document
	// 			.getElementsByClassName("iconMeta")
	// 			.setAttribute("href", `${process.env.REACT_APP_IMAGE_URL}`);
	// 		// document
	// 		// 	.querySelector("#descriptionMeta")
	// 		// 	?.setAttribute(
	// 		// 		"content",
	// 		// 		`${process.env.REACT_APP_IMAGE_URL} is a website that provides you with easy access to data`
	// 		// 	);
	// 		// let text = `${process.env.REACT_APP_AGENT_NAME} website`;
	// 		// document.getElementById("titleMeta")?.innerText=text;
	// 	};
	// 	getInnerText();
	// }, []);

	useEffect(() => {
		let link = document.querySelector("link[rel~='icon']");
		let link2 = document.querySelector("link[rel~='apple-touch-icon']");
		// let title = document.querySelector("title");
		if (!link) {
			link = document.createElement("link");
			link.rel = "icon";
			document.getElementsByTagName("head")[0].appendChild(link);
		}
		if (!link2) {
			link2 = document.createElement("link");
			link2.rel = "apple-touch-icon";
			document.getElementsByTagName("head")[0].appendChild(link2);
		}
		link.href = process.env.REACT_APP_IMAGE_URL;
		link2.href = process.env.REACT_APP_IMAGE_URL;
	}, []);

	const meta = {
		title: `Cheap VTU Website in Nigeria | Buy Data, Airtime & Pay Bills – DataArena`,
		description: `Buy cheap data, airtime, pay electricity bills and subscribe to TV in Nigeria. Fast, secure and affordable VTU platform.`,
		meta: {
			charset: "utf-8",
			name: {
				keywords: "VTU Nigeria, cheap data Nigeria, buy airtime online, VTU website, bill payment Nigeria, data reseller Nigeria",
			},
		},
	};

	useEffect(() => {
		Store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={Store}>
			<DataProvider>
				<Router>
					<DocumentMeta {...meta} />
					<Routers />
				</Router>
			</DataProvider>
		</Provider>
	);
};

export default App;
