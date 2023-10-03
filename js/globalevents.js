class GlobalEvents {

    constructor() {
        // Para los eventos
        this.events = {};

    }

    // TODO Suscribirse a un evento con una función
    // Ahora: suscribirse con una función
    subscribe(event = "", func) {
        if(this.events[event] == undefined){
            this.events[event] = []
        }

        this.events[event].push(func)
    }
     
    // TODO Desuscribirse a un evento con una función
    // Ahora: desuscribirse con una función
    unsubscribe(event = "", func) {
        if(this.events[event] != undefined){
            this.events[event] = this.events[event].filter((observer) => observer !== func)
        }
    }
     
    // Ahora: notifica siempre a todos los suscritores, no admite distinción del evento
    notify(event = "", data) {
        // Cuidado! No podemos notificar si no hay nadie escuchando este evento
        this.events[event]?.forEach((observer) => observer(data));
    }

}

GlobalEvents.myInstance = null
GlobalEvents.getInstance = ()=>{
    if(GlobalEvents.myInstance == null){
        GlobalEvents.myInstance = new GlobalEvents()   
    }
    
    return GlobalEvents.myInstance
}

GlobalEvents.ON_NODE_CHANGE = "ON_NODE_CHANGE"
GlobalEvents.ON_DOORS_OPENED = "ON_DOORS_OPENED"
GlobalEvents.ON_DOORS_START_OPENING = "ON_DOORS_START_OPENING"

export default GlobalEvents;