
window.onload = function () {
    var start = document.getElementById('start');
    start.focus();
    start.style.backgroundColor = '#e66053';
    start.style.color = '#f6e9dc';
    start.classList.add('active');


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
     * If the user presses the up arrow, the function will check if the cell above the active cell
     * exists, and if it does, it will make that cell active. 
     * 
     * If the user presses the down arrow, the function will check if the cell below the active cell
     * exists, and if it does, it will make that cell active. 
     * 
     * If the user presses the left arrow, the function will check if the cell to the left of the
     * active cell exists, and if it does, it will make that cell active. 
     * 
     * If the user presses the right arrow, the function will check if the cell to the right of the
     * active cell exists, and if it does, it will make that cell active. 
     * 
     * If the user presses the enter key, the function will log the id of the active cell to the
     * console.
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
                var table = document.getElementById("calendar");
                for (var i = 0, row; row = table.rows[i]; i++) {
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        if (col.classList.contains('active')) {
                            let dataABuscar = col.id;
                            console.log(dataABuscar);
                            let tasques = JSON.parse(localStorage.getItem(dataABuscar));
                            console.log(tasques);
                            if (dataABuscar != null) {
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
        let dataABuscar = ev.target.id;
        console.log(dataABuscar);
        let tasques = JSON.parse(localStorage.getItem(dataABuscar));
        console.log(tasques);
        if (dataABuscar != null) {
            modal.style.display = "block";
            modalActiu = !modalActiu;
            carregarModal(dataABuscar);
        }

    })

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
                html += "<li>" + tasques[i].titol + " / " + tasques[i].hora + " / " + tasques[i].descripcio + "</li>";
            }
            document.getElementById("tasquesModal").innerHTML = html;
        }
    }

}
