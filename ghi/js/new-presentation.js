window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/conferences/"

    try {
        const response = await fetch(url);

        if (response.ok) {

            const data = await response.json();

            const selectTag = document.getElementById("conference")
            // console.log(selectTag)

            for (let conference of data.conferences) {
                // console.log(conference)
                let option = document.createElement("option");
                option.value = conference.id;
                option.innerHTML = conference.name;

                selectTag.appendChild(option)
            }

            const formTag = document.getElementById('create-presentation-form');
            formTag.addEventListener('submit', async event => {
              event.preventDefault();

            const formData = new FormData(formTag);
            const jsonForm = JSON.stringify(Object.fromEntries(formData));
            console.log(jsonForm)
            const conferenceList = document.getElementById("conference")
            const value = conferenceList.options[conferenceList.selectedIndex].value;

            const locationUrl = 'http://localhost:8000/api/conferences/'+ value +'/presentations/';
            const fetchConfig = {
            method: "post",
            body: jsonForm,
            headers: {
                'Content-Type': 'application/json',
            }};
            // console.log(fetchConfig)

            const response = await fetch(locationUrl, fetchConfig);
            console.log(response)
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }

            });

        }
    } catch (e) {
        console.error('This is an error')
    }});
