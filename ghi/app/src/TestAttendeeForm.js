import { useEffect, useState } from "react";

const TestAttendeeForm = () => {
	const [name, setNames] = useState("");
	const [email, setEmails] = useState("");
	const [conferences, setConferences] = useState([]);
	const [selectedConference, setSelectedConference] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loaded, setLoaded] = useState(false);

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
		setLoaded(true);
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { name, email, selectedConference };
		data.conference = data.selectedConference;

		delete data.selectedConference;

		console.log(data);

		const attendeeUrl = "http://localhost:8001/api/attendees/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(attendeeUrl, fetchConfig);
		if (response.ok) {
			const newAttendee = await response.json();
			console.log(newAttendee);

			setNames("");
			setEmails("");
			setSelectedConference("");
			setSubmitted(true);
		}
	};

	return (
		<div className="row">
			<div className="col col-sm-auto">
				<img
					width="300"
					className="bg-white rounded shadow d-block mx-auto mb-4"
					src="/logo.svg"
				/>
			</div>
			<div className="col">
				<div className="card shadow">
					<div className="card-body">
						<div className="attendee-form">
							{!submitted && (
								<form id="create-attendee-form" onSubmit={handleSubmit}>
									<h1 className="card-title">It's Conference Time!</h1>
									<p className="mb-3">
										Please choose which conference you'd like to attend.
									</p>
									{!loaded && (
										<div
											className="d-flex justify-content-center mb-3"
											id="loading-conference-spinner">
											<div
												className="spinner-grow text-secondary"
												role="status">
												<span className="visually-hidden">Loading...</span>
											</div>
										</div>
									)}
									<div className="mb-3">
										<select
											onChange={(e) => setSelectedConference(e.target.value)}
											name="conference"
											id="conference"
											className="form-select"
											required>
											<option value="test">Choose a conference</option>

											{conferences.map((conference) => {
												return (
													<option key={conference.id} value={conference.href}>
														{conference.name}
													</option>
												);
											})}
										</select>
									</div>
									<p className="mb-3">Now, tell us about yourself.</p>
									<div className="row">
										<div className="col">
											<div className="form-floating mb-3">
												<input
													onChange={(e) => setNames(e.target.value)}
													required
													placeholder="Your full name"
													type="text"
													id="name"
													name="name"
													className="form-control"
												/>
												<label htmlFor="name">Your full name</label>
											</div>
										</div>
										<div className="col">
											<div className="form-floating mb-3">
												<input
													onChange={(e) => setEmails(e.target.value)}
													required
													placeholder="Your email address"
													type="email"
													id="email"
													name="email"
													className="form-control"
												/>
												<label htmlFor="email">Your email address</label>
											</div>
										</div>
									</div>
									<button className="btn btn-lg btn-primary">I'm going!</button>
								</form>
							)}
						</div>
						{submitted && (
							<div className="alert alert-success mb-0" id="success-message">
								Congratulations! You're all signed up!
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestAttendeeForm;
