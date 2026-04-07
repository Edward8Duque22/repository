// Base de datos local
const BD_KEY = 'mi_repo_creativo_v1';

function obtenerProyectos() {
    return JSON.parse(localStorage.getItem(BD_KEY)) || [];
}

function guardarProyectos(datos) {
    localStorage.setItem(BD_KEY, JSON.stringify(datos));
}

// Seguridad
function verificarSesion() {
    if (!sessionStorage.getItem('sesion_activa')) {
        window.location.href = 'login.html';
    }
}

// Lógica de carga (Base64 para fotos locales)
function procesarNuevoProyecto() {
    const titulo = document.getElementById('titulo').value;
    const fecha = document.getElementById('fecha').value;
    const fotoFile = document.getElementById('foto-local').files[0];

    if (!titulo || !fecha || !fotoFile) {
        alert("¡Hey! Te falta el título, la fecha o la foto 📸");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const nuevo = {
            id: Date.now(),
            titulo,
            fecha,
            img: e.target.result,
            repo: document.getElementById('url-repo').value || '#',
            live: document.getElementById('url-live').value || '#',
            desc: document.getElementById('descripcion').value || '',
            visible: true
        };

        const proyectos = obtenerProyectos();
        proyectos.push(nuevo);
        guardarProyectos(proyectos);
        alert("¡Proyecto guardado con éxito! 🎉");
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(fotoFile);
}
