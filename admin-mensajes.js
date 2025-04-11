// Importamos las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (debe coincidir con firebase-config.js)
const firebaseConfig = {
    apiKey: "AIzaSyAzPCKN3fiRteMno_Nugy7lth541iHA-Ps",
    authDomain: "webdevoso.firebaseapp.com",
    projectId: "webdevoso",
    storageBucket: "webdevoso.firebasestorage.app",
    messagingSenderId: "168329194850",
    appId: "1:168329194850:web:0ef7e818c6e58c2e69903b",
    measurementId: "G-X3CEPN6NXT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencias a elementos del DOM
const mensajesContainer = document.getElementById('mensajes-container');
const cargandoElement = document.getElementById('cargando');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const sinMensajesElement = document.getElementById('sin-mensajes');

// Función para formatear la fecha
function formatearFecha(timestamp) {
    if (!timestamp) return 'Fecha no disponible';
    
    const fecha = timestamp.toDate();
    return fecha.toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje || 'Error al cargar los mensajes';
    errorContainer.style.display = 'block';
    cargandoElement.style.display = 'none';
}

// Función para crear el HTML de un mensaje
function crearMensajeHTML(mensaje, id) {
    const mensajeElement = document.createElement('div');
    mensajeElement.className = 'mensaje-card';
    mensajeElement.id = `mensaje-${id}`;
    
    const fechaFormateada = formatearFecha(mensaje.fecha);
    const planTexto = mensaje.plan ? mensaje.plan : 'No especificado';
    
    mensajeElement.innerHTML = `
        <div class="mensaje-header">
            <h3>${mensaje.nombre}</h3>
            <span class="mensaje-fecha">${fechaFormateada}</span>
        </div>
        <div class="mensaje-info">
            <p><strong>Email:</strong> ${mensaje.email}</p>
            <p><strong>Teléfono:</strong> ${mensaje.telefono || 'No proporcionado'}</p>
            ${mensaje.plan ? `<span class="mensaje-plan">${planTexto}</span>` : ''}
        </div>
        <div class="mensaje-contenido">
            <p>${mensaje.mensaje}</p>
        </div>
    `;
    
    return mensajeElement;
}

// Función principal para cargar los mensajes
async function cargarMensajes() {
    try {
        // Crear una consulta ordenada por fecha (más recientes primero)
        const mensajesQuery = query(
            collection(db, "mensajes"),
            orderBy("fecha", "desc")
        );
        
        // Obtener los documentos
        const querySnapshot = await getDocs(mensajesQuery);
        
        // Ocultar el indicador de carga
        cargandoElement.style.display = 'none';
        
        // Verificar si hay mensajes
        if (querySnapshot.empty) {
            sinMensajesElement.style.display = 'block';
            return;
        }
        
        // Mostrar el contenedor de mensajes
        mensajesContainer.style.display = 'block';
        
        // Procesar cada documento
        querySnapshot.forEach((doc) => {
            const mensajeData = doc.data();
            const mensajeElement = crearMensajeHTML(mensajeData, doc.id);
            mensajesContainer.appendChild(mensajeElement);
        });
        
    } catch (error) {
        console.error("Error al cargar los mensajes:", error);
        mostrarError(`Error al cargar los documentos: ${error.message}`);
    }
}

// Cargar los mensajes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar la carga de mensajes
    cargarMensajes();
    
    // Configurar el cambio de tema (reutilizando la funcionalidad existente)
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});