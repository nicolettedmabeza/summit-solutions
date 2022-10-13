const clueDiv = document.querySelector('#clue');

console.log(clueDiv);
console.log("still firing");

const url = 'https://jservice.xyz/api/random-clue';

const response = await fetch(url);

function createClueHtml(category, question, answer) {
  return `
    <div>
      <h2>${category}</h2>
      <p><b>Question</b>: ${question}</p>
      <p><b>Answer</b>: ${answer}</p>
    </div>
  `;
}

if (response.ok) {
  console.log("response",response);

  const data = await response.json();
  console.log("data",data);

  const category = data.category.title;
  const question = data.question;
  const answer = data.answer;
  const html = createClueHtml(category, question, answer);
  console.log(html);

  clueDiv.innerHTML = html;
} else {
  console.error('Got an error in the response.')
}
// form

const form = document.getElementById("create-clue-form");

console.log(form);

form.addEventListener("submit",createClue);

async function createClue(event){
  event.preventDefault();
  console.log("form fired");

  let formData = new FormData(form);

  let dataofFORM = formData.entries();

  for (let info of dataofFORM ){
    console.log("INFO",info);
  }

  let dataObject =  Object.fromEntries(formData);

  let fetchOptions = {

    method: "post",
    body: JSON.stringify(dataObject),
    headers: {
      "Content-Type":"application/json",
    }

  }

  let newClueUrl = "https://jservice.xyz/api/clues";

  let newClueResponse = await fetch(newClueUrl,fetchOptions);

  console.log("POST Clue",newClueResponse);

  if (newClueResponse.ok){

    let newClue = await newClueResponse.json();

    console.log(newClue);

    let category = newClue.category.title;

    let question = newClue.question;

    let answer = newClue.answer;

    let html = createClueHtml(category, question, answer);

    clueDiv.innerHTML = html;

  }else{
    console.log(newClueResponse);
  }

}
//
// categories

let categoriesUrl = "https://jservice.xyz/api/categories";

let categoriesResponse = await fetch(categoriesUrl);

console.log(categoriesResponse);

if (categoriesResponse.ok){

let data = await categoriesResponse.json();

console.log(data)

let selectTag = document.getElementById("categoryId");

console.log(selectTag);

console.log("DATA categories",data.categories);

for (let category of data.categories.slice(0,100) ){

  let option = document.createElement("option");

  option.value = category.id;
  option.innerHTML = category.title;

  selectTag.appendChild(option);

}

}
