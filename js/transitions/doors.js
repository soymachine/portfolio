import Settings from '../settings.js';
import GlobalEvents from '../globalevents.js';
import DOM from '../helpers/dom.js';
import Screen from '../helpers/screen.js';


class Doors {
    constructor() {

        // Tiempo de duración de las animaciones
        this.duration = Settings.doors_duration

        if(Settings.doors_direction == Settings.VERTICAL)
        {
            const mid_top =  -(Screen.H * .5);
            const mid_bottom = Screen.H * .5;
            DOM.translate("door_one", 0, mid_top)
            DOM.translate("door_two", 0, mid_bottom)
        }else if(Settings.doors_direction == Settings.HORIZONTAL)
        {
            const mid_left =  -(Screen.W * .5);
            const mid_right = Screen.W * .5;
            DOM.translate("door_one", mid_left, 0)
            DOM.translate("door_two", mid_right, 0)
        }
        

        this.events = GlobalEvents.getInstance()
    }

    open = ()=>{
        
        console.log("Start opening doors Settings.doors_direction "+ Settings.doors_direction)

        setTimeout(()=>{
            
            if(Settings.doors_direction == Settings.VERTICAL)
            {
                const top = -Screen.H;
                const bottom = Screen.H;
                DOM.anime("door_one", 0, top, this.duration, Settings.doors_easing)
                DOM.anime("door_two", 0, bottom, this.duration, Settings.doors_easing, this.onCompleteAnimation)
            }else if(Settings.doors_direction == Settings.HORIZONTAL)
            {
                const left =  -(Screen.W);
                const right = Screen.W;
                DOM.anime("door_one", left, 0, this.duration, Settings.doors_easing)
                DOM.anime("door_two", right, 0, this.duration, Settings.doors_easing, this.onCompleteAnimation)
            }
            

            this.events.notify(GlobalEvents.ON_DOORS_START_OPENING, {});
        }, 500)
        
    }

    onCompleteAnimation = ()=>{
        console.log("onCompleteAnmation")
        this.events.notify(GlobalEvents.ON_DOORS_OPENED, {});
    }
}

export default Doors;