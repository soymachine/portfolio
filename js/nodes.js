import Node from './node.js';
import Settings from './settings.js';
import GlobalEvents from './globalevents.js';
import DOM from './helpers/dom.js';
import Screen from './helpers/screen.js';

class Nodes {

    constructor(margin = 0, offset = 0) {
        this.events = GlobalEvents.getInstance()
        // Tiempo de duración de las animaciones
        this.duration = Settings.node_duration 

        // Aquí guardaremos todos los nodos
        this.nodes = []

        // Los margenes 
        this.margin = margin

        // Offsets, por si queremos desplazarlos más allá de las medidas del browser
        this.offset = offset

        // Valor inicial para los indexes
        this.z_index = 100

        // valores de la pantalla
        this.W = Screen.W
        this.H = Screen.H

        this.currentNodeID = undefined

        // Aquí vamos a crear la estructura de nodos
        this.addNode("presentation-1", Node.RIGHT)
        this.addNode("presentation-2", Node.RIGHT)
        this.addNode("question-1", Node.BOTTOM)
        this.addNode("ligero", Node.LEFT)
        this.addNode("opulente", Node.RIGHT)
        this.addNode("delicadeza", Node.BOTTOM)
        this.addNode("dinamismo", Node.BOTTOM)
        this.addNode("resplandor", Node.BOTTOM)
        this.addNode("misterio", Node.BOTTOM)
        
        this.setupNodes()

        this.addButton("presentation-1-button", "presentation-2")
        this.addButton("presentation-2-button", "question-1")
        this.addButton("presentation-2-back-button", "presentation-1")
        this.addButton("question-1-back-button", "presentation-2")
        this.addButton("question-1-ligero-button", "ligero")
        this.addButton("question-1-opulente-button", "opulente")
        this.addButton("ligero-back-button", "question-1")
        this.addButton("ligero-delicadeza-button", "delicadeza")
        this.addButton("ligero-dinamismo-button", "dinamismo")
        this.addButton("opulente-back-button", "question-1")
        this.addButton("opulente-resplandor-button", "resplandor")
        this.addButton("opulente-misterio-button", "misterio")
        this.addButton("delicadeza-back-button", "ligero")
        this.addButton("dinamismo-back-button", "ligero")
        this.addButton("resplandor-back-button", "opulente")
        this.addButton("misterio-back-button", "opulente")

        // EVENTOS
        this.events.subscribe(GlobalEvents.ON_DOORS_OPENED, this.onDoorsOpened);
        //this.events.subscribe(GlobalEvents.ON_DOORS_START_OPENING, this.onDoorsStartOpening);
    }

    onDoorsOpened = ()=>{
        this.gotoNode("presentation-1")
    }

    onDoorsStartOpening = ()=>{
        // Llamar a lo de abajo con un delay
        
        setTimeout(()=>{
            this.gotoNode("presentation-1")
        }, 500)
    }

    setupNodes = ()=>{
        this.nodes.map((node, idx) =>{
            const position = node.position
            const nodoID = node.id
            const divName = DOM.getElementID(nodoID)
            let left = 0
            let top = 0
            let nodeOffset = this.getOffset(nodoID)
            switch(position){
                case Node.LEFT:
                    left = -(this.W + nodeOffset)
                    break;
                case Node.RIGHT:
                    left = this.W + nodeOffset
                    break;
                case Node.TOP:
                    top = -(this.H + nodeOffset)
                    break;
                case Node.BOTTOM:
                    top = this.H + nodeOffset
                    break;
                case Node.CENTER:
                    break;
            }

            //console.log(`this.W:${this.W} offset:${nodeOffset} position:${position} nodoID:${nodoID}`)
            // Posicionamos el nodo
            DOM.positon(nodoID, left, top)

            // Si los margenes son distintos de 0, agregamos margenes
            if(this.margin > 0){
                $(divName).css("margin", this.margin)
                $(divName).css("width", this.W - (this.margin * 2))
                $(divName).css("height", this.H - (this.margin * 2))
            }
            
            // Actualizamos los z-index
            $(divName).css("z-index", this.z_index + idx)
        })
    }

    getOffset = (nodeID) =>{
        const offset = Settings.custom_offsets[nodeID] ??= this.offset;
        return offset
    }

    gotoNode = (nextNodeID)=>{
        const nextNode = this.getNode(nextNodeID)
        
        if(this.currentNodeID != undefined){
            // Recogemos el nodo actual
            const currentNode = this.getNode(this.currentNodeID)
            // Calculamos a dónde se ha de mover el actual (depende de donde esté el siguiente)
            const outPosition = this.getOutPosition(nextNode.getPosition(), this.currentNodeID)
            // Movemos al actual fuera de la pantalla
            this.move(this.currentNodeID, outPosition.top, outPosition.left)
            // Actualizamos la posición del actual
            currentNode.setPosition(outPosition.positionResult)
        }
        
        // Movemos al siguiente dentro de la pantalla
        this.move(nextNodeID, 0, 0)
        
        // Actualizamos los valores del current node
        this.currentNodeID = nextNodeID

        // Enviamos evento de que hemos movido nodos
        //this.notify(outPosition.positionResult);
        this.events.notify(GlobalEvents.ON_NODE_CHANGE, this.reversePosition(nextNode.getPosition()));

        // Actualizamos la posición del siguiente
        nextNode.setPosition(Node.CENTER)
    }

    getOutPosition = (positionPush, currentNodeID)=>{
        let left = 0
        let top = 0
        let positionResult = Node.LEFT
        let nodeOffset = this.getOffset(currentNodeID)
        switch(positionPush){
            case Node.LEFT:
                left = this.W + nodeOffset
                positionResult = Node.RIGHT
                break;
            case Node.RIGHT:
                left = -(this.W + nodeOffset)
                positionResult = Node.LEFT
                break;
            case Node.TOP:
                top = this.H + nodeOffset
                positionResult = Node.BOTTOM
                break;
            case Node.BOTTOM:
                top = -(this.H + nodeOffset)
                positionResult = Node.TOP                
                break;
        }

        return {top, left, positionResult}
    }

    move = (nodeID, top, left) =>{
        anime({
            targets: DOM.getElementID(nodeID),
            translateX: left,
            translateY: top,
            duration: this.duration,
            easing: Settings.easing
        });
    }

    addNode = (id, position)=> {
        const node = new Node(id, position)
        this.nodes.push(node)
    }

    getNode = (nodeID) =>{
        return this.nodes.find(node => node.id == nodeID)
    }

    reversePosition = (currentPosition)=>{
        switch(currentPosition){
            case Node.LEFT:
                return  Node.RIGHT
            case Node.RIGHT:
                return  Node.LEFT
            case Node.TOP:
                return  Node.BOTTOM
            case Node.BOTTOM:
                return  Node.TOP
        }
    }

    addButton = (buttonID, nextNodeID)=>{
        const that = this
        $(DOM.getElementID(buttonID)).click(function () {
            that.hook(nextNodeID)
        });
    }

    hook = (nextNodeID)=>{
        this.gotoNode(nextNodeID)        
    }
    
}

export default Nodes;