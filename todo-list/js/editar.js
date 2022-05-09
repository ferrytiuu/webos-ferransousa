window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const data = urlParams.get('data');
    const posicio = urlParams.get('posicio');

    var tasques = JSON.parse(localStorage.getItem(data));

    var estatTascaSelect = document.getElementById('estatTascaModificar');

    document.getElementById('dataDiaModificar').value = data.substring(0, data.indexOf('/'));
    document.getElementById('minModificar').value = tasques[posicio].hora.substring(tasques[posicio].hora.indexOf(':') + 1);
    document.getElementById('horaModificar').value = tasques[posicio].hora.substring(0, tasques[posicio].hora.indexOf(':'));
    document.getElementById('titolModificar').value = tasques[posicio].titol;
    document.getElementById('descripcioModificar').value = tasques[posicio].descripcio;

    if (tasques[posicio].estatTasca == 'acabada') {
        estatTascaSelect.selectedIndex = "1";
    } else {
        estatTascaSelect.selectedIndex = "0";
    }

    document.getElementById("modificarTasca").onclick = function () {
        let data2 = "" + document.getElementById("dataDiaModificar").value + "/" + document.getElementById("dataMesModificar").value + "/" + document.getElementById("dataAnyModificar").value;
        let titol = document.getElementById("titolModificar").value;
        let hora = "" + document.getElementById("horaModificar").value + ":" + document.getElementById("minModificar").value + "";
        let descripcio = document.getElementById("descripcioModificar").value;
        let estatTasca = document.getElementById('estatTascaModificar').value;
        tasques.splice(posicio, 1);
        localStorage.removeItem(data);
        tasques.push({ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca });
        console.log(tasques);
        localStorage.setItem(data2, JSON.stringify(tasques));
        location.replace('index.html');
    }

    document.getElementById("esborrarTasca").onclick = function () {
        tasques.splice(posicio, 1);
        localStorage.removeItem(data);
        localStorage.setItem(data, JSON.stringify(tasques));
        location.replace('index.html');
    }

}