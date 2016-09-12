(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();
var tabla=$("body > table:nth-child(8) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr  a")

var arrayIds=[];
var contador=0;
var arrayContent={};

tabla.each(function (e,i){
	var link=$(i).attr("href");
	var idficha=link.split("Id=")[1]
	if(!existe(idficha)){

	arrayIds.push(idficha); 

	arrayContent[contador]={};
	extractData(idficha,contador);
	contador++;
  	}
})
//console.log(arrayIds);

function existe(id){
	var retorno=false;
	for (var i = 0; i < arrayIds.length; i++) {
		

		if(arrayIds[i]==id){
			retorno=true;
		}
	}

	return retorno;
}

function extractData(id,contador){
	  $.ajax({
	  	url: "http://www.soloduenos.com/Ficha.asp?Tipo=2&Id=143409",//+id, 
	  	success: function(result){
	  		var result=result;
	  	var jsonhtml=$(result)


	  //	var data=mapDOM(result);
 		var primeraSeccion=jsonhtml.find('div[style*="margin-top:15px; margin-bottom:2px; box-shadow: 0px 1px 7px grey; height:28px; width:775px"]')
    	
    		var tipoAlquiler=primeraSeccion.find('div[style*="width:300PX; float:right; font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-size:13px; font-weight:bold; margin-top:5px; margin-right:10px"]');
    		var lugarAlquiler=primeraSeccion.find('div[style*="float:left; width:240PX; font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-size:13px; font-weight:bold; margin-top:5px; color:#AE000D"]');
        	arrayContent[contador]["tipoAlquiler"]=tipoAlquiler.text();
        	arrayContent[contador]["lugarAlquiler"]=lugarAlquiler.text();
 			var segundaSeccion=jsonhtml.find('div[style*="height:28px; box-shadow:0px 2px 7px grey; clear:both; width:775px; margin-bottom:5px"]')
        
    		var direccionAlquiler=segundaSeccion.find('div[style*="float:left; font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-size:13px; font-weight:bold; line-height:2.2; overflow:hidden; height:inherit; width:500px"]');
        	arrayContent[contador]["direccionAlquiler"]=direccionAlquiler.text();

        	arrayContent[contador]["imagenes"]=[];


 			$("<img src='"+"http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+1+"'>").load(function(){ 
 					arrayContent[contador]["imagenes"].push("http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+1);
 			});
 			
 			$("<img src='"+"http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+2+"'>").load(function(){ 
 					arrayContent[contador]["imagenes"].push("http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+2);
 				 });
 			
 			$("<img src='"+"http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+3+"'>").load(function(){ 
 					arrayContent[contador]["imagenes"].push("http://www.soloduenos.com/CargaImgNuevoSistema.asp?Id=143409&Campo=Foto"+3);
 				 });
 				

 			var contactoSeccion=jsonhtml.find('div[style*="float:left; width:270PX; margin-bottom:15px; margin-top:15PX; box-shadow: 1px 2px 10px grey"]')

 			var nombreContacto=contactoSeccion.find('div[style*="font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-weight:bold; font-size:13px; color:#AE000D; padding:5px; overflow:hidden"]');
        		arrayContent[contador]["nombreContacto"]=nombreContacto.text();
 			
 			var telefonoContacto=contactoSeccion.find('div[style*="font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-weight:bold; font-size:12px; padding-left:5px; padding-right:5px; overflow:hidden"]');
 			       
 					var telefonos=telefonoContacto.text().trim().split("/");
 			       arrayContent[contador]["telefonoContacto"]=telefonos;

 			var horarioContacto=contactoSeccion.find('div[style*="font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; font-weight:bold; font-size:12px; padding-left:5px; padding-right:5px; padding-bottom:5px; overflow:hidden"]');
 			       arrayContent[contador]["horarioContacto"]=horarioContacto.text();


 		var seccionFicha=jsonhtml.find('div[style*="background-color:#AE000D; font-family:Segoe, \'Segoe UI\', \'DejaVu Sans\', \'Trebuchet MS\', Verdana, sans-serif; color:#FFFFFF; font-weight:bold; font-size:13px; width:735PX;"]').parent().parent().parent().parent();
 		
 		 var valoresTotal=[];

 		var contadors=1;
 		seccionFicha.find("tr  table").each(function (e,interiorTable){
 			var ints =$(interiorTable).find("tr")
 			var valoresDesc=[];

 			ints.each(function(es,tr){
   				 var arrayInterno={};

 				$(tr).find("td").each(function(o,td){
 						arrayInterno[contadors]=$(td);
 					if((contadors%2)==0){
	 						var conimagen=$(arrayInterno[2]).find("img");
	 						if(conimagen.length==1){
	 							var imagenCheck=$(arrayInterno[2]).find("img");
	 							 arrayInterno[2]=$(imagenCheck).attr("src");
	 						}else{
	 							arrayInterno[2]=$(arrayInterno[2]).text().replace('↵','');
	 						}
	 						arrayInterno[1]=$(arrayInterno[1]).text().replace(/\t/g, '');
	 						console.log(arrayInterno);
 	 						if(arrayInterno.length!=0){

	 							valoresDesc.push(arrayInterno);
	 						}
	 						arrayInterno={};
	 						contadors=0;
 							
 					}
 					contadors++
 				}); 
 				//console.log(valoresDesc);
 			});

 			if(valoresDesc.length!=0)
 			{
 			valoresTotal.push(valoresDesc);

 			}
  		})
 arrayContent[contador]["caracteristicas"]=valoresTotal;

    }});
}
