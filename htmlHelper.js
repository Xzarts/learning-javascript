let htmlHelper = {
    getElementById: function(elementId) {
        if(!elementId) {
            console.error("Parameter 'elementId' is mandatory")
            return
        }

        let element = document.getElementById(elementId)
        if(!element) {
            console.warn(`No element with id ${elementId} exists`)
            return
        }

        return element
    },
    getValueById: function(elementId) {
        let element = this.getElementById(elementId)
        if(!element) return

        return element.value
    },
    setValueById: function(elementId, value) {
        let element = this.getElementById(elementId)
        if(!element) return

        element.value = value
        return true
    },
    setHtmlById: function(elementId, html) {
        let element = this.getElementById(elementId)
        if(!element) return

        element.innerHTML = html
        return true
    },
    addClassById: function(elementId, className) {
        let element = this.getElementById(elementId)
        if(!element) return

        element.classList.add(className)
        return true
    },
    removeClassById: function(elementId, className) {
        let element = this.getElementById(elementId)
        if(!element) return

        element.classList.remove(className)
        return true
    }
}