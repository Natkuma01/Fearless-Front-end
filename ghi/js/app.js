function createCard(name, description, pictureUrl, created, ends, venue) {
    return `
      <div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded ms-5" style="width: 18rem;">
        <img src="${pictureUrl}" class="card-img-top shadow-lg p-3 mb-5 bg-body rounded">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text text-secondary fs-6">${venue}</p>
          <p class="card-text">${description}</p>
         
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${created}-${ends}</li>
        </ul>
      </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        // Figure out what to do when the response is bad
      } else {
        const data = await response.json();
        // const conference = data.conferences[0];
        // const nameTag = document.querySelector('.card-title');
        // nameTag.innerHTML = conference.name;
  
        // const detailUrl = `http://localhost:8000${conference.href}`;
        // const detailResponse = await fetch(detailUrl);
        // if (detailResponse.ok) {
        //     const details = await detailResponse.json();
        
        //     const description = details.conference.description;
        //     const descriptionTag = document.querySelector('.card-text');
        //     descriptionTag.innerHTML = description;

        //     const imageTag = document.querySelector('.card-img-top');
        //     imageTag.src = details.conference.location.picture_url;                
        //     }
        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
              const details = await detailResponse.json();
              const title = details.conference.name;
              const venue = details.conference.location.name;
              const description = details.conference.description;
              const pictureUrl = details.conference.location.picture_url;
              const created = new Date(details.conference.created).toLocaleDateString();
              const ends = new Date(details.conference.ends).toLocaleDateString();
              const html = createCard(title, description, pictureUrl, created, ends, venue);
              const column = document.querySelector('.col');
              column.innerHTML += html;
            }
          } 
  
      }
    } catch (e) {
        const warning = document.querySelector(".message")
        warning.innerHTML += dataError(e)
      // Figure out what to do if an error is raised
    }
    function dataError(canBeAnything) {
        return `<p class = "alert alert-warning"> ${canBeAnything}</p>`
    }
  });  
