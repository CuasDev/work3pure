# Sitio Web de Darwin Osorio

## Instrucciones de Ejecución

Puedes ejecutar este sitio web de dos maneras:

```
python -m http.server 3000
```

O alternativamente:

```
npx --yes serve .
```

## Funcionalidades Implementadas

### 1. Mejora de Contraste en Tema Oscuro
Se ha mejorado el contraste del campo de selección de plan en el formulario de contacto para que sea más legible en el tema oscuro.

### 2. Sistema de Almacenamiento de Mensajes

Los mensajes enviados a través del formulario de contacto ahora se guardan en un archivo JSON utilizando PHP.

#### Requisitos para el almacenamiento de mensajes:
- Servidor con soporte para PHP (versión 5.6 o superior)
- Permisos de escritura en el directorio para crear/modificar el archivo `mensajes.json`

#### Alternativa sin PHP
Si no tienes un servidor PHP disponible, puedes implementar una solución alternativa:

1. **Usando un servicio de backend como Firebase:**
   - Crea una cuenta en Firebase (https://firebase.google.com)
   - Configura una base de datos Firestore
   - Modifica el archivo `script.js` para usar la API de Firebase en lugar de PHP

2. **Usando localStorage (solo para pruebas):**
   - Los datos se guardarán solo en el navegador del usuario
   - No es una solución para producción, pero útil para pruebas

```javascript
// Ejemplo de código para localStorage (reemplazar en script.js)
if(isValid) {
    const formData = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        nombre,
        email,
        telefono,
        plan,
        mensaje
    };
    
    // Obtener mensajes existentes
    let mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    
    // Añadir nuevo mensaje
    mensajes.push(formData);
    
    // Guardar en localStorage
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    
    // Resetear formulario y mostrar éxito
    this.reset();
    mostrarExito('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
}
```

## Acceso a los Mensajes Guardados

Cuando uses la versión PHP, los mensajes se guardarán en el archivo `mensajes.json` en la raíz del proyecto. Puedes acceder a ellos directamente o crear un panel de administración protegido con contraseña para visualizarlos.

 