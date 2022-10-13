window.addEventListener('DOMContentLoaded', async () => {
const url = "http://localhost:8000/api/states/"

try {
    const response = await fetch(url);

    if (response.ok) {

        const data = await response.json();
        console.log(data);

        const selectTag = document.getElementById("state")
        console.log(selectTag)

        for (let state of data.states) {
            let option = document.createElement("option");
            option.value = state.abbreviation;
            option.innerHTML = state.name;

            selectTag.appendChild(option)
        }

        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener('submit', async event => {
          event.preventDefault();

        const formData = new FormData(formTag);
        const jsonForm = JSON.stringify(Object.fromEntries(formData));
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
        method: "post",
        body: jsonForm,
        headers: {
            'Content-Type': 'application/json',
        }};
        console.log(fetchConfig)

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
