
    // Variables
    const nameDiv = document.getElementById('name'),
          descriptionDiv = document.getElementById('description'),
          priceDiv = document.getElementById('price'),
          photoDiv = document.getElementById('photo'),
          qtyDiv = document.getElementById('quantity'),
          varnishDiv = document.getElementById('optionv'),
          cartsDiv = document.getElementById('add_cart');

    let ID = window.location.hash.substr(10);
    let logTest = "";
    let furniture = "";
    var vernis = "";
    let cartAlert = document.getElementById('cart_alert');

    // Cart
    let cart = [];
    // Charger la sélection
    class Products {
        async getProducts () {
            try{
                let result = await fetch('http://localhost:3000/api/furniture')
                .then(response => response.json())
                    return result;
                }
                catch (error) {
                    console.log(error);
                }
            }
    }
    // Charge le script uniquement sur la page Article et lance la fonction de récupération de données API
    console.log(window.location.pathname)
        if(window.location.pathname === '/product.html')
            {document.addEventListener('DOMContentLoaded',article),
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
                                    varnishDiv.appendChild(opt);
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
                    let productNumbers = localStorage.getItem('cartNumbers');

                    productNumbers = parseInt(productNumbers);
                    selectedQty = parseInt(qtyDiv.value);

                if( productNumbers ) {
                    localStorage.setItem('cartNumbers', productNumbers + selectedQty);
                    cartAlert.textContent = productNumbers + selectedQty;
                } else {
                    localStorage.setItem('cartNumbers', selectedQty);
                    cartAlert.textContent = selectedQty;
                    }
                }
                // // Permet d'ajouter la selection au cart sous forme d'objet
                // cartsDiv.addEventListener('click', function() {
                //     let selectedVarnish = varnishDiv.selectedOptions;
                //     let localSelector = selectedVarnish[0].innerHTML;
                //     console.log(selectedVarnish)
                //     let selected ={
                //         Id: ID,
                //         Name: nameDiv.textContent,
                //         Varnish: selectedVarnish[0].innerHTML,
                //         Qty: qtyDiv.value,
                //         Price: priceDiv.textContent,
                        
                //     }
                //     localStorage.setItem(ID+"_"+localSelector, JSON.stringify(selected));
                // })

                // // Permet d'ajouter la selection au cart sous forme de tableau par selection
                
                cartsDiv.addEventListener('click', function() {
                    let selectedVarnish = varnishDiv.selectedOptions;
                    let localSelector = selectedVarnish[0].innerHTML;
                    let localArray = [];
                    let selection ={
                        Id: ID,
                        Name: nameDiv.textContent,
                        Varnish: selectedVarnish[0].innerHTML,
                        Qty: qtyDiv.value,
                        Price: priceDiv.textContent,
                        
                    }
                    localArray.push(selection.Id, selection.Name, selection.Varnish, selection.Qty, selection.Price);
                    console.table(selection)
                    localStorage.setItem(ID+"_"+localSelector, JSON.stringify(localArray))
                })
                console.table(localStorage.getItem(JSON.stringify(ID)))
        }

    // Charge le script uniquement sur la page Panier et lance la fonction de récupération de données en stockage loacale
    if(window.location.pathname === '/cart.html') {
        // let allStorage = [...localStorage];
        // console.log(allStorage)
        // allStorage.key.forEach(createOption);
        //     function createOption(ID, Name, Varnish, Qty, Price){
        //         let card = document.createElement('div');
        //         card.className = cart_card;
        //         card.innerHTML += '<div id="my_selection" class="cart_card"><img src="./images/oak_1.webp" alt="table_design_bois"><div class="product_infos"><div class="product_title"><h3 class="ttl">Cross Table</h3><p class="price_unit"><span class="price_unit">      599.00</span>€</p></div><div class="underline"></div><div class="card_bottom"><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nisi dolorum sapiente quo exercitationem, inventore cupiditate reiciendis numquam cum repellendus eveniet consequuntur voluptatibus obcaecati rem tenetur quos est deleniti. Quaerat?</p><div class="cart_modifications"><div class="product_numbers"><p class="varnish_cart">Vernis :<br> <strong><span class="varnish_cart">Dark Oak</span></strong></p><p class="qty">Quantité : <br><strong><span class="qty">2</span></strong></p><p class="price_total">Tarif : <br><strong><span class="price_total">1198.00</span>€</strong></p></div><div class="cart_buttons"><input class="cart_delete" type="button" value="Delete"></div></div>/div></div></div>;'
        //         document.getElementById('cart_list').appendChild(card);
        //     }
        let myCart = [];
        Object.keys(localStorage).forEach(function(key){
            console.log(localStorage.getItem(key));
            myCart.push(key);
            console.table(myCart)
            let card = document.createElement('div');
                card.className = "cart_card";
                card.innerHTML += '<img src="./images/oak_1.webp" alt="table_design_bois"><div class="product_infos"><div class="product_title"><h3 class="ttl">Cross Table</h3><p class="price_unit"><span class="price_unit">      599.00</span>€</p></div><div class="underline"></div><div class="card_bottom"><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nisi dolorum sapiente quo exercitationem, inventore cupiditate reiciendis numquam cum repellendus eveniet consequuntur voluptatibus obcaecati rem tenetur quos est deleniti. Quaerat?</p><div class="cart_modifications"><div class="product_numbers"><p class="varnish_cart">Vernis :<br> <strong><span class="varnish_cart_choosed">Dark Oak</span></strong></p><p class="qty">Quantité : <br><strong><span class="qty">2</span></strong></p><p class="price_total">Tarif : <br><strong><span class="price_total">1198.00</span>€</strong></p></div><div class="cart_buttons"><input class="cart_delete" type="button" value="Delete"></div></div><div class="underline"></div></div></div>'

                document.getElementById('cart_list').appendChild(card);
            
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

    
    
    
    

