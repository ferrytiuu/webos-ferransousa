window.onload = function () {

    document.getElementById("afegirTasca").onclick = function () {
        let data = ""+document.getElementById("dataDia").value+"/"+document.getElementById("dataMes").value+"/"+document.getElementById("dataAny").value;
        let titol = document.getElementById("titol").value;
        let hora = ""+document.getElementById("hora").value+":"+document.getElementById("min").value+"";
        let descripcio = document.getElementById("descripcio").value;
        let estatTasca = document.getElementById('estatTasca').value;

        if(localStorage.getItem(data)==null){
            let tasques = JSON.stringify([{titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: 'no', correuMitja: 'no'}]);
            console.log(tasques);
            localStorage.setItem(data, tasques);
        }else{
            let tasques = JSON.parse(localStorage.getItem(data));
            console.log(tasques);
            tasques.push({titol: titol, hora:hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: 'no', correuMitja: 'no'});
            localStorage.setItem(data, JSON.stringify(tasques));
        }
        location.replace('index.html');
    }
}