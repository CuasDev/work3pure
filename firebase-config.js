// Configuración de Firebase
// Importamos las funciones que necesitamos de los SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración de Firebase
// NOTA: Deberás reemplazar estos valores con los de tu proyecto Firebase
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

// Función para guardar un mensaje en Firestore
async function guardarMensaje(formData) {
  try {
    // Añadir timestamp del servidor
    formData.fecha = serverTimestamp();
    
    // Añadir el documento a la colección 'mensajes'
    const docRef = await addDoc(collection(db, "mensajes"), formData);
    
    console.log("Mensaje guardado con ID: ", docRef.id);
    return {
      success: true,
      message: "Mensaje guardado correctamente",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error al guardar el mensaje: ", error);
    return {
      success: false,
      message: "Error al guardar el mensaje: " + error.message
    };
  }
}

// Exportar la función para usarla en script.js
export { guardarMensaje };