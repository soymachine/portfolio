import Node from './node.js';
import Settings from './settings.js';
import GlobalEvents from './globalevents.js';
import DOM from './helpers/dom.js';

class Background {
    constructor(id, offset, top, left) {
        this.id = id // Esto será el nombre del div (string)
        this.offset = offset
        this.top = top
        this.left = left

        // Tiempo de duración de las animaciones
        this.duration = Settings.background_duration 

        DOM.positon(this.id, this.top, this.left)

        const events = GlobalEvents.getInstance()
        events.subscribe(GlobalEvents.ON_NODE_CHANGE, this.onChange);
    }

    getPosition = ()=> {
        return this.position
    }

    setPosition = (newPosition)=>{
        this.position = newPosition
    }

    onChange = (positionResult)=>{
        console.log(`nos hemos de mover a ${positionResult}`)
        // movemos el background según este cambio
        
        switch(positionResult){
            case Node.LEFT:
                this.left -= this.offset
                break;
            case Node.RIGHT:
                this.left += this.offset
                break;
            case Node.TOP:
                this.top -= this.offset
                break;
            case Node.BOTTOM:
                this.top += this.offset
                break;
        }

        // $(DOM.getElementID(this.id)).animate({ top: this.top, left: this.left}, {duration:this.duration, easing: Settings.easing});
        DOM.anime(this.id, this.left, this.top, this.duration, Settings.easing)
    }

   
}

export default Background;