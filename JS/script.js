    // Charge le script uniquement sur la page Article et lance la fonction de récupération de données API
    if(window.location.pathname == '/product.html') {
        document.addEventListener('DOMContentLoaded',article),
        document.getElementById('quantity').addEventListener('input', article);

        var ID = window.location.hash.substr(10);

        console.log(ID); 
        // Va récupérer les données de l'API, les convertir et les placer ds le DOM
        function article(){
            fetch('http://localhost:3000/api/furniture'+'/'+ID)

                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value) {
                    document.getElementById('name').innerHTML = value.name;
                    document.getElementById('description').innerHTML = value.description;
                    document.getElementById('price').innerHTML = (((value.price*(document.getElementById('quantity').value))/100).toFixed(2))+"€";
                    document.getElementById('photo').src=value.imageUrl;
                    document.getElementById('0').innerHTML = value.varnish[0];
                    document.getElementById('1').innerHTML = value.varnish[1];
                    document.getElementById('2').innerHTML = value.varnish[2];
                    document.getElementById('3').innerHTML = value.varnish[3];
                })

                .catch(function(err) {

                })
        };              
    }

    let carts = document.getElementById('add_cart');
    let cartAlert = document.getElementById('cart_alert');
    let products = [
        ];

    // Ecouteur sur le bouton Ajouter
    carts.addEventListener('click', () => {
        cartNumbers();
    });

    for (let i=0; i < carts.length; i ++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
        })
    }

    // Permet d'afficher le nombre de produit ds le cart au chargement de la page
    onLoadCartNumbers();

    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');

        if(productNumbers) {
            cartAlert.textContent = productNumbers;
        }
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

        setItems (product);

    }

    function setItems (product) {
        console.log('Inside of setItems function' +
        '\n My product is ' + product)
    }
