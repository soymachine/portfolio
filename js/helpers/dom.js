class DOM {
    
}

export default DOM;

DOM.getElementID = (id)=>{
    return "#" + id
}

DOM.positon = (id, left, top)=>{
    anime({
        targets: DOM.getElementID(id),
        translateX: DOM.px(left),
        translateY: DOM.px(top),
        duration: 0.001
    });
}

DOM.anime = (id, left, top, duration, ease, fn) =>{
    anime({
        targets: DOM.getElementID(id),
        translateX: DOM.px(left),
        translateY: DOM.px(top),
        duration: duration,
        easing: ease,
        complete: function(anim) {
            fn?.()
        }
    });
}

DOM.px = (amount)=>{
    return amount + "px";
}