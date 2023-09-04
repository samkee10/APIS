document.addEventListener("DOMContentLoaded", () => {
    const urlBase = "https://mindicador.cl/api";
    const inputPesos = document.getElementById("input-pesos");
    const selectMoneda = document.getElementById("select-moneda");
    const resultadoSpan = document.getElementById("resultado-span");
    const graficoCanvas = document.getElementById("grafico");
  
    async function obtenerTiposDeCambio() {
      try {
        const response = await fetch(urlBase);
        if (!response.ok) {
          throw new Error("Error al obtener tipos de cambio");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Error al obtener tipos de cambio: " + error.message);
      }
    }
  
    function calcularCambio(tipoMoneda, montoCLP) {
      obtenerTiposDeCambio()
        .then((data) => {
          const tipoCambio = data[tipoMoneda].valor;
          const resultado = montoCLP / tipoCambio;
          resultadoSpan.textContent = resultado.toFixed(2);
        })
        .catch((error) => {
          resultadoSpan.textContent = "Error en el cálculo";
          console.error(error.message);
        });
    }
  
    document.getElementById("btn").addEventListener("click", () => {
      const tipoMoneda = selectMoneda.value;
      const montoCLP = parseFloat(inputPesos.value);
      calcularCambio(tipoMoneda, montoCLP);
    });
  
    const ctx = graficoCanvas.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [""], 
        datasets: [
          {
            label: "Valor en Pesos CLP",
            data: [""],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  
    
    obtenerTiposDeCambio();
  });