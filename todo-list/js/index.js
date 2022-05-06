window.onload = function () {

    document.getElementById("afegirTasca").onclick = function () {
        let data = ""+document.getElementById("dataDia").value+"/"+document.getElementById("dataMes").value+"/"+document.getElementById("dataAny").value;
        let titol = document.getElementById("titol").value;
        let hora = ""+document.getElementById("hora").value+":"+document.getElementById("min").value+"";
        let descripcio = document.getElementById("descripcio").value;

        if(localStorage.getItem(data)==null){
            let tasques = JSON.stringify([{titol: titol, hora: hora, descripcio: descripcio}]);
            console.log(tasques);
            localStorage.setItem(data, tasques);
        }else{
            let tasques = JSON.parse(localStorage.getItem(data));
            console.log(tasques);
            tasques.push({titol: titol, hora:hora, descripcio: descripcio});
            localStorage.setItem(data, JSON.stringify(tasques));
        }
        location.replace('index.html');
    }

    document.getElementById("buscarPerDia").onclick = function () {
        let data = ""+document.getElementById('dataBuscarDia').value+"/"+document.getElementById('dataBuscarMes').value+"/"+document.getElementById('dataBuscarAny').value;
        let tasques = JSON.parse(localStorage.getItem(data));
        if(tasques!=null){
            let html = "";
            for(let i=0; i<tasques.length; i++){
                html += "<li>"+tasques[i].titol+" / "+tasques[i].hora+" / "+tasques[i].descripcio+"</li>";
            }
            document.getElementById("tasques").innerHTML = html;
        }
    }

}