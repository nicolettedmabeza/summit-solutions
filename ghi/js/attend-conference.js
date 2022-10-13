window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      selectTag.classList.remove("d-none")
      const loadingTag = document.getElementById("loading-conference-spinner")
      loadingTag.classList.add("d-none")

      const formTag = document.getElementById('create-attendee-form');
      formTag.addEventListener('submit', async event => {
        event.preventDefault();

      const formData = new FormData(formTag);
      const jsonForm = JSON.stringify(Object.fromEntries(formData));
      console.log(jsonForm)


      const attendeeUrl = 'http://localhost:8001/api/attendees/';
      const fetchConfig = {
      method: "post",
      body: jsonForm,
      headers: {
          'Content-Type': 'application/json',
      }};
      // console.log(fetchConfig)

      const response = await fetch(attendeeUrl, fetchConfig);
      console.log(response)
      if (response.ok) {
          formTag.reset();
          const newAttendee = await response.json();

          formTag.classList.add("d-none")
          const alertTag = document.getElementById("success-message")
          alertTag.classList.remove("d-none")

      }



      });



    }

  });
