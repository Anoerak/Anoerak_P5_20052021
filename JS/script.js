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
          priceTtDiv = document.getElementsByClassName('total_price'),
          deleteBtnDiv = document.getElementsByClassName('cart_buttons'),
          emptyBtnDiv = document.getElementById('empty_button');


    let ID = window.location.hash.substr(10);
    let logTest = "";
    let furniture = "";
    var vernis = "";
    let cartAlertDiv = document.getElementById('cart_alert');

    document.addEventListener('DOMContentLoaded',onLoadCartInitialization)

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
                    alert('Produit ajouté à votre panier')
                })
        }

    // Charge le script uniquement sur la page Panier et lance la fonction de récupération de données en stockage loacale
    if(window.location.pathname === '/cart.html') {
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
                card.innerHTML += '<img src="'+cartArray[3]+'" alt="table_design_bois"><div class="product_infos"><div class="product_title"><h3 class="ttl">' + cartArray[1] + '</h3><p class="price_unit"><span class="price_unit">'+(cartArray[6]/cartArray[5]).toFixed(2) +'</span>€</p></div><div class="underline"></div><div class="card_bottom"><p>'+cartArray[2]+'</p><div class="cart_modifications"><div class="product_numbers"><p class="varnish_cart">Vernis :<br> <strong><span class="varnish_cart_choosed">'+cartArray[4]+'</span></strong></p><p class="qty">Quantité : <br><strong><span class="qty">'+cartArray[5]+'</span></strong></p><p class="price_total">Tarif : <br><strong><span class="price_total">'+cartArray[6]+'</span>€</strong></p></div><div class="cart_buttons"><input class="cart_delete" type="button" value="Retirer"></div></div><div class="underline"></div></div></div>'

                document.getElementById('cart_list').appendChild(card); 
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
        let subtts = sumMyCart(myCart);
        priceSubttDiv.textContent = (subtts[6]).toFixed(2);
        tva.textContent = ((subtts[6]/120)*20).toFixed(2);
        priceTtDiv.textContent = (subtts[6]).toFixed(2);

        emptyBtnDiv.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
        });

    }













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
        console.table(cart);
            cartAlertDiv.textContent = cart[5];
            console.log(cart[5])
            console.log(typeof(cartAlertDiv))
        }
    

    
    
    
    

