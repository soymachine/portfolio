$(document).ready(function(){

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
    
    if (isMobile()) {
        
    } else {
        let xOffset = (-200 * .5) + 55;
        let yOffset = 275;

        let tooltipWidth = 200
        let tooltipHeight = 200

        const tooltip = $(".tooltip")
        const tooltipWedge = $(".tooltip-wedge")
        const tooltipImage = $("#tooltip-image")
        const tooltipDescription = $("#tooltip-description")
        const minDegrees = -20
        const maxDegrees = 20
        let isTooltipActive = false
        let tooltipXDest = 0
        let tooltipYDest = 0
        let currentTooltipX = 0
        let currentTooltipY = 0
        const SPEED = 10
        let vector = {
            x:0,
            y:0
        }    
        const W = $(window).width()
        const H = $(window).height()

        const data = {
            "inaki": {
                label:"Visit Linkedin profile",
                url: "https://media.licdn.com/dms/image/C4D03AQH6FXEAH78R7w/profile-displayphoto-shrink_800_800/0/1661628840724?e=1704931200&v=beta&t=AZmL606TNrJXejprplIxH-77gw6tDLB8UWupMH0uuDE"
            },
            "pere": {
                label:"Visit Linkedin profile",
                url: "https://media.licdn.com/dms/image/C4E03AQGjnvgvxN93Zw/profile-displayphoto-shrink_200_200/0/1652340024906?e=1704931200&v=beta&t=lzLnNCWUOa_WCkdOnl2cDvZWwga_ryy2C4UTOvxy2iU"
            },
            "synapse-pi-dashboard": {
                label:"Visit website",
                url: "/assets/imgs/portfolio-synapse-dashboard.png"
            },
            "synapse-pi-cms": {
                label:"Restricted access only",
                url: "/assets/imgs/portfolio-synapse-cms.png"
            },
            "synapse-cube-front": {
                label:"Visit website",
                url: "/assets/imgs/portfolio-synapsecube-front.png"
            },
            "synapse-cube-back": {
                label:"Restricted access only",
                url: "/assets/imgs/portfolio-synapsecube-back.png"
            },
            "kingeclient": {
                label:"Visit website",
                url: "/assets/imgs/kingeclient.png"
            },
            "whads": {
                label:"Visit website",
                url: "/assets/imgs/whads.png"
            },
            "appnormals": {
                label:"Visit website",
                url: "/assets/imgs/appnormals.png"
            },
        }

        $( "a" ).on( "mouseenter", handleIn ).on( "mouseleave", handleOut ).on("mousemove", handleMouseMove);
        

        addEventListener("scroll", onscroll)

        function onscroll(event) {
            isTooltipActive = false
        }


        function showTooltip(){
            tooltip.css("display", "block")
        }

        function hideTooltip(){
            tooltip.css("display", "none")
        }

        function handleIn(e){
            const id = $(this).data("id");

            // Existe?
            if(data[id] != undefined){
                showTooltip()
                const url = data[id].url
                tooltipImage.attr("src", url)
                
                const description = data[id].label
                tooltipDescription.html(description)
                isTooltipActive = true

                // En qué posición estamos?
                var link_rect = this.getBoundingClientRect()
                window.scrollX

                console.log("scrollX:" + window.scrollX)
                
                setOffsetY(link_rect.y)
                
            }

        }

        function handleOut(e){
            hideTooltip()
            isTooltipActive = false
        }

        function handleMouseMove(e){
            //tooltip.css("top",(e.pageY - yOffset) + "px")
            //tooltip.css("left",(e.pageX + xOffset) + "px");

            setOffsetX(e.pageX)

            tooltipXDest = (e.pageX + xOffset)

            tooltipYDest = (e.pageY - yOffset)
        }
        
        function loop(timeStamp) {
            
            if(isTooltipActive){
                const dX = tooltipXDest - currentTooltipX;
                const dY = tooltipYDest - currentTooltipY;
                
                currentTooltipX += (dX / SPEED);
                currentTooltipY += (dY / SPEED);

                tooltip.css("top", currentTooltipY + "px")
                tooltip.css("left", currentTooltipX + "px");

                const yRotation = clamp(dX, minDegrees, maxDegrees)
                const xRotation = clamp(dY * -1, minDegrees, maxDegrees)
                tooltip.css("transform", "perspective(1500px) rotateY("+yRotation+"deg) rotateX("+xRotation+"deg)");
            }


            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);

        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function setOffsetY(yPos){
            
            if(yPos < tooltipHeight){
                // console.log(link_rect)
                yOffset = -40;
                tooltipWedge.css("top","-8px")
                tooltipWedge.css("transform","rotate(180deg)")
            }else{
                yOffset = 275;
                tooltipWedge.css("top","236px")
                tooltipWedge.css("transform","rotate(0deg)")
            }
        }

        function setOffsetX(xPos){
            if(xPos + tooltipWidth > window.innerWidth){
                // Mover a la izquierda
                //xOffset = (-200 * .5) + 55;
                //xOffset -= tooltipWidth
                xOffset = ((xPos + tooltipWidth + 30) - window.innerWidth)
                const wedgeX = xOffset - 15

                xOffset *= -1
                // console.log(`left adjust: xPos:${xPos}, tooltipXDest:${tooltipXDest}, window.innerWidth:${window.innerWidth} xOffset:${xOffset}`)
                tooltipWedge.css("left", `${wedgeX}px`)
            }else{
                // Valores iniciales
                xOffset = (-200 * .5) + 55;
                tooltipWedge.css("left", "30px")
            }
        }
    }
    
    
    

    
});