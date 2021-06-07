    // Variables
    const nameDiv = document.getElementById('name'),
          descriptionDiv = document.getElementById('description'),
          priceDiv = document.getElementById('price'),
          photoDiv = document.getElementById('photo'),
          qtyDiv = document.getElementById('quantity'),
          varnishDiv = document.getElementById('optionv'),
          cartsDiv = document.getElementById('add_cart')
          priceSubttDiv = document.getElementById('price_subtt'),
          tvaDiv = document.getElementById('tva'),
          priceTtDiv = document.getElementById('total_price'),
          emptyBtnDiv = document.getElementById('empty_button'),
          updateBtnDiv = document.getElementsByClassName('cart_update');


    let ID = window.location.hash.substr(10);
    let logTest = "";
    let furniture = "";
    var vernis = "";
    let cartAlertDiv = document.getElementById('cart_alert');

    document.addEventListener('DOMContentLoaded',onLoadCartInitialization)

    fetch('http://localhost:3000/api/furniture')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => furniture = data)
    .then((furniture) => {
        console.table(furniture)
    })


    // Charge le script uniquement sur la page Article et lance la fonction de récupération de données API
    console.log(window.location.pathname)
        if(window.location.pathname === '/Sebastien_Proust_5_20052021/product.html')
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
                        console.log(furniture)
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

                cartsDiv.addEventListener('click', function() {
                    let selectedVarnish = varnishDiv.selectedOptions;
                    let localSelector = selectedVarnish[0].innerHTML;
                    let localArray = [];
                    let selection ={
                        Id: ID,
                        Name: nameDiv.textContent,
                        Description: descriptionDiv.textContent,
                        Photo: photoDiv.src,
                        Varnish: selectedVarnish[0].innerHTML,
                        Qty: parseInt(qtyDiv.value),
                        Price: parseInt((((furniture.price*(qtyDiv.value))/100).toFixed(2))),
                        
                    }
                    localArray.push(selection.Id, selection.Name, selection.Description, selection.Photo, selection.Varnish, selection.Qty, selection.Price);
                    console.log(selection)
                    console.log(typeof(selection.Price))
                    localStorage.setItem(ID+"_"+localSelector, JSON.stringify(localArray))

                    onLoadCartInitialization();
                    alert(selection.Qty + ' ' + selection.Name + ' ajouté à votre panier')
                })
        }

    // Charge le script uniquement sur la page Panier et lance la fonction de récupération de données en stockage loacale
    if(window.location.pathname === '/Sebastien_Proust_5_20052021/cart.html') {
        let myCart = [];
        
        Object.keys(localStorage).forEach(function(key){
            // console.log(localStorage.getItem(key));
            let cartArray = JSON.parse(localStorage.getItem(key));
            // console.table(test);
            myCart.push(cartArray);
            // console.table(myCart)
            let card = document.createElement('div');
                card.id = key;
                card.className = "cart_card";
                card.innerHTML += '<img src="'+cartArray[3]+'" alt="table_design_bois"><div class="product_infos"><div class="product_title"><h3 class="ttl">' + cartArray[1] + '</h3><p class="price_unit"><span class="price_unit">'+(cartArray[6]/cartArray[5]).toFixed(2) +'</span>€</p></div><div class="underline"></div><div class="card_bottom"><p>'+cartArray[2]+'</p><div class="cart_modifications"><div class="product_numbers"><p class="varnish_cart">Vernis :<br> <strong><span class="varnish_cart_choosed">'+cartArray[4]+'</span></strong></p><p class="qty">Quantité : <br><strong><span class="qty">'+cartArray[5]+'</span></strong></p><p class="price_total">Tarif : <br><strong><span class="price_total">'+cartArray[6]+'</span>€</strong></p></div><div class="cart_buttons"><input id="'+key+'"class="cart_delete" type="button" value="Retirer"></div></div><div class="underline"></div></div></div>'

                document.getElementById('cart_list').appendChild(card); 
        });

        let sumMyCart = (myCart) => {

            let newArray = [];
            myCart.forEach(sub => {
                sub.forEach((num, index) => {
                    if(newArray[index]) {
                        newArray[index] += num;
                    } else {
                        newArray[index] = num;
                    }
                });
            });
            return (newArray);
        };

        if(Object.keys(localStorage) === null){
           document.getElementById('cart_update').setAttribute('disabled', '');
        } else {
            let subtts = sumMyCart(myCart);

            priceSubttDiv.textContent = (subtts[6]).toFixed(2);
            tva.textContent = ((subtts[6]/120)*20).toFixed(2);
            priceTtDiv.textContent = (subtts[6]).toFixed(2); 

            document.getElementById('cart_update').addEventListener('click', function() {
                let form = document.createElement('div')
                form.className = 'forms';
                form.innerHTML = '<div class="underline"></div><form method="post" action="données" id="inscription"><div class="intro"><h2>Vos Coordonnées</h2><p>Attention, délais de livraison modifiés en raison des restrictions COVID19</p><br /></div><div class="shipment"><p><input type="text" name="firstname" id="firstname" placeholder="Prénom" pattern="[a-zA-Z].{4,}" title="Please insert at least 5 characters" required /><input type="text" name="lastname" id="lastname" placeholder="Nom" pattern="[a-zA-Z].{3,}" title="Please insert at least 3 characters" required /></p><p><input type="text" name="adresse" id="address" placeholder="adresse" required /></p><p><input type="text" name="cp" id="cp" placeholder="Code Postal." pattern="\{5,}" title="Please insert at least 5 numbers" minlength="5" required /><input type="text" name="city" id="city" placeholder="Ville." pattern="[a-zA-Z].{3,}" title="Please insert at least 3 characters" required /></p><p><input type="email" name="email" id="email" placeholder="Adresse e-mail (pour votre facture)" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/></p></div><input id="validate_order" class="cart_save" form="inscription" type="button" value="Valider"">';

            document.getElementById('total_area').parentNode.appendChild(form);

            validateBtn = document.getElementById('validate_order');

            validateBtn.addEventListener('click', function() {
                console.table(myCart);
                let contact = {
                    firstName: document.getElementById('firstname').value,
                    lastName: document.getElementById('lastname').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('cp').value + ' ' + document.getElementById('city').value,
                    email: document.getElementById('email').value,
                };
                console.log(contact)
                let products = myCart;
                products.toString();
                console.log(products);
    
                fetch('http://localhost:3000/api/furniture/order', {
                    method: 'POST',
                    body: JSON.stringify(contact),
                    body: JSON.stringify(products),
                    })
                    .then(res => res.json())
                    .then(data => console.table('Success:', data))
                    .catch(error => {
                    console.error('Error:', error);
                    });
                });        
                document.getElementById('cart_update').setAttribute('disabled', '')
            });
        };

        emptyBtnDiv.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
        });
    };



    // Permet d'afficher le nombre de produit ds le cart au chargement de la page
    function onLoadCartInitialization(){        
        let myCart = [];
        Object.keys(localStorage).forEach(function(key){
            let cartArray = JSON.parse(localStorage.getItem(key));
            myCart.push(cartArray);
        })
        let sumMyCart = (myCart) => {
            let newArray = [];
            myCart.forEach(sub => {
                sub.forEach((num, index) => {
                    if(newArray[index]) {
                        newArray[index] += num;
                    } else {
                        newArray[index] = num;
                    }
                });
            });
            return (newArray);
        }
        console.table(myCart);
        let cart = sumMyCart(myCart);
            cartAlertDiv.textContent = cart[5];
        }
    

    
    
    
    

