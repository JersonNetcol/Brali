"use client";

import { useState } from "react";

const saboresClasicos = [
  "HAWAIANA",
  "POLLO Y CHAMPIÑON",
  "CARNES",
  "CRIOLLA",
  "BRALI (de la casa)",
];

const proteinas = [
  "Carne desmechada",
  "Pollo desmechado",
  "Jamón",
  "Tocineta",
  "Cabano",
  "Pepperoni",
  "Chorizo",
];

const toppings = [
  "Maíz",
  "Tomate",
  "Espinaca",
  "Pimentón",
  "Champiñon",
  "Plátano maduro",
  "Cebolla crispy",
  "Crema mexicana",
  "Frituras picantes",
  "Jalapeños",
];

const toppingsDulces = [
  "Banano",
  "Masmelos",
  "Bocadillo",
  "Fresas",
  "Crema de chocolate",
  "Piña",
  "Helado",
];

export default function PizzaBot() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<any>({
    tipo: "",
    proteinas: [],
    toppings: [],
    dulce: [],
    clasico: "",
    gourmet: "",
    nombre: "",
    direccion: "",
    telefono: "",
    pago: "",
    cambio: "",
  });

  const nextStep = () => setStep(step + 1);

  const handleTipoPizza = (tipo: string) => {
    setOrder({ ...order, tipo });
    nextStep();
  };

  const handleSelect = (category: string, item: string) => {
    const exists = order[category].includes(item);
    if (!exists) setOrder({ ...order, [category]: [...order[category], item] });
  };

  const handleInput = (category: string, value: string) => {
    setOrder({ ...order, [category]: value });
  };

  const handlePago = (method: string) => {
    setOrder({ ...order, pago: method });
    nextStep();
  };

  const handleCambio = (cambio: string) => {
    setOrder({ ...order, cambio });
    nextStep();
  };

  const calcularPrecio = () => {
    let total = 0;
    if (order.tipo === "Arma tu Pizza") total = 11000;
    if (order.tipo === "Clasicos") total = 8000;
    if (order.tipo === "Gourmet") {
      if (order.gourmet === "Mediana") total = 37000;
      if (order.gourmet === "Familiar") total = 50000;
    }
    if (order.toppings.length > 0) total += order.toppings.length * 3000;
    if (order.dulce.length > 0) total += order.dulce.length * 2000;
    if (order.addCheese) total += 3000;
    return total;
  };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-auto">
      {step === 0 && (
        <div className="mb-4">
          <p>
            ¡Hola! Bienvenido a Brali Pizza 🍕. Estás en la sección de Pizzas. Te
            ayudaremos a tomar tu pedido.
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => handleTipoPizza("Arma tu Pizza")}
              className="bg-orange-500 text-black px-4 py-2 rounded"
            >
              Arma tu Pizza ($11.000)
            </button>
            <button
              onClick={() => handleTipoPizza("Clasicos")}
              className="bg-orange-500 text-black px-4 py-2 rounded"
            >
              Sabores clásicos ($8.000)
            </button>
            <button
              onClick={() => handleTipoPizza("Gourmet")}
              className="bg-orange-500 text-black px-4 py-2 rounded"
            >
              Pizza Gourmet / Mediana / Familiar
            </button>
          </div>
        </div>
      )}

      {/* ARMA TU PIZZA */}
      {step === 1 && order.tipo === "Arma tu Pizza" && (
        <div className="mb-4">
          <p>Elige hasta 2 proteínas:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {proteinas.map((p) => (
              <button
                key={p}
                onClick={() => handleSelect("proteinas", p)}
                className="border border-orange-500 text-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition"
              >
                {p}
              </button>
            ))}
          </div>
          <button onClick={nextStep} className="mt-4 bg-white text-black px-4 py-2 rounded shadow">
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && order.tipo === "Arma tu Pizza" && (
        <div className="mb-4">
          <p>Elige tus toppings (salados y dulces):</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {toppings.map((t) => (
              <button
                key={t}
                onClick={() => handleSelect("toppings", t)}
                className="border border-orange-500 text-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition"
              >
                {t}
              </button>
            ))}
            {toppingsDulces.map((t) => (
              <button
                key={t}
                onClick={() => handleSelect("dulce", t)}
                className="border border-orange-500 text-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition"
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={nextStep} className="mt-4 bg-white text-black px-4 py-2 rounded shadow">
            Confirmar Ingredientes
          </button>
        </div>
      )}

      {/* DATOS DEL CLIENTE */}
      {step === 3 && (
        <div className="mb-4">
          <p>Para completar tu pedido, necesitamos algunos datos:</p>
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => handleInput("nombre", e.target.value)}
            className="w-full p-2 border border-orange-500 rounded my-2"
          />
          <input
            type="text"
            placeholder="Dirección"
            onChange={(e) => handleInput("direccion", e.target.value)}
            className="w-full p-2 border border-orange-500 rounded my-2"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            onChange={(e) => handleInput("telefono", e.target.value)}
            className="w-full p-2 border border-orange-500 rounded my-2"
          />
          <button onClick={nextStep} className="mt-4 bg-orange-500 text-black px-4 py-2 rounded">
            Siguiente
          </button>
        </div>
      )}

      {/* PAGO */}
      {step === 4 && (
        <div className="mb-4">
          <p>Selecciona tu medio de pago:</p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <button
              onClick={() => handlePago("Nequi")}
              className="bg-green-500 text-black px-4 py-2 rounded"
            >
              Nequi
            </button>
            <button
              onClick={() => handlePago("Efectivo")}
              className="bg-yellow-400 text-black px-4 py-2 rounded"
            >
              Efectivo
            </button>
          </div>
        </div>
      )}

      {/* CAMBIO PARA EFECTIVO */}
      {step === 5 && order.pago === "Efectivo" && (
        <div>
          <p>¿Necesitas que el repartidor lleve cambio o pagarás exacto?</p>
          <button onClick={() => handleCambio("Sencillo")} className="bg-orange-500 text-black px-4 py-2 rounded mr-2">
            Sencillo
          </button>
          <button onClick={() => handleCambio("Cambio")} className="bg-orange-500 text-black px-4 py-2 rounded">
            Con cambio
          </button>
        </div>
      )}

      {/* RESUMEN FINAL */}
      {((step === 5 && order.pago !== "Efectivo") || (step === 6 && order.pago === "Efectivo")) && (
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Resumen de tu pedido:</h3>
          <p>Nombre: {order.nombre}</p>
          <p>Dirección: {order.direccion}</p>
          <p>Teléfono: {order.telefono}</p>
          <p>Tipo de pizza: {order.tipo}</p>
          {order.proteinas?.length > 0 && <p>Proteínas: {order.proteinas.join(", ")}</p>}
          {order.toppings?.length > 0 && <p>Toppings: {order.toppings.join(", ")}</p>}
          {order.dulce?.length > 0 && <p>Dulces: {order.dulce.join(", ")}</p>}
          <p>Medio de pago: {order.pago}</p>
          {order.cambio && <p>Cambio: {order.cambio}</p>}
          <p>Tiempo aproximado de entrega: 20 minutos ⏱️</p>
          <p className="mt-2 font-bold">Total: ${calcularPrecio().toLocaleString()}</p>
          <button
            onClick={() => setStep(0)}
            className="mt-4 bg-orange-500 text-black px-4 py-2 rounded"
          >
            Hacer otro pedido
          </button>
        </div>
      )}
    </div>
  );
}
