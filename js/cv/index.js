$(document).ready(function(){

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
    
    if (isMobile()) {
        
    } else {
        

        const defaultTooltipH = 273
        const tooltipH180 = 213

        let tooltipWidth = 320
        let tooltipHeight = defaultTooltipH
        let marginTop = 25
        let xOffset = (-200 * .5) + 55;
        
        // Esto ha de ser dinámico según la altura del content
        let yOffset = tooltipHeight + marginTop;

        let wedgeOffset = 5
        let automaticImageIndex = 0
        let automaticImageScrollTime = Date.now();
        let automaticImageScrollMaxTime = 2000;
        let automaticImageScroll = false
        let automaticImageScrollTotalImages = 0
        let automaticImagesLoaded = false
        const tooltipSpeed = 500
        const tooltip = $(".tooltip")
        const tooltipWedge = $(".tooltip-wedge")
        const tooltipImage = $("#tooltip-image")
        const tooltipImageContainer = $(".tooltip-image-container")
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
                total:1,
                type:"png",
                label:"Visit Linkedin profile",
                url: "/assets/imgs/inaki"
            },
            "pere": {
                total:1,
                type:"png",
                label:"Visit Linkedin profile",
                url: "/assets/imgs/pbarnola"
            },
            "synapse-pi-dashboard": {
                total:6,
                type:"png",
                label:"Visit website",
                url: "/assets/imgs/portfolio-synapse-dashboard"
            },
            "synapse-pi-cms": {
                total:4 ,
                type:"png",
                label:"Restricted access only",
                url: "/assets/imgs/portfolio-synapse-cms"
            },
            "synapse-cube-front": {
                total:5,
                type:"png",
                label:"Visit website",
                url: "/assets/imgs/datacube"
            },
            "synapse-cube-back": {
                total:1,
                type:"png",
                label:"Restricted access only",
                url: "/assets/imgs/portfolio-synapsecube-back"
            },
            "kingeclient": {
                total:1,
                type:"png",
                label:"Visit website",
                url: "/assets/imgs/kingeclient"
            },
            "whads": {
                total:1,
                type:"png",
                label:"Visit website",
                url: "/assets/imgs/whads"
            },
            "appnormals": {
                total:1,
                type:"png",
                label:"Visit website",
                url: "/assets/imgs/appnormals"
            },
            "pixcelona": {
                total:1,
                type:"gif",
                label:"Website not available",
                url: "/assets/imgs/pixcelona"
            },
            "nutriapp": {
                total:5,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/nutriapp"
            },
            "synapsemanagers": {
                total:1,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/synapsemanagers"
            },
            "thebreach": {
                total:1,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/thebreach"
            },
            "vysion": {
                total:1,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/vysion"
            },
            "creativeshift": {
                total:5,
                type:"png",
                label:"Website not available",
                url: "/assets/imgs/creativeshift"
            },
            "pixelworld1": {
                total:1,
                type:"gif",
                label:"Visit Website",
                url: "/assets/imgs/pixelworld1"
            },
            "pixelworld2": {
                total:5,
                type:"png",
                label:"Visit Behance gallery",
                url: "/assets/imgs/pw2"
            },
            "stay": {
                total:1,
                type:"png",
                label:"Visit Steam page",
                url: "/assets/imgs/stay"
            },
            "octopus": {
                total:1,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/octopus"
            },
            "terracotta": {
                total:1,
                type:"png",
                label:"Visit Steam page",
                url: "/assets/imgs/terracotta"
            },
            "frankanddrake": {
                total:1,
                type:"png",
                label:"Visit Steam page",
                url: "/assets/imgs/frankanddrake"
            },
            "superbarista": {
                total:1,
                type:"png",
                label:"Visit Behance gallery",
                url: "/assets/imgs/superbarista"
            },
            "worldeaters": {
                total:1,
                type:"png",
                label:"Visit iOS product store",
                url: "/assets/imgs/worldeaters"
            },
            "coloremipsum": {
                total:1,
                type:"png",
                label:"Visit Behance gallery",
                url: "/assets/imgs/coloremipsum"
            },
            "memory": {
                total:5,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/memory"
            },
            "find-four": {
                total:5,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/find-four"
            },
            "rviewer": {
                total:1,
                type:"png",
                label:"Visit Website",
                url: "/assets/imgs/rviewer"
            },
            
        }

        $( "a" ).on( "mouseenter", handleIn ).on( "mouseleave", handleOut ).on("mousemove", handleMouseMove);
        

        addEventListener("wheel", onscroll)
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
            const contentH = $(this).data("h");

            // Existe?
            if(data[id] != undefined){
                // Miramos si el contenido encaja en 320x240 o es menor en altura
                if(contentH != undefined){
                    tooltipHeight = tooltipH180
                    tooltip.css("height", "213px")
                    tooltipImageContainer.css("height", "180px")
                }else{
                    tooltipHeight = defaultTooltipH
                    tooltip.css("height", "273px")
                    tooltipImageContainer.css("height", "240px")
                }

                showTooltip()

                const {url, total, label, type} = data[id]
                let imageElements = ""
                let imageList = []
                tooltipImageContainer.empty()
                if(total > 1){
                    // Necesitamos loop   
                    automaticImageScroll = true
                    automaticImagesLoaded = false  
                    automaticImageScrollTotalImages = total    
                    automaticImageIndex = 0           
                    for (let index = 0; index < total; index++) {
                        const zIndex = total - index;
                        
                        let left = 0
                        if(index > 0){
                            left = tooltipWidth
                        }
                        
                        const imageElement = `<img id="tooltip-image-${index}" class="tooltip-image" src="${url}-${index+1}.${type}" style="z-index:${zIndex}; left:${left}px;">`
                        imageElements+=imageElement  
                        
                        tooltipImageContainer.append(imageElement)

                        imageList.push($(`#tooltip-image-${index}`)[0])
                    }

                    // La imagen de loading
                    tooltipImageContainer.append(`<img id="tooltip-image-loading" class="tooltip-image" src="/assets/imgs/loading.gif" style="z-index:${total}; left:0px;">`)

                    Promise.all(Array.from(imageList).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                        onTooltipImagesLoaded()
                    })
                    

                }else{
                    // No necesitamos loop
                    automaticImageScroll = false
                    let imageElement;
                    if(type == "none"){
                        imageElement = `<img class="tooltip-image" src="${url}">`
                    }else{
                        imageElement = `<img class="tooltip-image" src="${url}.${type}">`
                    }

                    tooltipImageContainer.append(imageElement)

                    $("#tooltip-image-loading").remove()
                }

                
                // tooltipImage.attr("src", url)
                
                const description = data[id].label
                tooltipDescription.html(description)
                isTooltipActive = true

                // En qué posición estamos?
                var link_rect = this.getBoundingClientRect()
                window.scrollX

                setOffsetY(link_rect.y)
            }
        }

        function handleOut(e){
            hideTooltip()
            isTooltipActive = false
        }

        function handleMouseMove(e){
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

                if(automaticImageScroll && automaticImagesLoaded){
                    // check time
                    var now = Date.now()
                    var dt = now - automaticImageScrollTime
                    if(dt > automaticImageScrollMaxTime){
                        automaticImageScrollTime = Date.now()                      
                        nextImage()                       
                    }
                }
            }

            window.requestAnimationFrame(loop);
        }

        function nextImage(){

            const currentImage = automaticImageIndex
            
            // Incrementamos la actual
            automaticImageIndex =  automaticImageIndex + 1
            
            // Si se sale de los límites, calculamos la siguiente (será la primera de todas)
            if(automaticImageIndex == automaticImageScrollTotalImages){
                automaticImageIndex = 0
            }

            // Move out la actual
            const animation = anime({
                targets: `#tooltip-image-${currentImage}`,
                left: -tooltipWidth,
                easing: 'easeOutQuad',
                duration: tooltipSpeed
            });

            // Move in la siguiente
            anime({
                targets: `#tooltip-image-${automaticImageIndex}`,
                left: 0,
                easing: 'easeOutQuad',
                duration: tooltipSpeed
            });

            animation.finished.then(()=>{
                // Movemos al que salío a X 200
                //$(`#tooltip-image-${automaticImageIndex}`).css("left", tooltipWidth + "px")
                console.log($(`#tooltip-image-${currentImage}`).css("left", `${tooltipWidth}px`))
            })
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
                
                yOffset = tooltipHeight + marginTop;
                tooltipWedge.css("top",`${tooltipHeight - wedgeOffset}px`)
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

        /* automatic image scroll */
        function onTooltipImagesLoaded(){
            automaticImagesLoaded = true
            automaticImageScrollTime = Date.now();

            $("#tooltip-image-loading").remove()
        }
    }
    
    /* CSS cuando aparecen en pantalla */
    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
          // If the element is visible
          if (entry.isIntersecting) {
            // Add the animation class
            console.log(entry.target.dataset.id)
            if(    entry.target.dataset.id == 75 
                || entry.target.dataset.id == 80
                || entry.target.dataset.id == 85
                || entry.target.dataset.id == 90
                || entry.target.dataset.id == 95
            ){
                entry.target.classList.add(`score-${entry.target.dataset.id}`);
            }
          }
        });
      });
      
      var targets = [
        Array.from(document.querySelectorAll('.expertise-score')),
      ].flat();
      targets.forEach((target) => observer.observe(target));

      // observer.observe(document.querySelectorAll('.expertise-score'));
    
    

    
});