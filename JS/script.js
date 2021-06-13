    // Variables.
    const ID = window.location.hash.substr(10),
          indexUrl = ('http://localhost:3000/api/furniture'),
          productsUrl = ('http://localhost:3000/api/furniture'+'/'+ID),
          nameDiv = document.getElementById('name'),
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

    let furniture = "";
    var vernis = "";
    let cartAlertDiv = document.getElementById('cart_alert');
    let url = (window.location.pathname);

    // Charge le script uniquement sur la page index et lance la fonction de récupération des données du panier.
    if((url.substr(-11)) === '/index.html'){
        document.addEventListener('DOMContentLoaded',onLoadCartInitialization),
        document.addEventListener('DOMContentLoaded',article);

    let collection = [];

    // Va récupérer les données de l'API, les convertir et les placer ds le DOM de l'index.
    fetch(indexUrl)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => collection = data)
                .then(function(){
                    Object.keys(collection).forEach(function(key){
                        let myCart = [];
                        let cartArray = collection[key];
                        myCart.push(cartArray);
                        let card = document.createElement('a');
                            card.href = './product.html#home?_id='+ cartArray._id;
                            card.className = "card";
                            card.innerHTML += '<img src="'+ cartArray.imageUrl+'" alt="table_pied_croix_bois_clair"><h4>'+cartArray.name+'</h4><p>Consulter la fiche</p>'
                            document.getElementById('store').appendChild(card); 
                    });
                })
    } else {
    };

    // Charge le script uniquement sur la page Article et lance la fonction de récupération de données API.
    if((url.substr(-13)) === '/product.html'){
            document.addEventListener('DOMContentLoaded',article),
            document.addEventListener('DOMContentLoaded',onLoadCartInitialization),
            //Fonction d'ajustement du prix d'affichage sur la base de la quantité sélectionnée.
            qtyDiv.addEventListener('input', function(){
                priceDiv.innerHTML = (((furniture.price*(qtyDiv.value))/100).toFixed(2))+"€";
            });

    // Va récupérer les données de l'API, les convertir et les placer ds le DOM.
        function article(){
            fetch(productsUrl)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => furniture = data)
                .then (furniture => vernis = furniture.varnish)
    //Récupère les données API et implémente le DOM de la fiche produit.
                .then(function() {
                    if((url.substr(-13)) === '/product.html'){
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
                    }
                })
                .catch(function(err) {
                    console.log(error)
                })
            };
    //Lors de la sélection de l'article, récupère les données des champs du DOM pour créer un tableau dans le stockage local.
            cartsDiv.addEventListener('click', function() {
                if(parseInt(qtyDiv.value) === 0){
                    alert('Merci de sélectionner une quantité')
                } else if(varnishDiv.value === 'empty') {
                    alert('Merci de sélectionner un vernis')
                } else {
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
    //Ajoute une ligne spécifique au produit/vernis ou écrase la quantité si déjà existant.
                localArray.push(selection.Id, selection.Name, selection.Description, selection.Photo, selection.Varnish, selection.Qty, selection.Price);
                localStorage.setItem(ID+"_"+localSelector, JSON.stringify(localArray))
    //Message de confirmation de l'ajout au panier.
                onLoadCartInitialization();
                alert(selection.Qty + ' ' + selection.Name + ' ' + selection.Varnish + ' ajouté à votre panier')
            }})
    } else {};

    // Charge le script uniquement sur la page Panier et lance la fonction de récupération de données en stockage locale.
    if((url.substr(-10)) === '/cart.html') {
        let myCart = [];
        document.addEventListener('DOMContentLoaded',onLoadCartInitialization);

    //Charge le panier dans le stockage local et implémente le DOM pour chaque ligne produit.
        Object.keys(localStorage).forEach(function(key){
            let cartArray = JSON.parse(localStorage.getItem(key));
            myCart.push(cartArray);
            let card = document.createElement('div');
                card.id = key;
                card.className = "cart_card";
                card.innerHTML += '<img src="'+cartArray[3]+'" alt="table_design_bois"><div class="product_infos"><div class="product_title"><h3 class="ttl">' + cartArray[1] + '</h3><p class="price_unit"><span class="price_unit">'+(cartArray[6]/cartArray[5]).toFixed(2) +'</span>€</p></div><div class="underline"></div><div class="card_bottom"><p>'+cartArray[2]+'</p><div class="cart_modifications"><div class="product_numbers"><p class="varnish_cart">Vernis :<br> <strong><span class="varnish_cart_choosed">'+cartArray[4]+'</span></strong></p><p class="qty">Quantité : <br><strong><span class="qty">'+cartArray[5]+'</span></strong></p><p class="price_total">Tarif : <br><strong><span class="price_total">'+cartArray[6]+'</span>€</strong></p></div><div class="cart_buttons"><input id="'+key+'"class="cart_delete" type="button" value="Annuler"></div></div><div class="underline"></div></div></div>'
                document.getElementById('cart_list').appendChild(card); 
        });

    //Activation du bouton d'affichage du formulaire et du formulaire
        if(Object.keys(localStorage).length === 0){
           document.getElementById('cart_update').disabled = true;
        } else {
            document.getElementById('cart_update').disabled = false;
            document.getElementById('cart_update').addEventListener('click', function() {
                let form = document.createElement('div')
                form.className = 'forms';
                form.innerHTML = '<div class="underline"></div><form method="post" action="./confirmation.html" id="inscription"><div class="intro"><h2>Vos Coordonnées</h2><p>Attention, délais de livraison modifiés en raison des restrictions COVID19</p><br /></div><div class="shipment"><p><input type="text" name="firstname" id="firstname" placeholder="Prénom" pattern="[a-zA-Z].{3,}" title="Please insert at least 4 characters" required /><input type="text" name="lastname" id="lastname" placeholder="Nom" pattern="[a-zA-Z].{2,}" title="Please insert at least 3 characters" required /></p><p><input type="text" name="adresse" id="address" placeholder="adresse" required /></p><p><input type="text" name="cp" id="cp" placeholder="Code Postal." pattern="[0-9].{4,}" title="Please insert at least 5 numbers" minlength="4" required /><input type="text" name="city" id="city" placeholder="Ville." pattern="[a-zA-Z].{3,}" title="Please insert at least 3 characters" required /></p><p><input type="email" name="email" id="email" placeholder="Adresse e-mail (pour votre facture)" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/></p></div><input id="validate_order" class="cart_save" form="inscription" type="submit" value="Valider">';

            document.getElementById('total_area').parentNode.appendChild(form);

            validateBtn = document.getElementById('validate_order');
            let forms = document.getElementById('inscription');
            let check = document.getElementById('email');

            if(forms.reportValidity() != true){
                validateBtn.setAttribute('disabled', '')
            }else{
            }
            document.getElementById('email').addEventListener('input', function(){
                if(forms.reportValidity() == true){
                    validateBtn.disabled = false;
                }else{
                }
            });

    //Evènement sur bouton VALIDER pour récupération des éléments du formulaire et POST vers API
            validateBtn.addEventListener('click', function() {
                let contact = {
                    firstName: document.getElementById('firstname').value,
                    lastName: document.getElementById('lastname').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('cp').value + ' ' + document.getElementById('city').value,
                    email: document.getElementById('email').value,
                };

    //Fonction d'extraction des products_id du panier
                function getCol(matrix, col){
                    var column = [];
                    for(var i=0; i<matrix.length; i++){
                        column.push(matrix[i][col]);
                    }
                    return column;
                }
                let products = getCol(myCart, 0);

    //Mise en forme et envois des éléments vers l'API
                let data = JSON.stringify({contact, products});
    
                fetch('http://localhost:3000/api/furniture/order', {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json"
                      },
                    mode: "cors",
                    body: data
                    })
                    .then(function (response) {
                        return response.json()
                        })
                    .then(function (r) {
                        localStorage.setItem("contact", JSON.stringify(r.contact));
                        localStorage.setItem("orderId", JSON.stringify(r.orderId));
                        localStorage.setItem("Amout", JSON.stringify(priceTtDiv.textContent));
                        window.location.href=("./confirmation.html");
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });        
                document.getElementById('cart_update').setAttribute('disabled', '')
            });
        };
    //Evènement + fonction pour vider le panier
    removeBtnDiv = document.querySelectorAll('.cart_delete');

    removeBtnDiv.forEach(id => id.addEventListener('click', event => {
        localStorage.removeItem(event.target.getAttribute("id"));
        location.reload();
    }));

    //Evènement + fonction pour vider le panier
        emptyBtnDiv.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
        });
    } else {

    };

    // Charge le script uniquement sur la page Confirmation, personnalise le message et vide le stockage local et renvoie vers l'acceuil.
    if((url.substr(-18)) === '/confirmation.html') {
        let contact = JSON.parse(localStorage.getItem('contact'));
        document.getElementById('customer').innerHTML = contact.firstName;
        document.getElementById('order_nb').innerHTML = localStorage.getItem('orderId');
        document.getElementById('montant').innerHTML = localStorage.getItem('Amout');

        document.getElementById('close_order').addEventListener('click', function() {
            if(localStorage) { 
                localStorage.clear()             
            } else {
                alert("Sorry, no local storage."); 
            }
            
            window.location.href=('./index.html');
        })
        } else {
        };

    // Permet d'afficher le nombre de produit ds le cart au chargement de la page
    function onLoadCartInitialization(){        
        let myCart = [];
        if(Object.keys(localStorage) === null){
            document.getElementById('cart_update').setAttribute('disabled', '');
        }   else {
                Object.keys(localStorage).forEach(function(key){
                    let cartArray = JSON.parse(localStorage.getItem(key));
                        myCart.push(cartArray);
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
                }
            let cart = sumMyCart(myCart);

            cartAlertDiv.textContent = cart[5];

            if((url.substr(-10)) === '/cart.html') {
                priceSubttDiv.textContent = (cart[6]).toFixed(2);
                tva.textContent = ((cart[6]/120)*20).toFixed(2);
                priceTtDiv.textContent = (cart[6]).toFixed(2); 
            } else {

            }
         }
        }
    

    
    
    
    

