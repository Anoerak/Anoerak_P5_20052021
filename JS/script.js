if(window.location.pathname == '/product.html') {
        document.addEventListener('DOMContentLoaded',article),
        document.getElementById('quantity').addEventListener('input', article);
        var ID = window.location.hash.substr(10);
        console.log(ID); 
        function article(){
            fetch('http://localhost:3000/api/furniture'+'/'+ID)
              .then(function(res) {
               if (res.ok) {
                 return res.json();
               }
             })
             .then(function(value) {
             console.log(value);
             document.getElementById('name').innerHTML = value.name;
             document.getElementById('description').innerHTML = value.description;
             document.getElementById('price').innerHTML = (((value.price*(document.getElementById('quantity').value))/100).toFixed(2))+"€";
             document.getElementById('photo').src=value.imageUrl;
             document.getElementById('optionv').innerHTML = value.varnish[document.getElementById('optionv').value];
             })
             .catch(function(err) {
               // Une erreur est survenue
             })};              
    }
    else{

    };


