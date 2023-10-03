class Settings {

    
}

// Easing de las animaciones
Settings.easing = "easeInOutQuint"; // Quad, Quart, Quint, Expo, Sine

// Duración de las transiciones de los nodos
Settings.node_duration = 2000;

// Duración de las transiciones del background
Settings.background_duration = 2000;

// Margenes del contenido de un nodo respecto de la pantalla
Settings.margin = 20;

// Offset entre nodos
Settings.offset = 500;

// Lo que se mueve el background cada vez que cambiamos de nodo (en cualquier dirección, a modo de parallax)
Settings.background_offset = 350;

// Posición inicial del background en X
Settings.background_left = -1000;

// Posición inicial del background en Y
Settings.background_top = -1000;

/***** ADVANCED  **********/
// Easing de las animaciones

Settings.custom_offsets = {
    /*"presentation-2":0,
    "ligero":1000,
    "opulente":1000,*/
};

export default Settings;