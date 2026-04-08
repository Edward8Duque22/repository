const DB_NAME = 'mi_archivo_data_v2';

function obtenerProyectos() {
    return JSON.parse(localStorage.getItem(DB_NAME)) || [];
}

function guardarProyectos(datos) {
    localStorage.setItem(DB_NAME, JSON.stringify(datos));
}

// Muestra un toast de confirmación sin redirigir
function mostrarToast(msg = '✓ Proyecto publicado') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function agregarProyecto() {
    const titulo = document.getElementById('titulo').value.trim();
    const fecha  = document.getElementById('fecha').value;
    const foto   = document.getElementById('foto').files[0];
    const errorEl = document.getElementById('form-error');

    if (!titulo || !fecha || !foto) {
        if (errorEl) {
            errorEl.textContent = 'Completa el título, la fecha y sube una imagen.';
            errorEl.classList.add('show');
        }
        return;
    }

    if (errorEl) errorEl.classList.remove('show');

    const reader = new FileReader();
    reader.onload = function (e) {
        const nuevo = {
            id:      Date.now(),
            titulo,
            fecha,
            img:     e.target.result,
            repo:    document.getElementById('repo').value.trim() || '#',
            live:    document.getElementById('live').value.trim() || '#',
            desc:    document.getElementById('desc').value.trim() || '',
            visible: true
        };

        const db = obtenerProyectos();
        db.push(nuevo);
        guardarProyectos(db);

        // Limpiar formulario
        document.getElementById('titulo').value = '';
        document.getElementById('fecha').value  = '';
        document.getElementById('repo').value   = '';
        document.getElementById('live').value   = '';
        document.getElementById('desc').value   = '';
        document.getElementById('foto').value   = '';
        document.getElementById('file-name').textContent = 'Arrastra o haz clic para seleccionar';

        mostrarToast('✓ Publicado correctamente');

        // Recargar lista en admin sin salir de la página
        if (typeof cargarAdmin === 'function') cargarAdmin();
    };
    reader.readAsDataURL(foto);
}

function toggleVisible(id) {
    const db = obtenerProyectos().map(p => p.id === id ? { ...p, visible: !p.visible } : p);
    guardarProyectos(db);
    if (typeof cargarAdmin === 'function') cargarAdmin();
}

function eliminarProyecto(id) {
    if (confirm('¿Seguro que quieres borrar este proyecto? Esta acción no se puede deshacer.')) {
        const db = obtenerProyectos().filter(p => p.id !== id);
        guardarProyectos(db);
        if (typeof cargarAdmin === 'function') cargarAdmin();
    }
}