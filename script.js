// Funcionalidad del tema (claro/oscuro)
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Verificar si hay un tema guardado en localStorage
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Función para cambiar el tema
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Evento para el cambio de tema
toggleSwitch.addEventListener('change', switchTheme);

// Funcionalidad del menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace (para móviles)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navegación suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Validación de formulario mejorada
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetear errores
        document.querySelectorAll('.error').forEach(error => error.remove());
        document.querySelectorAll('.campo').forEach(campo => campo.classList.remove('error'));

        // Validar campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const plan = document.getElementById('plan').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        let isValid = true;

        // Validar nombre
        if(!nombre) {
            mostrarError('nombre', 'Por favor ingresa tu nombre');
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !emailRegex.test(email)) {
            mostrarError('email', 'Por favor ingresa un email válido');
            isValid = false;
        }

        // Validar teléfono (opcional pero con formato)
        if(telefono) {
            const telefonoRegex = /^[0-9]{8}$/;
            if(!telefonoRegex.test(telefono)) {
                mostrarError('telefono', 'Teléfono debe tener 8 dígitos');
                isValid = false;
            }
        }

        // Validar mensaje
        if(!mensaje || mensaje.length < 20) {
            mostrarError('mensaje', 'El mensaje debe tener al menos 20 caracteres');
            isValid = false;
        }

        if(isValid) {
            // Preparar los datos para enviar
            const formData = {
                nombre,
                email,
                telefono,
                plan,
                mensaje
            };
            
            // Mostrar indicador de carga
            const botonEnviar = form.querySelector('button[type="submit"]');
            const textoOriginal = botonEnviar.textContent;
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            
            // Importar la función de Firebase y enviar datos
            import('./firebase-config.js')
                .then(module => {
                    return module.guardarMensaje(formData);
                })
                .then(data => {
                    // Restaurar botón
                    botonEnviar.textContent = textoOriginal;
                    botonEnviar.disabled = false;
                    
                    if (data.success) {
                        this.reset();
                        mostrarExito('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
                    } else {
                        mostrarError('mensaje', data.message || 'Error al enviar el mensaje');
                    }
                })
                .catch(error => {
                    // Restaurar botón
                    botonEnviar.textContent = textoOriginal;
                    botonEnviar.disabled = false;
                    
                    console.error('Error:', error);
                    mostrarError('mensaje', 'Error de conexión al enviar el mensaje');
                });
        }
    });
}

function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId).parentElement;
    campo.classList.add('error');
    const errorElemento = document.createElement('p');
    errorElemento.className = 'error';
    errorElemento.style.color = 'var(--color-accento)';
    errorElemento.textContent = mensaje;
    campo.appendChild(errorElemento);
}

function mostrarExito(mensaje) {
    const exitoElemento = document.createElement('div');
    exitoElemento.className = 'exito';
    exitoElemento.textContent = mensaje;
    exitoElemento.style.backgroundColor = '#dff0d8';
    exitoElemento.style.color = '#3c763d';
    exitoElemento.style.padding = '1rem';
    exitoElemento.style.borderRadius = '4px';
    exitoElemento.style.marginTop = '1rem';
    
    // Insertar el mensaje después del botón de enviar
    const botonEnviar = form.querySelector('button[type="submit"]');
    botonEnviar.insertAdjacentElement('afterend', exitoElemento);
}