
window.onload = function () {
    var start = document.getElementById('start');
    start.focus();
    start.style.backgroundColor = '#e66053';
    start.style.color = '#f6e9dc';
    start.classList.add('active');

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

    function checkKey(e) {
        e = e || window.event;
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
                        console.log(col.id);
                    }
                }
            }
        }
    }

    document.getElementById('calendar').addEventListener('click', (ev) => {
        console.log(ev.target.id);
    })

    document.getElementById('calendar').addEventListener('keydown', (ev) => {
        console.log(ev.target.id);
    })
}
