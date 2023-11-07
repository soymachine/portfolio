$(document).ready(function(){
    
    console.log("there")
    const xOffset = (-200 * .5) + 55;
    const yOffset = 265;

    const tooltip = $(".tooltip")
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

    function handleIn(e){
        const id = $(this).data("id");

        // Existe?
        if(data[id] != undefined){
            tooltip.css("display", "block")
            const url = data[id].url
            tooltipImage.attr("src", url)
            
            const description = data[id].label
            tooltipDescription.html(description)
            isTooltipActive = true
        }

    }

    function handleOut(e){
        tooltip.css("display", "none")
        isTooltipActive = false
    }

    function handleMouseMove(e){
        //tooltip.css("top",(e.pageY - yOffset) + "px")
        //tooltip.css("left",(e.pageX + xOffset) + "px");

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
});