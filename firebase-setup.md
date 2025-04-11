# Configuración de Firebase para el Sistema de Contacto

Este documento te guiará a través del proceso de configuración de Firebase para implementar el sistema de contacto en tu sitio web.

## Paso 1: Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Añadir proyecto"
3. Ingresa un nombre para tu proyecto (por ejemplo, "Mi Sitio Web")
4. Acepta los términos de Firebase y haz clic en "Continuar"
5. Puedes desactivar Google Analytics si no lo necesitas, o configurarlo según tus preferencias
6. Haz clic en "Crear proyecto"

## Paso 2: Registrar tu aplicación web

1. En la página de inicio del proyecto, haz clic en el icono de web (</>) para añadir una aplicación web
2. Ingresa un nombre para tu aplicación (por ejemplo, "Mi Sitio Web")
3. No es necesario configurar Firebase Hosting por ahora (puedes hacerlo más tarde si lo deseas)
4. Haz clic en "Registrar app"

## Paso 3: Obtener las credenciales de Firebase

Después de registrar tu aplicación, Firebase te mostrará un bloque de código con la configuración. Necesitarás copiar los valores de la configuración para actualizar el archivo `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

## Paso 4: Configurar Firestore Database

1. En el menú lateral de Firebase Console, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
   - Nota: En producción, deberías configurar reglas de seguridad más estrictas
4. Selecciona la ubicación del servidor más cercana a tus usuarios
5. Haz clic en "Habilitar"

## Paso 5: Actualizar el archivo firebase-config.js

1. Abre el archivo `firebase-config.js` en tu editor
2. Reemplaza los valores de ejemplo en `firebaseConfig` con los valores reales de tu proyecto

## Paso 6: Probar el formulario de contacto

1. Abre tu sitio web en un navegador
2. Completa el formulario de contacto y envíalo
3. Verifica que aparezca el mensaje de éxito debajo del botón de enviar
4. Verifica en la consola de Firebase (Firestore Database) que el mensaje se haya guardado correctamente

## Paso 7: Acceder a la página de administración de mensajes

1. Abre el archivo `admin-mensajes.html` en tu navegador
2. Verás una lista de todos los mensajes enviados a través del formulario de contacto
3. Los mensajes aparecerán ordenados por fecha (los más recientes primero)

## Solución de problemas comunes

### El formulario no envía los datos
- Verifica que las credenciales de Firebase sean correctas
- Asegúrate de que la consola del navegador no muestre errores
- Verifica que Firestore Database esté habilitado en tu proyecto

### Error al cargar los documentos en la página de administración
- Verifica que las reglas de seguridad de Firestore permitan la lectura de datos
- Asegúrate de que la colección "mensajes" existe en Firestore
- Revisa la consola del navegador para ver errores específicos

### Error de CORS
- Si estás probando localmente, asegúrate de usar un servidor local (como Live Server en VS Code)

### Errores de reglas de seguridad
- En modo de desarrollo, asegúrate de que las reglas de Firestore permitan lectura/escritura
- Para producción, configura reglas más restrictivas según tus necesidades

## Recursos adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Guía de Firestore](https://firebase.google.com/docs/firestore)
- [Reglas de seguridad de Firestore](https://firebase.google.com/docs/firestore/security/get-started)