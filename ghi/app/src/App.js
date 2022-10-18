import React from "react";
import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import MainPage from "./MainPage";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendeeForm from "./AttendeeForm";
import PresentationForm from "./PresentationForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
	// a component is a function in React that return JSX
	//props has attendees property

	if (props.attendees === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			{/* <div className="container"> */}
			<Routes>
				<Route index element={<MainPage />} />
				<Route path="conferences">
					<Route path="new" element={<ConferenceForm />} />
				</Route>
				<Route path="attendees">
					<Route
						path=""
						element={<AttendeesList attendees={props.attendees} />}
					/>
					<Route path="new" element={<AttendeeForm />} />
				</Route>
				<Route path="locations">
					<Route path="new" element={<LocationForm />} />
				</Route>
				<Route path="presentations">
					<Route path="new" element={<PresentationForm />} />
				</Route>
			</Routes>

			{/* </div> */}
		</BrowserRouter>
	);
}

export default App;
