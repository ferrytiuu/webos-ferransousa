
window.onload = function () {
    var start = document.getElementById('start');
    start.focus();
    start.style.backgroundColor = '#e66053';
    start.style.color = '#f6e9dc';
    start.classList.add('active');


    var table = document.getElementById("calendar");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    var modalActiu = true;


    function dotheneedful(sibling) {
        if (sibling != null) {
            start.focus();
            start.style.backgroundColor = '';
            start.style.color = '';
            start.classList = 'calendar__day__cell'
            sibling.focus();
            sibling.style.backgroundColor = '#e66053';
            sibling.style.color = '#f6e9dc';
            sibling.classList.add('active');
            start = sibling;
        }
    }

    document.onkeydown = checkKey;

    /**
     * If the modal is active, and the user presses the up, down, left, or right arrow keys, the
     * function will move the focus to the next cell in the direction of the arrow key pressed. If the
     * user presses the enter key, the function will open the modal and load the data for the cell that
     * is currently in focus.
     * @param e - the event object
     */
    function checkKey(e) {
        e = e || window.event;
        if (modalActiu) {
            if (e.keyCode == '38') {
                // up arrow
                var idx = start.cellIndex;
                var nextrow = start.parentElement.previousElementSibling;
                if (nextrow != null) {
                    var sibling = nextrow.cells[idx];
                    dotheneedful(sibling);
                }
            } else if (e.keyCode == '40') {
                // down arrow
                var idx = start.cellIndex;
                var nextrow = start.parentElement.nextElementSibling;
                if (nextrow != null) {
                    var sibling = nextrow.cells[idx];
                    dotheneedful(sibling);
                }
            } else if (e.keyCode == '37') {
                // left arrow
                var sibling = start.previousElementSibling;
                dotheneedful(sibling);
            } else if (e.keyCode == '39') {
                // right arrow
                var sibling = start.nextElementSibling;
                dotheneedful(sibling);
            } else if (e.keyCode == '13') {
                for (var i = 0, row; row = table.rows[i]; i++) {
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        if (col.classList.contains('active')) {
                            let dataABuscar = col.id;
                            console.log(dataABuscar);
                            let tasques = JSON.parse(localStorage.getItem(dataABuscar));
                            console.log(tasques);
                            if (dataABuscar != '' && dataABuscar != 'start') {
                                modal.style.display = "block";
                                modalActiu = !modalActiu;
                                carregarModal(dataABuscar);
                            }
                        }
                    }
                }
            }
        }
    }

    document.getElementById('calendar').addEventListener('click', (ev) => {
        let dataABuscar;
        if (ev.target.tagName == "div") {
            dataABuscar = ev.target.parentElement.id;
        } else if (ev.target.tagName == "span") {
            dataABuscar = ev.target.parentElement.parentElement.id;
        } else {
            dataABuscar = ev.target.id;
        }
        console.log(dataABuscar);
        let tasques = JSON.parse(localStorage.getItem(dataABuscar));
        console.log(tasques);
        if (dataABuscar != '' && dataABuscar != 'start') {
            modal.style.display = "block";
            modalActiu = !modalActiu;
            carregarModal(dataABuscar);
        }

    })

    window.addEventListener("keydown", function (inEvent) {
        if (window.event) {
            keycode = inEvent.keyCode;
        }
        switch (keycode) {
            case 403:
                modal.style.display = "none";
                modalActiu = !modalActiu;
                document.getElementById("tasquesModal").innerHTML = '';
                break;
        }
    });

    span.onclick = function () {
        modal.style.display = "none";
        modalActiu = !modalActiu;
        document.getElementById("tasquesModal").innerHTML = '';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalActiu = !modalActiu;
            document.getElementById("tasquesModal").innerHTML = '';
        }
    }

    function carregarModal(data) {
        document.getElementById('dataModal').innerText = data;
        let tasques = JSON.parse(localStorage.getItem(data));
        if (tasques != null) {
            let html = "";
            for (let i = 0; i < tasques.length; i++) {
                if (tasques[i].estatTasca == 'acabada') {
                    html += "<li><a class='tascaCompletada' href = './editar.html?data="+data+"&posicio="+i+"'><h2>" + tasques[i].titol.toUpperCase() + "</h2><p>" + tasques[i].descripcio + "</p><p>" + tasques[i].hora + "</p></a></li>";
                }else{
                    html += "<li><a class='tascaNoCompletada' href = './editar.html?data="+data+"&posicio="+i+"'><h2>" + tasques[i].titol.toUpperCase() + "</h2><p>" + tasques[i].descripcio + "</p><p>" + tasques[i].hora + "</p></a></li>";
                }
                
            }
            document.getElementById("tasquesModal").innerHTML = html;
        }
    }

    var notificacions = document.querySelectorAll('.notifs');
    for (let i = 0; i < notificacions.length; i++) {
        dataABuscar = notificacions[i].parentElement.id;
        //console.log(dataABuscar);
        let tasques = JSON.parse(localStorage.getItem(dataABuscar));
        //console.log(tasques);
        var comptadorAcabada = 0;
        var comptadorNoAcabada = 0;

        if (tasques != null) {
            for (let j = 0; j < tasques.length; j++) {
                if (tasques[j].estatTasca == 'acabada') {
                    comptadorAcabada++;
                } else {
                    comptadorNoAcabada++;
                }
            }
        } if (comptadorAcabada != 0) {
            document.getElementById(dataABuscar).firstChild.getElementsByTagName('span')[0].innerText = comptadorAcabada;
        }
        if (comptadorNoAcabada != 0) {
            document.getElementById(dataABuscar).firstChild.getElementsByTagName('span')[1].innerText = comptadorNoAcabada;
        }

    }
}