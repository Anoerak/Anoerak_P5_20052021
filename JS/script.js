    // Variables
    const nameDiv = document.getElementById('name'),
          descriptionDiv = document.getElementById('description'),
          priceDiv = document.getElementById('price'),
          photoDiv = document.getElementById('photo'),
          qtyDiv = document.getElementById('quantity')
          cartsDiv = document.getElementById('add_cart');

    let ID = window.location.hash.substr(10);
    let logTest = "";
    let furniture = "";
    let vernis = "";
    let cartAlert = document.getElementById('cart_alert');

    // Cart
    let cart = [];
    // Charger la sélection
    class Products {
        async getProducts () {
            try{
                fetch('http://localhost:3000/api/furniture')
                    .then(function(res) {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then(data => logTest = data)

                }
                catch (error) {
                    console.log(errors);
                }
            }
    }
    // Afficher la selection
    class UI {

    }
    // Stocker la sélection en local
    class Storage{

    } 

    document.addEventListener("DOMContentLoaded",() => {
        const ui = new UI();
        const products = new Products();

        // Charger les produits
    });

    // Charge le script uniquement sur la page Article et lance la fonction de récupération de données API
    if(window.location.pathname == '/product.html') {
        document.addEventListener('DOMContentLoaded',article),
        qtyDiv.addEventListener('input', function(){
            priceDiv.innerHTML = (((furniture.price*(qtyDiv.value))/100).toFixed(2))+"€";
        });

        console.log(ID); 
        // Va récupérer les données de l'API, les convertir et les placer ds le DOM
        function article(){
            fetch('http://localhost:3000/api/furniture'+'/'+ID)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => furniture = data)
                .then (furniture => vernis = furniture.varnish)
                .then(function() {
                    nameDiv.innerHTML = furniture.name;
                    descriptionDiv.innerHTML = furniture.description;
                    priceDiv.innerHTML = (((furniture.price*(qtyDiv.value))/100).toFixed(2))+"€";
                    photoDiv.src=furniture.imageUrl;
                        vernis.forEach(createOption);
                            function createOption(item, index){
                                let opt = document.createElement('option');
                                opt.value = index;
                                opt.innerHTML += item;
                                document.getElementById('optionv').appendChild(opt);
                            }
                })
                .catch(function(err) {
                    console.log("Attention, quelque chose ne tourne pas rond!!!")
                })
        };
    // Ecouteur sur le bouton Ajouter
    cartsDiv.addEventListener('click', () => {
        cartNumbers();
    });

    // Incrémente le cart au fur et a mesure des clics
    for (let i=0; i < cartsDiv.length; i ++) {
        cartsDiv[i].addEventListener('click', () => {
            cartNumbers(cart[i]);
        })
    }

    // Permet d'ajouter +1 ds le cart
    function cartNumbers(product){
        console.log('The product choosed is', product);
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);

        if( productNumbers ) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            cartAlert.textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            cartAlert.textContent = 1;
        }
    }
    }
    // Permet d'afficher le nombre de produit ds le cart au chargement de la page
    onLoadCartNumbers();
    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');

        if(productNumbers) {
            cartAlert.textContent = productNumbers;
        }
    }
    
    

