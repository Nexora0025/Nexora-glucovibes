async function cargarDatos() {
  const respuesta = await fetch("datos.csv");
  const texto = await respuesta.text();

  const filas = texto.trim().split("\n").slice(1);
  const fechas = [];
  const glucosa = [];
  const ritmo = [];
  const potencia = [];

  for (let fila of filas) {
    const [fecha, g, r, p] = fila.split(",");
    fechas.push(new Date(fecha));
    glucosa.push(Number(g));
    ritmo.push(Number(r));
    potencia.push(Number(p));
  }

  const ctx = document.getElementById("grafico").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [
        {
          label: "Glucosa (mg/dL)",
          data: glucosa,
          borderColor: "#00ffff",
          tension: 0.3,
          yAxisID: 'y1'
        },
        {
          label: "Ritmo cardíaco (ppm)",
          data: ritmo,
          borderColor: "#ff007f",
          tension: 0.3,
          yAxisID: 'y2'
        },
        {
          label: "Potencia (W)",
          data: potencia,
          borderColor: "#ffff00",
          tension: 0.3,
          yAxisID: 'y3'
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: { color: "#fff" }
        },
        y1: {
          type: "linear",
          position: "left",
          ticks: { color: "#00ffff" }
        },
        y2: {
          type: "linear",
          position: "right",
          ticks: { color: "#ff007f" },
          grid: { drawOnChartArea: false }
        },
        y3: {
          type: "linear",
          position: "right",
          ticks: { color: "#ffff00" },
          grid: { drawOnChartArea: false },
          display: false
        }
      },
      plugins: {
        legend: { labels: { color: "#fff" } }
      }
    }
  });
}

cargarDatos();
