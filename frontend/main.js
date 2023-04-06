let ul = document.querySelector("#allFoods");
let allCategoriesDiv = document.querySelector("#allCategories");
let infoDiv = document.querySelector("#info");

let getData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data.data;
};


let getAllFoods = async () => {
    let allFoods = await getData("http://localhost:1337/api/foods?populate=*");
    renderFoods(allFoods)
}

getAllFoods();

let getCategories = async () => {
    let allFoodCategories = await getData("http://localhost:1337/api/kategoris?populate=*");
    renderCategories(allFoodCategories)
}
getCategories();




let renderCategories = (array) => {
    array.forEach(categori => {
        let allCategoriesFood = "";
        let categoriesFood = categori.attributes.foods.data;
        categoriesFood.forEach((categorie => allCategoriesFood += categorie.attributes.name + " "))

        let h3 = document.createElement("h3");
        h3.innerText = categori.attributes.Kategori;
        let p = document.createElement("p");
        p.innerText = allCategoriesFood;

        allCategoriesDiv.append(h3);
        allCategoriesDiv.append(p);

    });
}



let renderFoods = (array) => {
    array.forEach(food => {
        let allCategories = "";
        let categories = food.attributes.kategorises.data;
        categories.forEach((categorie => allCategories += categorie.attributes.Kategori + ", "))

        let { name, price } = food.attributes;
        let li = document.createElement("li");
        li.innerText = `${name}. Pris: ${price} kr. Matkategori: ${allCategories ? allCategories : "Ingen kategori"}`;
        ul.append(li)
    });
}

let getRestaurantInfo = async () => {
    let info = await getData("http://localhost:1337/api/restaurant?populate=*")
    renderRestaurantInfo(info);

}
getRestaurantInfo();


let renderRestaurantInfo = (array) => {
    let allPersonal = " ";
    let personal = array.attributes.personal;
    personal.forEach((person => allPersonal += person.namn + ", "))

    let p = document.createElement("p");
    p.innerText = `${array.attributes.name} Adress: ${array.attributes.adress} Personal: ${allPersonal}`
    infoDiv.append(p);
}
