import Settings from '../settings.js';
import GlobalEvents from '../globalevents.js';
import DOM from '../helpers/dom.js';
import Screen from '../helpers/screen.js';


class Timeline {
    constructor() {

        const minSpan = 200
        this.min = minSpan
        this.max = Screen.W - minSpan
        this.minYear = 2003
        this.maxYear = 2023
        this.totalArea = Screen.W - (minSpan * 2)
        this.totalYears = this.maxYear - this.minYear
        this.spanByYear = this.totalArea / this.totalYears
        this.data = {}
        
        setTimeout(()=>{
            const that = this
            $(".timeline-point").each(function() {

                // Position el circulito
                let y = Screen.H * .5 - ($(this).height() * .5)
                const id = this.id
                const year = Math.floor(id.split("-")[1])

                const info_id = `item-${year}`
                const item = $(`#item-${year}`)
                const isOnTop = item.hasClass("timeline-position-top")
                
                let x = ((year - that.minYear) * that.spanByYear) + that.min
                x -= ($(this).width() * .5)
                
                
                DOM.position(this.id, x, y)

                // RollOver, RollOut y Click del circulito
                $(DOM.getElementID(id)).mouseover(function(){
                    that.rollOver(id)
                });
            
                $(DOM.getElementID(id)).mouseout(function(){
                    that.rollOut(id)
                });

                // Position de la info
                // $(DOM.getElementID(`item-${year}`))
                
                if(isOnTop){
                    y -= 80
                }else{
                    y += 50
                }

                console.log(`info_id_: ${info_id} isOnTop:${isOnTop} item:${item}`)
                DOM.position(info_id, x, y)
                
                // Data mgmt
                that.data[id] = {
                    isOnTop : isOnTop,
                    info_id: info_id
                }
                
            });
    
        }, 500)

    }

    rollOver = (id)=>{
        const isOnTop = this.data[id].isOnTop
        const info_id = this.data[id].info_id
        

        let y = $(DOM.getElementID(info_id)).position().top;
        const x = $(DOM.getElementID(info_id)).position().left;

        const h = $(DOM.getElementID(info_id)).height()
        const offset = 20
        
        if(isOnTop){
            y -= 40 + offset
        }else{
            y += h + offset
        }
        

        console.log(`h:${h} y:${y}`)

        // Movemos el INFO
        $("#tl-visit-info").css({
            "top" : y, 
            "left" : x
        })

        anime({
            targets:`#tl-visit-info`,
            opacity: 1,
            duration:500,
            easing:'easeOutQuad'
        });

        // Cambiamos el color del circulito
        anime({
            targets:`#${id}`,
            backgroundColor: '#159ba2',
            duration:500,
            easing:'easeOutQuad',
            scale:2
        });
        
        
    }

    rollOut = (id)=>{
        // Cambiamos el color del circulito
        anime({
            targets:`#${id}`,
            backgroundColor: '#FFF',
            duration:500,
            easing:'easeOutQuad',
            scale:1
        });

        anime({
            targets:`#tl-visit-info`,
            opacity: 0,
            duration:500,
            easing:'easeOutQuad'
        });

    }
   
}

export default Timeline;