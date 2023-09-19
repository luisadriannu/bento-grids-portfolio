import { h, Component } from "preact";

class ShowTime extends Component {
  constructor() {
    super();
    this.state = {
      hora: this.obtenerHoraActual(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ hora: this.obtenerHoraActual() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  obtenerHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    return `${horas}:${minutos}`;
  }

  render() {
    return (
      <div>
        <p class="text-xs md:text-md lg:text-xl">{this.state.hora}</p>
      </div>
    );
  }
}

export default ShowTime;
