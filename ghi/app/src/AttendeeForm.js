import React from 'react';

class AttendeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            conferences:[],
            valid: false,
        }



        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name:value})
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({email:value})
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference:value})
    }





    async handleSubmit(event) {

        event.preventDefault();
        const data = {...this.state};

        delete data.conferences;
        delete data.valid;
        //Then, we're deleting the keys 'roomCount' and 'states' because I'm guessing we don't want to send that data to the server.
        console.log(data);

        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
      }};

        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
          const newAttendee = await response.json();
          console.log(newAttendee);

          const cleared = {
            name: '',
            email: '',
            conference: '',
          }
          this.setState(cleared)
          this.setState({valid:true})



        }
      }



    async componentDidMount() {

        const url = "http://localhost:8000/api/conferences/"
        const response = await fetch(url);

    if (response.ok) {

        const data = await response.json();
        console.log(data)

        this.setState({conferences:data.conferences})


        //if you want to use a method in the classNameName as an event handler, you have to do that 'bind' thing in the constructor."

        }
    }
render () {

        let spinnerClasses = 'd-flex justify-content-center mb-3';
        let dropdownClasses = 'form-select d-none';
        let alertClasses = 'alert alert-success d-none mb-0'
        let formClasses = 'attendee-form'


        if (this.state.conferences.length > 0) {
        spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
        dropdownClasses = 'form-select';
        }

        if (this.state.valid) {
            alertClasses = "alert alert-success mb-0"
            formClasses = "attendee-form d-none"
        }

        return (


            <div className="row">
            <div className="col col-sm-auto">
                <img
                    width="300"
                    className="bg-white rounded shadow d-block mx-auto mb-4"
                    src="/logo.svg" />
            </div>
            <div className="col">
                <div className="card shadow">
                    <div className="card-body">
                        <div className={formClasses}>
                        <form id="create-attendee-form" onSubmit={this.handleSubmit}>
                            <h1 className="card-title">It's Conference Time!</h1>
                            <p className="mb-3">
                                Please choose which conference you'd like to attend.
                            </p>
                            <div
                                className={spinnerClasses}
                                id="loading-conference-spinner">
                                <div className="spinner-grow text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleConferenceChange}
                                    name="conference"
                                    id="conference"
                                    className={dropdownClasses}
                                    required>
                                    <option value={this.state.conference}>Choose a conference</option>

                                {this.state.conferences.map(conference => {
                                    return (
                                        <option key={conference.id} value={conference.href}>
                                            {conference.name}
                                        </option>
                                    )
                                })}
                            </select>
                            </div>
                            <p className="mb-3">Now, tell us about yourself.</p>
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input
                                            onChange={this.handleNameChange}
                                            required
                                            placeholder="Your full name"
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control" />
                                        <label htmlFor="name">Your full name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input
                                            onChange={this.handleEmailChange}
                                            required
                                            placeholder="Your email address"
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control" />
                                        <label htmlFor="email">Your email address</label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-lg btn-primary">I'm going!</button>
                        </form>
                        </div>
                        <div
                            className={alertClasses}
                            id="success-message">
                            Congratulations! You're all signed up!
                        </div>
                    </div>
                </div>
            </div>
        </div>



        )
    }
}

export default AttendeeForm;
