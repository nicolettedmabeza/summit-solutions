import React from 'react';

class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            roomCount: '',
            city: '',
            states:[] }

            // In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

// We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomCountChange = this.handleRoomCountChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name:value})
    }

    handleRoomCountChange(event) {
        const value = event.target.value;
        this.setState({roomCount:value})
    }

    handleCityChange(event) {
        const value = event.target.value;
        this.setState({city:value})
    }

    handleStateChange(event) {
        const value = event.target.value;
        this.setState({state:value})
    }

     //"The event parameter is the event that occurred. The target property on it is the HTML tag that caused the event. So, in this case, the event.target is the input for the location's name. Then, the value property is the value in the input."

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        //copy properties and values from this.state into a new object
        data.room_count = data.roomCount;
        //creating a new key named 'room_count' and setting it to the value of 'roomCount'
        delete data.roomCount;
        delete data.states;
        //Then, we're deleting the keys 'roomCount' and 'states' because I'm guessing we don't want to send that data to the server.
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          const newLocation = await response.json();
          console.log(newLocation);

          const cleared = {
            name: '',
            roomCount: '',
            city: '',
            state: '',
          }
          this.setState(cleared)
        }
      }



    async componentDidMount() {

        const url = "http://localhost:8000/api/states/"
        const response = await fetch(url);

    if (response.ok) {

        const data = await response.json();

        this.setState({states:data.states})


        //if you want to use a method in the class as an event handler, you have to do that 'bind' thing in the constructor."

        }
    }
render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form id="create-location-form" onSubmit={this.handleSubmit}>
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
                                onChange={this.handleRoomCountChange}
                                placeholder="Room count"
                                required
                                type="number"
                                name="room_count"
                                id="room_count"
                                value={this.state.roomCount}
                                className="form-control" />
                            <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={this.handleCityChange}
                                placeholder="City"
                                required
                                type="text"
                                name="city"
                                id="city"
                                value={this.state.city}
                                className="form-control" />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleStateChange} required id="state" name="state" className="form-select">
                                <option value={this.state.state}>Choose a state</option>
                                {this.state.states.map(state => {
                                    return (
                                        <option key={state.abbreviation} value={state.abbreviation}>
                                            {state.name}
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

export default LocationForm;
