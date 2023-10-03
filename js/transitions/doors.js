import Settings from '../settings.js';
import GlobalEvents from '../globalevents.js';
import DOM from '../helpers/dom.js';
import Screen from '../helpers/screen.js';


class Doors {
    constructor() {

        // Tiempo de duración de las animaciones
        this.duration = Settings.background_duration 

        const mid_top =  -(Screen.H * .5);
        const mid_bottom = Screen.H * .5;
        DOM.positon("top_door", 0, mid_top)
        DOM.positon("bottom_door", 0, mid_bottom)

        this.events = GlobalEvents.getInstance()
    }

    open = ()=>{
        const top = -Screen.H;
        const bottom = Screen.H;
        
        DOM.anime("top_door", 0, top, this.duration, Settings.easing)
        DOM.anime("bottom_door", 0, bottom, this.duration, Settings.easing, this.onCompleteAnimation)

        this.events.notify(GlobalEvents.ON_DOORS_START_OPENING, {});
    }

    onCompleteAnimation = ()=>{
        console.log("onCompleteAnmation")
        this.events.notify(GlobalEvents.ON_DOORS_OPENED, {});
    }
}

export default Doors;