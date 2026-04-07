const DB_NAME = 'mi_archivo_data_v2';

function obtenerProyectos() {
    return JSON.parse(localStorage.getItem(DB_NAME)) || [];
}

function guardarProyectos(datos) {
    localStorage.setItem(DB_NAME, JSON.stringify(datos));
}

function agregarProyecto() {
    const titulo = document.getElementById('titulo').value;
    const fecha = document.getElementById('fecha').value;
    const foto = document.getElementById('foto').files[0];

    if(!titulo || !fecha || !foto) return alert("Por favor llena los campos y selecciona una foto.");

    const reader = new FileReader();
    reader.onload = function(e) {
        const nuevo = {
            id: Date.now(),
            titulo, fecha, img: e.target.result,
            repo: document.getElementById('repo').value || '#',
            live: document.getElementById('live').value || '#',
            desc: document.getElementById('desc').value || '',
            visible: true
        };
        const db = obtenerProyectos();
        db.push(nuevo);
        guardarProyectos(db);
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(foto);
}

function toggleVisible(id) {
    const db = obtenerProyectos().map(p => p.id === id ? {...p, visible: !p.visible} : p);
    guardarProyectos(db);
    location.reload();
}

function eliminarProyecto(id) {
    if(confirm("¿Seguro que quieres borrar este proyecto?")) {
        const db = obtenerProyectos().filter(p => p.id !== id);
        guardarProyectos(db);
        location.reload();
    }
}
