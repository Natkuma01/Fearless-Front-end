window.addEventListener('DOMContentLoaded', async () => {

    // getting data from this url
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        const selectTag = document.getElementById('location');
    
    for (let location of data.locations) {
        const option = document.createElement('option')
        option.value = location.id
        option.innerHTML = location.name
        selectTag.appendChild(option)
        }
    }

    const formTag = document.getElementById('create-conference-form');
    
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json)

        // posting the data to this url
        const locationUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
        }
    })
});