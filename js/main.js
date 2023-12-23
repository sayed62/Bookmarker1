var siteName = document.getElementById('bookmarkName');
var siteURL = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

var products=[];

if (localStorage.getItem("productsList")) {
    products = JSON.parse(localStorage.getItem("productsList"));
    for (var x = 0; x < products.length; x++) {
    display(x);
    }
}
submitBtn.addEventListener('click', function createProduct(){
    if( ValidationName()===true &&
    ValidationUrl()=== true)
    {
        var product = {
        siteName: siteName.value,
        siteURL: siteURL.value,
    };
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
    display(products.length - 1);
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    } else {
    boxModal.classList.replace("d-none","d-flex");
    }
});
function crearForm(){
    productsiteName.value="";
    productsiteURL.value="";
}
function display(){
    var trs=``;
    for(var i = 0; i < products.length ; i++){
        var userURL = products[i].siteURL;
        var httpsRegex = /^https?:\/\//g;
        if (httpsRegex.test(userURL)) {
            validURL = userURL;
            fixedURL = validURL
            .split("")
            .splice(validURL.match(httpsRegex)[0].length)
            .join("");
        } else {
            var fixedURL = userURL;
            validURL = `https://${userURL}`;
        }
        trs +=`
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].siteName}</td>              
        <td>
            <button class="btn btn-visit" data-index="${i}">
            <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
        </td>
        <td>
            <button onclick="deleteFrom(${i})" class="btn btn-delete pe-2" data-index="${i}">
            <i class="fa-solid fa-trash-can"></i>
            Delete
            </button>
        </td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML=trs;
}

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
        visitUrl(e);
        });
    }
    }
function ValidationName(){
    var pnamRegex =/^\w{3,}(\s+\w+)*$/;
    var nameValue=bookmarkName.value;
    if(pnamRegex.test(nameValue) == true){
    return true;
    }else{
    return false
    }
}
function ValidationUrl(){
    var urlRegex =/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var urlValue=bookmarkURL.value;
    if(urlRegex.test(urlValue) == true){
    return true;
    }else{
    return false
    }
}
function closeModal() {
    boxModal.classList.add("d-none");
}
function visitUrl(e) {
    var i = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(products[i].siteURL)) {
    open(products[i].siteURL);
    } else {
    open(`https://${products[i].siteURL}`);
    }
}
closeBtn.addEventListener("click", closeModal);
function deleteFrom(index){
    products.splice(index,1);
    localStorage.setItem("productsList", JSON.stringify(products));
    display();
}