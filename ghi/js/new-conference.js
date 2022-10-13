window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/locations/"

    try {
        const response = await fetch(url);

        if (response.ok) {

            const data = await response.json();
            console.log(data);

            const selectTag = document.getElementById("location")
            console.log(selectTag)

            for (let location of data.locations) {
                console.log(location)
                let option = document.createElement("option");
                option.value = location.id;
                option.innerHTML = location.name;

                selectTag.appendChild(option)
            }

            const formTag = document.getElementById('create-conference-form');
            formTag.addEventListener('submit', async event => {
              event.preventDefault();

            const formData = new FormData(formTag);
            const jsonForm = JSON.stringify(Object.fromEntries(formData));
            console.log(jsonForm)
            const locationUrl = 'http://localhost:8000/api/conferences/';
            const fetchConfig = {
            method: "post",
            body: jsonForm,
            headers: {
                'Content-Type': 'application/json',
            }};
            // console.log(fetchConfig)

            const response = await fetch(locationUrl, fetchConfig);
            // console.log(response)
            // if (response.ok) {
            //     formTag.reset();
            //     const newLocation = await response.json();
            // }

            });

        }
    } catch (e) {
        console.error('This is an error')
    }});
