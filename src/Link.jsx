import { EVENTS } from "./constants"

export function navigate (href) {
    window.history.pushState({}, '', href)
    //Creamos un evento personalizado para avisar de que hemos cambiado la URL
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if(isMainEvent && isManageableEvent && !isModifiedEvent){
            event.preventDefault()
            navigate(to)
        }
    }

    return <a onClick={handleClick} href={to} target={target} {... props} />
}