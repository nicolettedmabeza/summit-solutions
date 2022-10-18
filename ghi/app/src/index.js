import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
// first time App gets called, we're not passing any properties because we don't have the data yet

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

async function loadAttendees() {
	const response = await fetch("http://localhost:8001/api/attendees/");

	if (response.ok) {
		const data = await response.json();

		root.render(
			<React.StrictMode>
				<App attendees={data.attendees} />
			</React.StrictMode>
		);
	} else {
		console.error(response);
	}
}
loadAttendees();

//getting data to pass into App component

// sets the variable named attendees to the value inside curly braces
// variable becomes a property on the props parameter that gets passed into function
