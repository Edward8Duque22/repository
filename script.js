function obtenerDatos() {
    return JSON.parse(localStorage.getItem('mi_repo_vercel')) || [];
}

function guardarDatos(datos) {
    localStorage.setItem('mi_repo_vercel', JSON.stringify(datos));
}

function agregarProyecto() {
    const titulo = document.getElementById('titulo').value;
    const fecha = document.getElementById('fecha').value;
    const file = document.getElementById('foto').files[0];

    if (!titulo || !fecha || !file) {
        alert("Por favor completa título, fecha y selecciona una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const nuevo = {
            id: Date.now(),
            titulo: titulo,
            fecha: fecha,
            img: e.target.result,
            repo: document.getElementById('repo').value || '#',
            live: document.getElementById('live').value || '#',
            desc: document.getElementById('desc').value || '',
            visible: true
        };

        const db = obtenerDatos();
        db.push(nuevo);
        guardarDatos(db);
        alert("¡Proyecto guardado!");
        window.location.href = 'index.html'; // Te lleva al inicio para ver el resultado
    };
    reader.readAsDataURL(file);
}

function eliminar(id) {
    if(confirm("¿Seguro que quieres eliminar este archivo?")) {
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
