import React, { useEffect, useState } from 'react';


function AttendConferenceForm(props) {

    const [attendees, setStates] = useState([]);
    // states is variable, useState is React 
    // empty [] means loading states data inside a list
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ends, setEnds] = useState('');
    

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
    const data = {};
    data.name = name;
    data.email = email;
    data.ends = ends;
   

    console.log(data);

    const locationUrl = 'http://localhost:8000/api/conferences/';
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

        setName('');
        setStarts('');
        setEnds('');
        setDescription('');
        setMaxPresentation('');
        setMaxAttendees('');
        setLocation('');
    }
}


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setStates(data.attendees)
       // put the backend data ( states) to the React

      }
    }       
  // useEffect help to execute the fetchData function
    useEffect( () => {
      fetchData();
    }, []);
  
    return( <div className="container">
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="./images/logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form id="create-attendee-form">
                <h1 className="card-title">It's Conference Time!</h1>
                <p className="mb-3">
                  Please choose which conference
                  you'd like to attend.
                </p>
                <div className="d-flex justify-content-center mb-3" id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary"  role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select name="conference" id="conference" className="form-select d-none" required>
                    <option value="">Choose a conference</option>
                  </select>
                </div>
                <p className="mb-3">
                  Now, tell us about yourself.
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleNameChange} value={name} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleEmailChange} value={email} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" />
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>
              <div className="alert alert-success d-none mb-0" id="success-message">
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        

    )
  }
  

export default AttendConferenceForm;
