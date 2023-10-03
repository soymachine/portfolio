import Screen from './helpers/screen.js';
import Node from './node.js';
import Nodes from './nodes.js';
import GlobalEvents from './globalevents.js';
import Background from './background.js';
import Settings from './settings.js';
import Doors from './transitions/doors.js';
import Timeline from './timeline/Timeline.js';


$(document).ready(function(){
    
    const nodes = new Nodes(Settings.margin, Settings.offset)
    const background = new Background("background", Settings.background_offset, Settings.background_top, Settings.background_left)
    const doors = new Doors()
    const timeline = new Timeline()
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        $(".container").css("display", "block")
        //nodes.gotoNode("presentation-1")
        doors.open()
    })


    if(Settings.isFPSEnabled){
        const fps = new FPS.FPS()

        // update function
        function update() {
            // do stuff like rendering and dancing
            fps.frame()
            requestAnimationFrame(update)
        }
    
        update()
    }

    
});
