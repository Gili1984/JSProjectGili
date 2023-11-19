import { fetchApi, render } from "./functions.js";

const contentHolder = document.getElementById("content");
const all=document.querySelector(".all")
const searchInput = document.getElementById("searchInput");
const spiner = document.getElementById("spiner");

const bordersEl = document.createElement("div");
const cuntryList = document.getElementById("cuntryList");

const navItem=document.querySelectorAll(".nava")
console.log(navItem)

const offcanvasScrolling = document.getElementById("offcanvasScrolling");



const createColCard = (obj) => {
    const colEL = document.createElement("div");
    colEL.className = "colEL col-md-3 p-1";
    const cardEl = document.createElement("div");
    cardEl.className = "colcard  card p-1 shadow";
    
    cardEl.innerHTML = `
            <img class="w-100" src=${obj.flags.png} />
              <p>Name of cuntey:${obj.name.common}</p>
              <p>The capital city:${obj.capital}</p>
          

    `;
    const buttonn=document.createElement("button");
    buttonn.classList.add("cartBtn", "btn", "btn-dark", "w-100")
    buttonn.innerText="For more info"
  
    buttonn.addEventListener('click',()=>{
    
    const cName=obj.name.common.split(" ").join("%20")
    console.log(`https://restcountries.com/v3.1/name/${cName}`)
    fetchApi(`https://restcountries.com/v3.1/name/${cName}`)
    .then((data) => render(data, contentHolder, createCOneCard))
    .catch((err) => console.log(err));})
  
    colEL.append(cardEl);
    colEL.append(buttonn);
    return colEL;
  };


  //borders functions

 function borderFunc(obj){
  
    const buttonn2=document.createElement("button");
    buttonn2.classList.add("cartBtn", "btn","borderBtn")
    // buttonn2.style="color:white;"
   
    buttonn2.innerText=obj

    bordersEl.append(buttonn2);
    buttonn2.addEventListener('click',()=>
    fetchApi(`https://restcountries.com/v3.1/name/${obj}`)
    .then((data) => render(data, contentHolder, createCOneCard))
    .catch((err) => console.log(err)));
    
 }


  const createCOneCard = (obj) => {
    const colEL = document.createElement("div");
    colEL.className = " d-flex col-md-12 p-1 flex-wrap";
    const cardEl = document.createElement("div");
    cardEl.className = " cardOne card p-5 shadow ";
    cardEl.style=" background: rgba(255, 255, 255, 0); width: 700px";
    const imgEl = document.createElement("div");
  
    imgEl.className = " imgg card p-1 shadow";
   
    imgEl.style=" background: rgba(255, 255, 255, 0);";
 
    imgEl.innerHTML = `
             <img class="p-5 imgg" src=${obj.flags.png}  width="600px"/>
             
    `;
    
    cardEl.innerHTML+=`<article>
    <h2>${obj.name.common}</h2>
    <br>
    <h3>The capital city: ${obj.capital}</h3>
    <h3>Numbers Of Citizen: ${obj.population}</h3>
    <h3>Languages: ${Object.values(obj.languages).join(" ,")} </h3>
    
    <a href="https://www.google.com/search?q=${obj.name.common}+wikipedia">for more info from wikipedia </a>
   
    </article>`
   
    const baseMap = document.createElement("div");
    baseMap.className = "  card  shadow";
    baseMap.style=" background: rgba(255, 255, 255, 0); width: 100%; height: 450px; ";
    
    const holdMpa=document.createElement("div")
    holdMpa.id="holdMpa"
    holdMpa.className = "  card  shadow m-auto";
    holdMpa.style="background:  rgba(255, 255, 255, 0); width: 60%; height: 360px; ";

    holdMpa.innerHTML=`<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
    src="https://maps.google.com/maps?q=${obj.latlng[0]},${obj.latlng[1]}&hl=iw&z=4&amp;output=embed">
    </iframe>`
    baseMap.append(holdMpa)
   
    bordersEl.className = "";
    bordersEl.style="background: rgba(255, 255, 255, 0);"
    bordersEl.innerHTML=`<h4>Borders cuntries:</h4>`;
    if(obj.borders){
     
  for (let i=0; i<obj.borders.length; i++){
    
    fetchApi(`https://restcountries.com/v3.1/name/${obj.borders[i]}`)
    .then((data) =>borderFunc(data[0].name.common))
    .catch((err) => console.log(err));}
      //obj.borders.forEach((e)=>borderFunc(e))
      cardEl.append(bordersEl);
  }
//borderFunc(data[0].name.common,obj.borders[i])

    
    colEL.append(imgEl);
    colEL.append(cardEl);
    colEL.append(baseMap);
    
    //drowMap(holdMpa, 51.505, -0.09)
   
   
  
    return colEL;
  };


  // for (let i=0; i<obj.borders.length; i++){
  //   fetchApi(`https://restcountries.com/v3.1/name/${obj.borders[i]}`)
  //   .then((data) => borderFunc(data[0].name.common))
  //   .catch((err) => console.log(err));



  
  const url = "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags"
  

 fetchApi(url)
 .then((data) => render(data, contentHolder, createColCard))
 .catch((err) => console.log(err));

 function showNav(e){
    console.log(e.target.id)
    const term=e.target.id;
    const urlForSHOW = `https://restcountries.com/v3.1/name/${term}`
    fetchApi(urlForSHOW)
    .then((data) => render(data, contentHolder, createCOneCard))
    .catch((err) => console.log(err));

 }

 for(const nava of navItem){
    nava.addEventListener('click', showNav);
 }


//the all button
 all.addEventListener('click', ()=>
  fetchApi(url)

.then((data) => render(data, contentHolder, createColCard))
.catch((err) => console.log(err)));


// search
const searchProduct = (event) => {
    spiner.className="d-block";
    //console.log(event.target.value)
    const searchTerm = event.target.value;
    const urlForShearch = `https://restcountries.com/v3.1/name/${searchTerm}`
    fetchApi(urlForShearch)
    .then((data) => render(data, contentHolder, createColCard))
    .catch((err) => alert("The name of the country is unknown"));
  };

  
searchInput.addEventListener("input", searchProduct);

//list of cuntries

const createcunteyButton=(obj)=>{
  const buttonEL = document.createElement("button");
  buttonEL.className="btn btn-dark w-100 p-0"
  buttonEL.innerHTML=`${obj.name.common}`;
  buttonEL.addEventListener('click',()=>{
  offcanvasScrolling.setAttribute("data-bs-dismiss","offcanvas")
    fetchApi(`https://restcountries.com/v3.1/name/${obj.name.common}`)
    
    .then((data) => render(data, contentHolder, createCOneCard))
    .catch((err) => console.log(err))
   
  })
  return buttonEL
    
}




fetchApi(url)
.then((data)=> data.sort((a,b)=>a.name.common.localeCompare(b.name.common)))
.then((data) => render(data, cuntryList, createcunteyButton))
.catch((err) => console.log(err));

