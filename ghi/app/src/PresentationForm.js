
import React, { useEffect, useState } from 'react';

function PresentationForm() {

    const [conferences, setConferences] = useState([])
    // from the fetchData url

    const[presenterName, setPresenterName] = useState('');
    const[presenterEmail, setPresenterEmail] = useState('');
    const[companyName, setCompanyName] = useState('');
    const[title, setTitle] = useState('');
    const[synopsis, setSynopsis] = useState('');
    const[conference, setConference] = useState('');

    const handlePresenterNameChange = (event) => {
        const value = event.target.value;
        setPresenterName(value);
    }
    // the value make the data clear after submit
    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const handlePresenterEmailChange = (event) => {
        const value = event.target.value;
        setPresenterEmail(value);
    }
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
    const data = {};
    data.presenter_name = presenterName;
    data.presenter_email = presenterEmail;
    data.company_name = companyName;
    data.title = title;
    data.synopsis = synopsis;
    data.conference = conference;   
    
    // right handside of the equal sign is the value={}

    console.log(data);

    const locationUrl = `http://localhost:8000/${conference}presentations/`;
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
        const newPresentation = await response.json();
        console.log(newPresentation);

        setPresenterName('');
        setPresenterEmail('');
        setCompanyName('');
        setTitle('');
        setSynopsis('');
        setConference('');
    }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setConferences(data.conferences)
        
            // conferences refer to line 81 url
        //   refer back to line 6 for setConferences
        }
    }

    useEffect( () => {
        fetchData();
      }, []);

  return ( 
  <div className="container">
  <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Create a new presentation</h1>
        <form onSubmit={handleSubmit} id="create-presentation-form">
          <div className="form-floating mb-3">
            <input onChange={handlePresenterNameChange} value={presenterName} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
            <label htmlFor="presenter_name">Presenter name</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handlePresenterEmailChange} value={presenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
            <label htmlFor="presenter_email">Presenter email</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleCompanyNameChange} value={companyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
            <label htmlFor="company_name">Company name</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
            <label htmlFor="title">Title</label>
          </div>
          <div className="mb-3">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea onChange={handleSynopsisChange} value={synopsis} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
          </div>
          <div className="mb-3">
            <select onChange={handleConferenceChange} value={conference} required name="conference" id="conference" className="form-select">
              <option value="">Choose a conference</option>
              {conferences.map(presentation => {
                return (
                    <option key={presentation.href} value={presentation.href}>
                        {presentation.name}
                    </option>
                );
              } )}
            </select>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</div>


    
  )
}
export default PresentationForm;