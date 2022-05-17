/* Espera a carregar tota la pàgina per iniciar el script. */
window.onload = function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const data = urlParams.get('data');

    document.getElementById('dataDia').value = data.substring(0, data.indexOf('/'));

    /**
     * Quan l'usuari prem la tecla 13 (enter) o 406 (botó blau del mando) enregistrarà la tasca.
     * Enregistra el dia, hora, títol, descripció, i l'estat d'aquesta.
     * També guarda si ha estat enviat un correu electrònic de notificació, que per defecte és 'no'.
     * @param inEvent - Hola
     */
    window.addEventListener("keydown", function (inEvent) {
        if (window.event) {
            keycode = inEvent.keyCode;
        }
        guardar: if (keycode == 13 || keycode == 406) {
            if(document.getElementById('dataDia').value == '' || document.getElementById('titol').value == '' || document.getElementById('descripcio').value == '' || document.getElementById('hora').value == '' || document.getElementById('min').value == ''){
                alert('Omple tots els camps');
                break guardar;
            }
            let data = "" + document.getElementById("dataDia").value + "/" + document.getElementById("dataMes").value + "/" + document.getElementById("dataAny").value;
            let titol = document.getElementById("titol").value;
            let hora = "" + document.getElementById("hora").value + ":" + document.getElementById("min").value + "";
            let descripcio = document.getElementById("descripcio").value;
            let estatTasca = document.querySelector('input[name="estatTasca"]:checked').value;

            let tasca = new Tasca(titol, hora, descripcio, estatTasca, 'no', 'no');

            if (localStorage.getItem(data) == null) {
                let tasques = JSON.stringify([{ titol: tasca.titol, hora: tasca.hora, descripcio: tasca.descripcio, estatTasca: tasca.estatTasca, correuHora: tasca.correuHora, correuMitja: tasca.correuMitja }]);
                console.log(tasques);
                localStorage.setItem(data, tasques);
            } else {
                let tasques = JSON.parse(localStorage.getItem(data));
                console.log(tasques);
                tasques.push({ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: 'no', correuMitja: 'no' });
                localStorage.setItem(data, JSON.stringify(tasques));
            }
            location.replace('index.html');
        }
    });
}