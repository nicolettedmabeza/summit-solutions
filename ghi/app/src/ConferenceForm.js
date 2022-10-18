import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations:[] }



        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name:value})
    }

    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({starts:value})
    }

    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ends:value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description:value})
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({maxPresentations:value})
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maxAttendees:value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location:value})
    }




    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        //copy properties and values from this.state into a new object
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees
        //creating a new key named 'room_count' and setting it to the value of 'roomCount'
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;
        //Then, we're deleting the keys 'roomCount' and 'states' because I'm guessing we don't want to send that data to the server.
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }};

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);

          const cleared = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            location: '',
          }
          this.setState(cleared)
        }
      }



    async componentDidMount() {

        const url = "http://localhost:8000/api/locations/"
        const response = await fetch(url);

    if (response.ok) {

        const data = await response.json();

        this.setState({locations:data.locations})


        //if you want to use a method in the className as an event handler, you have to do that 'bind' thing in the constructor."

        }
    }
render () {
        return (
            <div className="row">
					<div className="offset-3 col-6">
						<div className="shadow p-4 mt-4">
							<h1>Create a new conference</h1>
							<form id="create-conference-form" onSubmit={this.handleSubmit}>
								<div className="form-floating mb-3">
									<input
                                        onChange={this.handleNameChange}
										placeholder="Name"
										required
										type="text"
										name="name"
										id="name"
                                        value={this.state.name}
										className="form-control" />
									<label htmlFor="name">Name</label>
								</div>
								<div className="form-floating mb-3">
									<input
                                        onChange={this.handleStartsChange}
										placeholder="Starts"
										required
										type="date"
										name="starts"
										id="starts"
                                        value={this.state.starts}
										className="form-control" />
									<label htmlFor="starts">Starts</label>
								</div>
								<div className="form-floating mb-3">
									<input
                                        onChange={this.handleEndsChange}
										placeholder="Ends"
										required
										type="date"
										name="ends"
										id="ends"
                                        value={this.state.ends}
										className="form-control" />
									<label htmlFor="ends">Ends</label>
								</div>
								<div className="mb-3">
									<label htmlFor="description">Description</label>
									<textarea
                                        onChange={this.handleDescriptionChange}
										className="form-control"
										id="description"
										name="description"
                                        value={this.state.description}
										rows="3"></textarea>
								</div>
								<div className="form-floating mb-3">
									<input
                                        onChange={this.handleMaxPresentationsChange}
										placeholder="Maximum Presentations"
										required
										type="number"
										name="max_presentations"
										id="max_presentations"
                                        value={this.state.maxPresentations}
										className="form-control" />
									<label htmlFor="max_presentations">Maximum Presentations</label>
								</div>
								<div className="form-floating mb-3">
									<input
                                        onChange={this.handleMaxAttendeesChange}
										placeholder="Maximum Attendees"
										required
										type="number"
										name="max_attendees"
										id="max_attendees"
                                        value={this.state.maxAttendees}
										className="form-control" />

									<label htmlFor="max_attendees">Maximum Attendees</label>
								</div>

								<div className="mb-3">
									<select
                                        onChange={this.handleLocationChange}
										required
										id="location"
										name="location"
										className="form-select">
										<option value={this.state.location}>Choose a location</option>
                                        {this.state.locations.map(location => {
                                            return (
                                                <option key={location.name} value={location.id}>
                                                {location.name}
                                            </option>
                                            )
                                        })}
									</select>
								</div>
								<button className="btn btn-primary">Create</button>
							</form>
						</div>
					</div>
				</div>



        )
    }
}

export default ConferenceForm;
