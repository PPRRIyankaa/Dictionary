const word = document.getElementById("word");
const search = document.getElementById("search");
const def = document.getElementById("defination");
const synon = document.getElementById("synonyms");
const anton = document.getElementById("antonyms");
const example = document.getElementById("example");
const notFound = document.getElementById("notFound");
const shabad = document.getElementById("shbad");


search.addEventListener("click", async () => {
  const value = word.value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
  shabad.innerHTML = value;
  const defi = [],
    syn = [],
    ant = [],
    ex = [];
  let flag = true;
  await fetch(url).then(async(response)=>{
    response= await response.json()
    if(response.title === "No Definitions Found"){
      notFound.innerHTML = "There is no such word in this dictionary";
      flag = false;
    }
    else{
    response=response[0]
    if(response ==undefined) return;
    response.meanings.map((e)=>{
      if (e.synonyms!==undefined && e.synonyms.length !== 0)
        e.synonyms.map((element) => syn.push(element));
      if (e.antonyms!==undefined && e.antonyms.length !== 0)
        e.antonyms.map((element) => ant.push(element));
      e.definitions.map((ele) => {
      if (ele.definition.length !== 0) 
        defi.push(ele.definition);
      if (ele.synonyms.length !== 0)
        ele.synonyms.map((element) => syn.push(element));
      if (ele.antonyms.length !== 0)
        ele.antonyms.map((element) => ant.push(element));
      if (ele.example !== undefined && ele.example.length !== 0)
        ex.push(ele.example);
    })});
    if (defi.length > 0) {
      def.innerHTML = "<h4>Here are the definations: </h4> <ul>";
      defi.map((element)=>{
        def.innerHTML += `<li>${element}</li>`
      })
      def.innerHTML += "</ul>"
    }
    if (syn.length > 0) {
        synon.innerHTML = "<h4>Here are the synonyms: </h4> <ul>";
        syn.map((element)=>{
          synon.innerHTML += `<li>${element}</li>`
        })
        synon.innerHTML += "</ul>"
    }
    if (anton.length > 0) {
        ant.innerHTML = "<h4>Here are the antonyms: </h4> <ul>";
        syn.map((element)=>{
          anton.innerHTML += `<li>${element}</li>`
        })
        anton.innerHTML += "</ul>"
    }
  
    if (ex.length > 0) {
        example.innerHTML = "<h4>Here are the Example: </h4> <ul>";
        ex.map((element)=>{
        example.innerHTML += `<li>${element}</li>`
        })
        example.innerHTML += "</ul>"

    }
    notFound.innerHTML = "";
    }
  });
  if(flag === true){
  await fetch("http://localhost:8000/searchedwords",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({word:value})
    })
  }
});



