
//Page Javascript qui va definir en details tout le contenu de notre page avec les liens vers les sources


// Initiation des variables
var map;  //Carte 1
var map2;  //Carte 2
var rect1;  //Premier rectangle qui apparaît sur la carte 2, définissant les limites de la carte 1
var rect1_bis;  //Deuxième rectangle qui apparaît sur la carte 2, définissant les limites de la carte 1
var rect2;  //Premier rectangle qui apparaît sur la carte 1, définissant les limites de la carte 2
var rect2_bis;  //Deuxième rectangle qui apparaît sur la carte 1, définissant les limites de la carte 2
var scale1;   //Barre d'échelle de la première carte
var scale2;   //Barre d'échelle de la deuxième carte
//Il y a deux rectangles sur chaque carte car sinon l'affichage ne serait pas correct en passant par le méridien


window.onload = function() {  //Au chargement de la page, la fonction affiche les deux cartes
  //Fonction pour afficher la carte 1
  function showMap() {
    map = createMap(); //Création de la carte 1

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);        //Appel au fond de carte par default OpenStreetMap pour la carte 1  

    scale1 = L.control.scale();   //Création de la barre d'échelle
    scale1.addTo(map);   //Ajout de la barre d'échelle sur la carte 1

    var zoom_bar = new  L.Control.ZoomBar({position: 'topright'}).addTo(map);   //Creation du controle du zoom pour la carte 1

    
    L.control.pan({position: 'topright'}).addTo(map);     //Création des fléches de deplacement et ajout sur la carte 1

  }

  //Fonction pour créer la carte 1
  function createMap() {
    map = L.map('map1', {
      center: [48.864716, 2.349014], //Définir le point central de vue à la création , ici un point dans PARIS
      zoom: 4 ,//Définir le niveau de zoom pa rdeault de la carte
      zoomControl: false  //ENleve le zoom controle de leaflet par default
    });
    rect2 = new L.rectangle(map.getBounds(), {color: 'red', weight: 1,"fillOpacity": 0});  //Définit le premier rectangle définissant les limites de la carte 2
    rect2.addTo(map); //Ajout de ce rectangle sur la carte 1

// =============================================================================

    var myStyle = { //Création du style pour l'image antipodale
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.15
    };

    fetch('ContourMondeAntipode.geojson') // Ajout de l'image antipodale à la carte 1 
    .then(result => result.json())
    .then(result =>{ 
      

      L.geoJSON(result,{style: myStyle }).addTo(map);

    }
      
      )

// =============================================================================

    return map; //Renvoie la carte 1
  }

  //Fonction pour afficher la carte 2
  function showMap2() {
    map2 = createMap2(); //Création de la carte 2

    scale2 = L.control.scale();   //Création de la barre d'échelle
    scale2.addTo(map2);   //Ajout de la barre d'échelle sur la carte 2

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map2); //Appel au fond de carte par default OpenStreetMap pour la carte 1  

      var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map2); //Creation du controle de zoom sur la carte 2

    
      L.control.pan({position: 'topright'}).addTo(map2);  //Creation des flêches de deplacement pour la carte 2


  }

  //Fonction pour créer la carte 2
  function createMap2() {
    map2 = L.map('map2', {
      center: [-48.864716, 177.650986], //Définir le point central de vue à la création (l'antipode du point central de la carte 1)
      zoomControl: false, //Desactive le zoom controle par default de leaflet pour la carte 2
      zoom: 4 //Niveau de zoom par default de la carte 2
    });
    rect1 = new L.rectangle(map2.getBounds(), {color: "#07249f", weight: 1,"fillOpacity": 0});  //Définit le premier rectangle définissant les limites de la carte 1
    rect1.addTo(map2); //Ajout de ce rectangle sur la carte 2

// =============================================================================

    var myStyle = { //Création du style pour l'image antipodale
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.15
    };

    fetch('ContourMondeAntipode.geojson') // Ajout de l'image antipodale à la carte 2
    .then(result => result.json())
    .then(result =>{
      
     L.geoJSON(result,{style: myStyle }).addTo(map2);



})

// =============================================================================

    return map2; //Renvoie la carte 2
  }

  function addLayerControl(mappy) { //Ajout des types de couches qui peuvent être affichées pour nos cartes 
    L.control.layers({
      'OSM':  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),

      'Street' :L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }),
      'Satellite': L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }),


      'Hybrid': L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }),

'Terrain' : L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
}),

'Dark' :L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

,

"Light" : L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})


    }, {}, { position: 'topleft'}).addTo(mappy);  //Ajout du bouton de sélection en haut à gauche de la carte
  }

  showMap(); //Afficher la carte 1
  showMap2(); //Afficher la carte 2

  addLayerControl(map);  // Ajout des differents fond de carte possible pour la carte 1
  addLayerControl(map2);  // Ajout des differents fond de carte possible pour la carte 2


  function newViewMap2(){ //Définir une nouvelle vue pour la carte 2
  
    scale1.remove();
    scale1.addTo(map);
    var NewMapCenter = map.getCenter(); //Récupérer les coordonnées du centre de la carte 1
    var lat =  NewMapCenter.lat; //Latitude de ce centre
    var lng = NewMapCenter.lng; //Longitude de ce centre
    var latAnti = lat*(-1); //Latitude de l'antipode de ce centre
    if (lng>=0) {
      lngAnti = lng-180; //Longitude de l'antipode de ce centre si la longitude est >=0
    }
    else {
      lngAnti = lng+180; //Longitude de l'antipode de ce centre si la longitude est <0
    }
    map2.panTo(L.latLng(latAnti, lngAnti)); //Ajuster l'emprise de la carte 2 sur l'antipode du centre de la carte 1
    adjustBounds();//Ajuster les limites des rectangles affichés
  }

  function newViewMap(){ //Définir une nouvelle vue pour la carte 1 (pareil que la fonction précédente)
    scale2.remove();
    scale2.addTo(map2);
    var NewMapCenter = map2.getCenter(); //Récupérer les coordonnées du centre de la carte 2
    var lat =  NewMapCenter.lat; //Latitude de ce centre
    var lng = NewMapCenter.lng; //Longitude de ce centre
    var latAnti = lat*(-1); //Latitude de l'antipode de ce centre
    if (lng>=0) {
      lngAnti = lng-180; //Longitude de l'antipode de ce centre si la longitude est >=0
    }
    else {
      lngAnti = lng+180; //Longitude de l'antipode de ce centre si la longitude est <0
    }
    map.panTo(L.latLng(latAnti, lngAnti)); //Ajuster l'emprise de la carte 1 sur l'antipode du centre de la carte 2
    adjustBounds();
  }

  //Fonction qui actualiste la carte 2 en supprimer tous les rectangles antérieurs et en définissant une nouvelle vue pour la carte 2
  function adjustMap2(){
    supprRect();
    newViewMap2();

  }

  //Fonction qui actualiste la carte 1 en supprimer tous les rectangles antérieurs et en définissant une nouvelle vue pour la carte 1
  function adjustMap(){
    supprRect();
    newViewMap();

  }

//Actualisation des cartes lors de differentes evenement zoom ou de deplacement


  map.on('drag',function dragMap(){ //Event listener lorsque l'on traîne la carte 1 avec la souris
    map.on('moveEnd',adjustMap2()); //Lorsque la carte 1 bouge, actualiser la carte 2
    map.off('moveEnd',adjustMap2()); //Removes previously added listener function

  })


  map.on('zoom',function zoomMap(){ //Event listener lorsque l'on zoom sur la carte 1
    map.on('moveEnd',adjustMap2()); //Lorsque la carte 1 bouge, actualiser la carte 2
    map.off('moveEnd',adjustMap2()); //Removes previously added listener function

  })


  map2.on('drag',function dragMap2(){ //Event listener lorsque l'on traîne la carte 2 avec la souris
    map2.on('moveEnd',adjustMap()); //Lorsque la carte 2 bouge, actualiser la carte 1
    map2.off('moveEnd',adjustMap()); //Removes previously added listener function
  })

  map2.on('zoom',function zoomMap2(){ //Event listener lorsque l'on zoom sur la carte 2
    map2.on('moveEnd',adjustMap()); //Lorsque la carte 1 bouge, actualiser la carte 2
    map2.off('moveEnd',adjustMap()); //Removes previously added listener function
  })


//Fonction qui supprimes tous les rectangles sur les deux cartes
  function supprRect(){
    map.removeLayer(rect2); //Supprime le rectangle 2

    
    if(rect2_bis != undefined){
    if (map.hasLayer(rect2_bis)){
      map.removeLayer(rect2_bis); //Supprime le rectangle 2bis s'il existe
    };
  
  }
    map2.removeLayer(rect1); //Supprime le rectangle 1

    if(rect1_bis != undefined){
    if (map2.hasLayer(rect1_bis)){
      map2.removeLayer(rect1_bis); //Supprime le rectangle 1bis s'il existe
    }}
  }

//Fonction qui ajuste l'emprise des rectangles
  function adjustBounds(){
    zoom1 = map.getZoom();
    zoom2 = map2.getZoom();
    if (zoom1>zoom2){ //si l'échelle de la carte 1 est plus grande, i.e. on voit moins de choses sur la carte 1
      var bounds = map.getBounds();
      var lat1 = bounds._northEast.lat;
      var lng1 = bounds._northEast.lng;
      var lat2 = bounds._southWest.lat;
      var lng2 = bounds._southWest.lng;
      newBounds = [[-lat2,lng2+180],[-lat1,lng1+180]];
      newBounds2 = [[-lat2,lng2-180],[-lat1,lng1-180]];
      rect1 =  new L.rectangle(newBounds, {color: 'red', weight: 1,"fillOpacity": 0});
      rect1_bis =  new L.rectangle(newBounds2, {color: 'red', weight: 1,"fillOpacity": 0});
      map2.addLayer(rect1);
      map2.addLayer(rect1_bis);
    }
    else { //si l'échelle de la carte 2 est plus grande, i.e. on voit moins de choses sur la carte 2
      var bounds = map2.getBounds();
      var lat1 = bounds._northEast.lat;
      var lng1 = bounds._northEast.lng;
      var lat2 = bounds._southWest.lat;
      var lng2 = bounds._southWest.lng;
      newBounds = [[-lat2,lng2-180],[-lat1,lng1-180]];
      newBounds2 = [[-lat2,lng2+180],[-lat1,lng1+180]];
      rect2 =  new L.rectangle(newBounds, {color: 'red', weight: 1,"fillOpacity": 0});
      rect2_bis = new L.rectangle(newBounds2, {color: 'red', weight: 1,"fillOpacity": 0});
      map.addLayer(rect2);
      map.addLayer(rect2_bis);
    }
  }


//Actualisation de nos cartes lors de differentes evenement de la souris

  map.on('click',onMapClick);  //Actualisation lors d'un click de souris sur la carte 1
  map2.on('click',onMapClick); //Actualisation lors d'un click de souris sur la carte 2

  map.on('mouseup',onMapClick);
  map2.on('mouseup',onMapClick);


function onMapClick(e) {

      adjustMap();
      adjustMap2();

  } 



//////////////////////////////////////////////////////////////////////////// 
//Ajout d'une fonctionnalité avec des marqueurs pour savoir où on clique et quel est l'antipode du lieu cliquer

//Les marqueurs sont intégrée dans un Layer pour les enlever les larqueurs existants à chaque nouveau clique
lgMarkers = new L.LayerGroup();
map.addLayer(lgMarkers);

lgMarkers2 = new L.LayerGroup();
map2.addLayer(lgMarkers2);

//Evenement lorque l'on clique sur la carte
map.on('click',lieu_clicker)

map2.on('click',lieu_clicker2)

//Fonction quand on clique sur la carte 1
function lieu_clicker(e){
  //Enleve marqueurs déjà existant
  lgMarkers.clearLayers();
  lgMarkers2.clearLayers();

  //Prend la position on longitude et en latitude du point cliqué
  position =e.latlng
  marqueur= L.marker(position)
  marqueur.addTo(lgMarkers)

  var latAnti = e.latlng.lat*(-1); //Latitude de l'antipode de ce centre
  if (e.latlng.lng>=0) {
    lngAnti = e.latlng.lng-180; //Longitude de l'antipode 
  }
  else {
    lngAnti = e.latlng.lng+180; //Longitude de l'antipode
  }

  //Marqueur sur la deuxieme carte
  position2=[latAnti,lngAnti]
  marqueur2= L.marker(position2)
  marqueur2.addTo(lgMarkers2)


//Requete Ajax Jquery sur l'API de google permettant d'avoir des informations sur un lieu selon la longitude et la latitude de la premiere carte
//API KEY =AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg 
  $.ajax({ url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+e.latlng.lat+','+e.latlng.lng+'&key=AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg&sensor=true',
           success: function(data){
               popup=''
               for (i=3;i<data.results[0].address_components.length;i++){
                popup=popup+' '+data.results[0].address_components[i].long_name

               }

               marqueur.bindPopup(popup)

           }
  });

//Requete Ajax Jquery sur l'API de google permettant d'avoir des informations sur un lieu selon la longitude et la latitude du point antipode
//API KEY =AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg 
  $.ajax({ url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latAnti+','+lngAnti+'&key=AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg&sensor=true',
           success: function(data){
               popup=''
               for (i=3;i<data.results[0].address_components.length;i++){
                popup=popup+' '+data.results[0].address_components[i].long_name

               }



               marqueur2.bindPopup(popup)

           }
  });


}

//Fonction quand on clique sur la carte 2 même que la prmeiere fonction en adaptant le placement des marqueurs sur chacune des cartes
function lieu_clicker2(e){
  lgMarkers.clearLayers();
  lgMarkers2.clearLayers();

  position =e.latlng
  marqueur= L.marker(position)
  marqueur.addTo(lgMarkers2)

  var latAnti = e.latlng.lat*(-1); //Latitude de l'antipode de ce centre
  if (e.latlng.lng>=0) {
    lngAnti = e.latlng.lng-180; //Longitude de l'antipode de ce centre si la longitude est >=0
  }
  else {
    lngAnti = e.latlng.lng+180; //Longitude de l'antipode de ce centre si la longitude est <0
  }

  position2=[latAnti,lngAnti]
  marqueur2= L.marker(position2)
  marqueur2.addTo(lgMarkers)



  $.ajax({ url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+e.latlng.lat+','+e.latlng.lng+'&key=AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg&sensor=true',
           success: function(data){
               popup=''
               for (i=3;i<data.results[0].address_components.length;i++){
                popup=popup+' '+data.results[0].address_components[i].long_name

               }



               marqueur.bindPopup(popup)


           }
  });


  $.ajax({ url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latAnti+','+lngAnti+'&key=AIzaSyBRR1tCxqn8PJqtDX1e0mE7myYgY8e8-Jg&sensor=true',
           success: function(data){
               popup=''
               for (i=3;i<data.results[0].address_components.length;i++){
                popup=popup+' '+data.results[0].address_components[i].long_name

               }

               marqueur2.bindPopup(popup)

           }
  });


}



//Option pour enlever les marqueurs existants si on double clique sur la carte
map.on('dblclick',function(e){

  lgMarkers.clearLayers();
  lgMarkers2.clearLayers();

})

map2.on('dblclick',function(e){

  lgMarkers.clearLayers();
  lgMarkers2.clearLayers();

})



}
// Fin du javascript 
