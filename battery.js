class Battery extends HTMLElement {

    render() {
        this.innerHTML = `
      <battery-core percentage="numeric">
      </battery-core>
      `;

        this.batteryElem = this.firstElementChild;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
        this.timer = setInterval(() => this.update(), 5000);
    }

    update() {
        navigator.getBattery().then((battery) => {
            this.percentage = `${Math.abs(battery.level * 100)} %` || undefined
        })
        this.batteryElem.setAttribute('percentage', this.percentage);
        this.dispatchEvent(new CustomEvent('plug-me', { detail: this.percentage }));
    }

    disconnectedCallback() {
        clearInterval(this.timer); // the element to be garbage-collected
    }

}

customElements.define("battery-info", Battery);