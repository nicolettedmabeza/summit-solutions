function createCard(name, location, description, pictureUrl, starts, ends) {
    return `
    <div class="col">
      <div class="card h-100 shadow-lg mb-5">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
          <a href="#" class="btn btn-primary">Conference Details</a>
        </div>
        <div class="card-footer">
            ${starts} - ${ends}
        </div>
      </div>



    </div>
    `;
  }

  function alertComponent() {
    return `

    <div class="alert alert-primary" role="alert">
    Something's going wrong!
    </div>

    `
  }

  window.addEventListener('DOMContentLoaded', async () => {


    const url = 'http://localhost:8000/api/conferences/';


    try {
      const response = await fetch(url);

      if (!response.ok) {

        const newHTML = alertComponent()
        const somethingWrong = document.querySelector('.container')
        console.log(somethingWrong)
        somethingWrong.innerHTML = newHTML;

      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;

            const location = details.conference.location.name;

            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;

            const startDate = new Date(details.conference.starts)
            const starts = startDate.toLocaleDateString()

            const endDate = new Date(details.conference.ends)
            const ends = endDate.toLocaleDateString()



            const html = createCard(title, location, description, pictureUrl, starts, ends);
            const column = document.querySelector('.card-group');
            column.innerHTML += html;

          }
        }

      }
    } catch (e) {
        console.error("You got an error!");
        // alert("Hello! I am an alert box!!");

        const newHTML = alertComponent()
        const somethingWrong = document.querySelector('.container')
        console.log(somethingWrong)
        somethingWrong.innerHTML = newHTML;
      // Figure out what to do if an error is raised
    }

  });
