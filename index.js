//getting data from server
const fethingDAta=(mName)=>{
    let url=`https://openapi.programming-hero.com/api/phones?search=${mName}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>outputData(data))
}
//showing data by search btn
document.getElementById("search-btn").addEventListener("click", function(){
    let searchValue=document.getElementById("search-input").value;
    fethingDAta(searchValue);
    document.getElementById("loader").classList.remove("d-none");
});
//showing data by enter key
document.getElementById("search-input").addEventListener("keyup",function(e){
    if(e.key=="Enter"){
        fethingDAta(e.target.value);
        document.getElementById("loader").classList.remove("d-none");
    }
})
//data showing function
const outputData=(data,dataLimit=true)=>{
    const parentElement =document.getElementById("card-container");
    parentElement.innerHTML = "";
    let mobiles=data.data;
    if(mobiles.length==0){
        let ntg=document.createElement("h3");
        ntg.classList.add("text-muted");
        ntg.innerText="No Mobiles Found";
        parentElement.appendChild(ntg);
    }
    if(dataLimit && mobiles.length>9){
        mobiles=data.data.slice(0,9);
        document.getElementById("seeMore").classList.remove("d-none");
    }
    document.getElementById("seeMore").addEventListener("click",function(e){
        document.getElementById("seeMore").classList.add("d-none");
        outputData(data,false);
    });
    mobiles.forEach(element=>{
        const childElement = document.createElement("div");
        childElement.setAttribute("class", "col");
        childElement.innerHTML=`
        <div class="card h-100">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <h6 class="card-title text-muted">${element.brand}</h6>
                <p class="card-text">If You Want To Buy This,First Sell Your Kidney </p>
            </div>
            <button type="button" class="btn btn-primary" onclick="mobileDetail('${element.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
            See Details
          </button>
        </div>
      `
      parentElement.appendChild(childElement);
    })
    document.getElementById("loader").classList.add("d-none");
}
const mobileDetail=async (id)=>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`;
  const res=await fetch(url);
  const data=await res.json();
  console.log(data);
  const features=data.data.mainFeatures;
  document.getElementById("modal-image").setAttribute("src",data.data.image);
  document.getElementById("title").innerText=`${data.data.name}`;
  document.getElementById("brand").innerText=`${data.data.brand}`;
  document.getElementById("storage").innerText=`${features.storage}`;
  document.getElementById("chipset").innerText=`${features.chipSet}`;
  document.getElementById("displaysize").innerText=`${features.displaySize}`;
  document.getElementById("memory").innerText=`${features.memory}`;

}