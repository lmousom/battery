class BatteryCore extends HTMLElement {

    render() {
        let percentage;
        navigator.getBattery().then((battery) => {
            percentage = `${Math.floor(battery.level * 100)} %` || undefined
            this.innerHTML = percentage
        })

    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() {
        return ['percentage'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

}

customElements.define("battery-core", BatteryCore);