
var botao = document.querySelector("#adicionar-endereco");

botao.addEventListener("click", chamarApiComParametros);



function chamarApiComParametros (){
    event.preventDefault();
    var form = document.querySelector("#conteudo-form");
    var input = form.CEPdestino.value;
    var origin2 = form.CEP.value;
    var destinationA = input;

  var dinheiro = form.dinheiro.value;
    googleMatrixAPI(destinationA, origin2, dinheiro);
    
}


function googleMatrixAPI(destinationA, origin2, dinheiro){
 
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [ origin2],
            destinations: [destinationA],
            travelMode: 'DRIVING'
            
        }, callback);

        function callback(response, status) {
          if (status == 'OK') {
          
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;
          
              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  var distance = element.distance.value;
                  var duration = element.duration.text;
                  var from = origins[i];
                  var to = destinations[j];
        
                console.log(distance);
                console.log(from);
                console.log(to);
                console.log(dinheiro)
                  adicionarFormulario(from, to, calcular(distance, dinheiro));
                  
                }
              }
             }
        }
}




function calcular(distance, dinheiro){
 
  var km = distance / 1000;
  var total = km.toFixed(2) * dinheiro; 
  
  return total;
}
