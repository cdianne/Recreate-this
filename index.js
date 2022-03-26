window.addEventListener("load", setup);
const endpoint = "http://diana.ireen.dk/wp22/wp-json/wp/v2/";

function setup() {
    getCategories();

}



function getCategories() {
    //http://diana.ireen.dk/wp22/wp-json/wp/v2/categories?parent=8
    fetch(endpoint + "categories?parent=8&_fields=name")
        .then(res => res.json())
        .then(setupCategories);

}

function getTheProducts() {
    fetch("http://diana.ireen.dk/wp22/wp-json/wp/v2/product?per_page=12&_embed")
        .then(res => res.json())
        .then(setupProducts);
}

function setupProducts(productArray) {
    console.log(productArray);
    const template = document.querySelector("template#productTemplate").content;
    const parentElement = document.querySelector("main");
    productArray.forEach(product => {
        const copy = template.cloneNode(true);
        // copy.querySelector("img").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

        copy.querySelector("h3.brand").textContent = `${product.title.rendered}`;
        copy.querySelector("h2.name").textContent = `${product.model_name}`
        copy.querySelector("h3.price").textContent = `${product.price} $`
        copy.querySelector("h3.colours").textContent = `${product.color}`
        copy.querySelector("h3.instock").textContent = `${product.in_stock}`
        parentElement.appendChild(copy);

    })

}


function setupCategories(catArray) {
    const template = document.querySelector("template#categoryTemplate").content;
    const parentElement = document.querySelector("header");
    catArray.forEach(cat => {
        const copy = template.cloneNode(true);
        copy.querySelector("h2").textContent = cat.name;
        parentElement.appendChild(copy);

    })
    getTheProducts();

}