<?php
// Configuración de cabeceras para permitir solicitudes AJAX
header('Content-Type: application/json');

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Si no hay datos o hay un error en el formato JSON
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Datos no válidos']);
    exit;
}

// Validar campos requeridos
if (empty($data['nombre']) || empty($data['email']) || empty($data['mensaje'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit;
}

// Preparar los datos para guardar
$mensaje = [
    'id' => uniqid(),
    'fecha' => date('Y-m-d H:i:s'),
    'nombre' => $data['nombre'],
    'email' => $data['email'],
    'telefono' => isset($data['telefono']) ? $data['telefono'] : '',
    'plan' => isset($data['plan']) ? $data['plan'] : '',
    'mensaje' => $data['mensaje']
];

// Archivo donde se guardarán los mensajes
$archivo = 'mensajes.json';

// Leer mensajes existentes
$mensajes = [];
if (file_exists($archivo)) {
    $contenido = file_get_contents($archivo);
    if (!empty($contenido)) {
        $mensajes = json_decode($contenido, true);
        // Si hay un error en el JSON existente, iniciar con un array vacío
        if (json_last_error() !== JSON_ERROR_NONE) {
            $mensajes = [];
        }
    }
}

// Añadir el nuevo mensaje
$mensajes[] = $mensaje;

// Guardar todos los mensajes
$resultado = file_put_contents($archivo, json_encode($mensajes, JSON_PRETTY_PRINT));

// Verificar si se guardó correctamente
if ($resultado === false) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el mensaje']);
    exit;
}

// Respuesta exitosa
echo json_encode(['success' => true, 'message' => 'Mensaje guardado correctamente']);