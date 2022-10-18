import { useEffect, useState } from "react";

const PresentationForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [title, setTitle] = useState("");
	const [synopsis, setSynopsis] = useState("");
	const [conferences, setConferences] = useState([]);
	const [selectedConference, setSelectedConference] = useState("");
	// const [submitted, setSubmitted] = useState(false);
	// const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchConferences = async () => {
			const url = "http://localhost:8000/api/conferences/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setConferences(data.conferences);
			}
		};
		fetchConferences();
		// setLoaded(true);
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { name, email, company, title, synopsis, selectedConference };
		data.conference = data.selectedConference;
		data.company_name = data.company;
		data.presenter_name = data.name;
		data.presenter_email = data.email;

		delete data.selectedConference;
		delete data.company;
		delete data.name;
		delete data.email;

		console.log(data);

		const selectTag = document.getElementById("conference");
		const conferenceId = selectTag.options[selectTag.selectedIndex].value;

		const locationUrl = `http://localhost:8000${conferenceId}presentations/`;
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
			const newAttendee = await response.json();
			console.log(newAttendee);
			event.target.reset();
			setName("");
			setEmail("");
			setCompany("");
			setTitle("");
			setSynopsis("");
			setSelectedConference("");
			// setSubmitted(true);
		}
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new presentation</h1>
					<form id="create-presentation-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setName(e.target.value)}
								placeholder="Presenter name"
								required
								type="text"
								name="presenter_name"
								id="presenter_name"
								className="form-control"
							/>
							<label htmlFor="presenter_name">Presenter name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Presenter email"
								required
								type="email"
								name="presenter_email"
								id="presenter_email"
								className="form-control"
							/>
							<label htmlFor="presenter_email">Presenter email</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setCompany(e.target.value)}
								placeholder="Company name"
								type="text"
								name="company_name"
								id="company_name"
								className="form-control"
							/>
							<label htmlFor="company_name">Company name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Title"
								required
								type="text"
								name="title"
								id="title"
								className="form-control"
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<label htmlFor="synopsis">Synopsis</label>
							<textarea
								onChange={(e) => setSynopsis(e.target.value)}
								id="synopsis"
								rows="3"
								name="synopsis"
								className="form-control"></textarea>
						</div>
						<div className="mb-3">
							<select
								onChange={(e) => setSelectedConference(e.target.value)}
								required
								name="conference"
								id="conference"
								className="form-select">
								<option value="">Choose a conference</option>
								{conferences.map((conference) => {
									return (
										<option key={conference.id} value={conference.href}>
											{conference.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default PresentationForm;
