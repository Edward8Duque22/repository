// Función para obtener datos
function obtenerDatos() {
    return JSON.parse(localStorage.getItem('repo_proyectos')) || [];
}

// Función para guardar datos
function guardarDatos(datos) {
    localStorage.setItem('repo_proyectos', JSON.stringify(datos));
}

// Lógica para el Administrador
function agregarProyecto() {
    const file = document.getElementById('foto').files[0];
    if (!file) return alert("Selecciona una foto local");

    const reader = new FileReader();
    reader.onload = function(e) {
        const nuevo = {
            id: Date.now(),
            titulo: document.getElementById('titulo').value,
            fecha: document.getElementById('fecha').value,
            img: e.target.result,
            repo: document.getElementById('repo').value,
            live: document.getElementById('live').value,
            desc: document.getElementById('desc').value,
            visible: true
        };

        const db = obtenerDatos();
        db.push(nuevo);
        guardarDatos(db);
        location.reload(); // Recarga para mostrar cambios
    };
    reader.readAsDataURL(file);
}

function eliminar(id) {
    if(confirm("¿Seguro que quieres borrarlo?")) {
        const db = obtenerDatos().filter(p => p.id !== id);
        guardarDatos(db);
        location.reload();
    }
}

function toggleVisible(id) {
    const db = obtenerDatos().map(p => {
        if(p.id === id) p.visible = !p.visible;
        return p;
    });
    guardarDatos(db);
    location.reload();
}
