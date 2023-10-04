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
        
        setTimeout(()=>{
            const that = this
            $(".timeline-point").each(function() {

                // Position el circulito
                let y = Screen.H * .5 - ($(this).height() * .5)
                const id = this.id
                const year = Math.floor(id.split("-")[1])
                
                let x = ((year - that.minYear) * that.spanByYear) + that.min
                x -= ($(this).width() * .5)
                
                // console.log(`x:${x} id: ${id} year:${year} (year - this.minYear):${(year - that.minYear)}`)
                DOM.position(this.id, x, y)

                // Position de la info
                // $(DOM.getElementID(`item-${year}`))
                const info_id = `item-${year}`
                const item = $(`#item-${year}`)
                const isOnTop = item.hasClass("timeline-position-top")
                if(isOnTop){
                    y -= 80
                }else{
                    y += 50
                }

                console.log(`info_id_: ${info_id} isOnTop:${isOnTop} item:${item}`)
                DOM.position(info_id, x, y)
            });
    
        }, 500)

    }
   
}

export default Timeline;