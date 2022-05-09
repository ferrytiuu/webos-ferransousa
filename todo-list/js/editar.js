window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const data = urlParams.get('data');
    const posicio = urlParams.get('posicio');

    var tasques = JSON.parse(localStorage.getItem(data));

    var estatTascaSelect = document.getElementById('estatTasca');

    let data2 = "" + document.getElementById("dataDia").value + "/" + document.getElementById("dataMes").value + "/" + document.getElementById("dataAny").value;
    let titol = document.getElementById("titol").value;
    let hora = "" + document.getElementById("hora").value + ":" + document.getElementById("min").value + "";
    let descripcio = document.getElementById("descripcio").value;
    let estatTasca = document.getElementById('estatTasca').value;

    document.getElementById('dataDia').value = data.substring(0, data.indexOf('/'));
    document.getElementById('min').value = tasques[posicio].hora.substring(tasques[posicio].hora.indexOf(':') + 1);
    document.getElementById('hora').value = tasques[posicio].hora.substring(0, tasques[posicio].hora.indexOf(':'));
    document.getElementById('titol').value = tasques[posicio].titol;
    document.getElementById('descripcio').value = tasques[posicio].descripcio;

    if (tasques[posicio].estatTasca == 'acabada') {
        estatTascaSelect.selectedIndex = "1";
    } else {
        estatTascaSelect.selectedIndex = "0";
    }

    document.getElementById("modificarTasca").onclick = function () {
        // tasques.splice(posicio, 1);
        // localStorage.removeItem(data);
        // tasques.push({ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca });
        // localStorage.setItem(data, JSON.stringify(tasques));
        // location.replace('index.html');
    }

    document.getElementById("esborrarTasca").onclick = function () {
        tasques.splice(posicio, 1);
        localStorage.removeItem(data);
        localStorage.setItem(data, JSON.stringify(tasques));
        location.replace('index.html');
    }

}