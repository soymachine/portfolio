class Node {

    constructor(id, position) {
        this.id = id // Esto será el nombre del div (string)
        this.position = position
    }

    getPosition = ()=> {
        return this.position
    }

    setPosition = (newPosition)=>{
        this.position = newPosition
    }
}

// "enums" para gestionar las posiciones
Node.LEFT = "LEFT";
Node.RIGHT = "RIGHT";
Node.TOP = "TOP";
Node.BOTTOM = "BOTTOM";
Node.CENTER = "CENTER";

export default Node;