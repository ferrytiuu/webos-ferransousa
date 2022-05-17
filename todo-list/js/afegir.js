window.onload = function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const data = urlParams.get('data');

    document.getElementById('dataDia').value = data.substring(0, data.indexOf('/'));

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
        inputs[i].addEventListener("keydown", function (event) {
            if (event.keyCode == 227) {
                if (this.previousElementSibling) {
                    this.previousElementSibling.focus();
                }
            }
            else if (event.keyCode == 228) {
                if (this.nextElementSibling) {
                    this.nextElementSibling.focus();
                }
            }
        }, false);

    window.addEventListener("keydown", function (inEvent) {
        if (window.event) {
            keycode = inEvent.keyCode;
        }
        if (keycode == 13 || keycode == 406) {
            let data = "" + document.getElementById("dataDia").value + "/" + document.getElementById("dataMes").value + "/" + document.getElementById("dataAny").value;
            let titol = document.getElementById("titol").value;
            let hora = "" + document.getElementById("hora").value + ":" + document.getElementById("min").value + "";
            let descripcio = document.getElementById("descripcio").value;
            let estatTasca = document.querySelector('input[name="estatTasca"]:checked').value;

            if (localStorage.getItem(data) == null) {
                let tasques = JSON.stringify([{ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: 'no', correuMitja: 'no' }]);
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