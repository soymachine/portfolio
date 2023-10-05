class Settings {
    
}

Settings.HORIZONTAL = "HORIZONTAL";
Settings.VERTICAL = "VERTICAL";

// Easing de las animaciones
Settings.easing = "easeInOutQuart"; // Quad, Quart, Quint, Expo, Sine

// Duración de las transiciones de los nodos
Settings.node_duration = 1000;

// Duración de las transiciones de las puertas
Settings.doors_duration = 1000;

// Easing de las transiciones de las puertas
Settings.doors_easing = "easeInOutQuart";

// Dirección de las transiciones de las puertas
Settings.doors_direction = Settings.HORIZONTAL;

// Duración de las transiciones del background
Settings.background_duration = 1000;

// Margenes del contenido de un nodo respecto de la pantalla
Settings.margin = 0;

// Offset entre nodos
Settings.offset = 0;

// Lo que se mueve el background cada vez que cambiamos de nodo (en cualquier dirección, a modo de parallax)
Settings.background_offset = 100;

// Posición inicial del background en X
Settings.background_left = -1500;

// Posición inicial del background en Y
Settings.background_top = -1500;

/***** ADVANCED  **********/
// Easing de las animaciones

Settings.custom_offsets = {
    /*
    "presentation-2":300,
    "ligero":1000,
    "opulente":1000,
    */
};

// Enable/Disable de los FPS
Settings.isFPSEnabled = true;



export default Settings;