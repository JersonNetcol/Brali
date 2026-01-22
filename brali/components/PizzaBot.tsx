"use client";

import { useState } from "react";

// ----------------------
// INTERFAZ DEL PEDIDO
// ----------------------
interface Order {
  tipo: "Arma tu Pizza" | "Clasicos" | "Gourmet" | "";
  proteinas: string[];
  toppings: string[];
  dulce: string[];
  clasico: string;
  gourmet: string; // Mediana | Familiar
  nombre: string;
  direccion: string;
  telefono: string;
  pago: "Nequi" | "Efectivo" | "";
  cambio: "Sencillo" | "Cambio" | "";
  addCheese: boolean;
}

// ----------------------
// OPCIONES
// ----------------------
const saboresClasicos = ["HAWAIANA", "POLLO Y CHAMPIÑON", "CARNES", "CRIOLLA", "BRALI (de la casa)"];
const proteinas = ["Carne desmechada", "Pollo desmechado", "Jamón", "Tocineta", "Cabano", "Pepperoni", "Chorizo"];
const toppings = ["Maíz", "Tomate", "Espinaca", "Pimentón", "Champiñon", "Plátano maduro", "Cebolla crispy", "Crema mexicana", "Frituras picantes", "Jalapeños"];
const toppingsDulces = ["Banano", "Masmelos", "Bocadillo", "Fresas", "Crema de chocolate", "Piña", "Helado"];
const saboresGourmet = [
  "PEPPERONI",
  "MEXICANA",
  "MARGARITA",
  "VEGETARIANA",
  "NAPOLITANA",
  "PAISA",
  "DULCE TENTACIÓN",
  "ABORRAJADA",
  "BARBACOA",
  "UCHUVA",
  "HAWAIANA",
  "POLLO Y CHAMPIÑON",
  "CARNES",
  "CRIOLLA",
  "BRALI (de la casa)"
];

// ----------------------
// COMPONENTE
// ----------------------
export default function PizzaBot() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<Order>({
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
    addCheese: false,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // ----------------------
  // HANDLERS
  // ----------------------
  type ArrayKeys = "proteinas" | "toppings" | "dulce";
  type ValueKeys = "tipo" | "clasico" | "gourmet" | "nombre" | "direccion" | "telefono" | "pago" | "cambio";

  const handleTipoPizza = (tipo: "Arma tu Pizza" | "Clasicos" | "Gourmet") => {
    setOrder({ ...order, tipo, proteinas: [], toppings: [], dulce: [], clasico: "", gourmet: "" });
    nextStep();
  };

  const handleSelect = (category: ArrayKeys, item: string) => {
    const exists = order[category].includes(item);
    if (!exists) setOrder({ ...order, [category]: [...order[category], item] });
    else setOrder({ ...order, [category]: order[category].filter((i) => i !== item) });
  };

  const handleInput = (category: ValueKeys, value: string) => {
    setOrder({ ...order, [category]: value });
  };

  const handlePago = (method: "Nequi" | "Efectivo") => {
    setOrder({ ...order, pago: method });
    nextStep();
  };

  const handleCambio = (cambio: "Sencillo" | "Cambio") => {
    setOrder({ ...order, cambio });
    nextStep();
  };

  const handleAddCheese = () => {
    setOrder({ ...order, addCheese: !order.addCheese });
  };

  const calcularPrecio = () => {
    let total = 0;
    if (order.tipo === "Arma tu Pizza") total = 11000;
    if (order.tipo === "Clasicos") total = 8000;
    if (order.tipo === "Gourmet") {
      if (order.gourmet === "Mediana") total = 37000;
      if (order.gourmet === "Familiar") total = 50000;
    }
    total += order.toppings.length * 3000;
    total += order.dulce.length * 2000;
    if (order.addCheese) total += 3000;
    return total;
  };

  const renderAnterior = () =>
    step > 0 && step < 8 ? (
      <button onClick={prevStep} className="mt-2 mr-2 bg-gray-300 text-black px-4 py-2 rounded">
        Anterior
      </button>
    ) : null;

  // ----------------------
  // RENDER
  // ----------------------
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-auto">
      {/* SALUDO INICIAL */}
      {step === 0 && (
        <div className="mb-4">
          <p>
            ¡Hola! 👋 Bienvenido a Brali Pizza 🍕. Estás en la sección de Pizzas y aquí te ayudaremos a tomar tu pedido paso a paso.
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <button onClick={() => handleTipoPizza("Arma tu Pizza")} className="bg-orange-500 text-black px-4 py-2 rounded">
              Arma tu Pizza ($11.000)
            </button>
            <button onClick={() => handleTipoPizza("Clasicos")} className="bg-orange-500 text-black px-4 py-2 rounded">
              Sabores clásicos ($8.000)
            </button>
            <button onClick={() => handleTipoPizza("Gourmet")} className="bg-orange-500 text-black px-4 py-2 rounded">
              Pizza Gourmet
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
                className={`border px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition ${
                  order.proteinas.includes(p) ? "bg-orange-500 text-black" : "border-orange-500 text-orange-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {renderAnterior()}
            <button onClick={nextStep} className="bg-white text-black px-4 py-2 rounded shadow">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* TOPPINGS ARMA TU PIZZA */}
      {step === 2 && order.tipo === "Arma tu Pizza" && (
        <div className="mb-4">
          <p>Elige tus toppings salados o dulces:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {toppings.map((t) => (
              <button
                key={t}
                onClick={() => handleSelect("toppings", t)}
                className={`border px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition ${
                  order.toppings.includes(t) ? "bg-orange-500 text-black" : "border-orange-500 text-orange-500"
                }`}
              >
                {t}
              </button>
            ))}
            {toppingsDulces.map((t) => (
              <button
                key={t}
                onClick={() => handleSelect("dulce", t)}
                className={`border px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition ${
                  order.dulce.includes(t) ? "bg-orange-500 text-black" : "border-orange-500 text-orange-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddCheese}
              className={`mr-2 px-4 py-2 rounded ${order.addCheese ? "bg-green-400" : "bg-gray-200"}`}
            >
              {order.addCheese ? "Quitar extra queso" : "Agregar extra queso (+$3.000)"}
            </button>
            {renderAnterior()}
            <button onClick={nextStep} className="bg-white text-black px-4 py-2 rounded shadow">
              Confirmar ingredientes
            </button>
          </div>
        </div>
      )}

      {/* SABORES CLASICOS */}
      {step === 1 && order.tipo === "Clasicos" && (
        <div className="mb-4">
          <p>Elige tu sabor clásico ($8.000):</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {saboresClasicos.map((s) => (
              <button
                key={s}
                onClick={() => handleInput("clasico", s)}
                className={`border px-3 py-1 rounded hover:bg-orange-500 hover:text-black transition ${
                  order.clasico === s ? "bg-orange-500 text-black" : "border-orange-500 text-orange-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {renderAnterior()}
            <button onClick={nextStep} className="bg-white text-black px-4 py-2 rounded shadow">
              Confirmar sabor
            </button>
          </div>
        </div>
      )}

      {/* PIZZA GOURMET */}
      {step === 1 && order.tipo === "Gourmet" && (
        <div className="mb-4">
          <p>Elige tamaño de Pizza Gourmet:</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <button onClick={() => handleInput("gourmet", "Mediana")} className="bg-orange-500 text-black px-4 py-2 rounded">
              Mediana ($37.000) - Hasta 2 sabores
            </button>
            <button onClick={() => handleInput("gourmet", "Familiar")} className="bg-orange-500 text-black px-4 py-2 rounded">
              Familiar ($50.000) - Hasta 3 sabores
            </button>
          </div>
          <div className="mt-4">
            {renderAnterior()}
            <button onClick={nextStep} className="bg-white text-black px-4 py-2 rounded shadow">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* OTRO PEDIDO */}
      {step === 3 && (
        <div className="mb-4">
          <p>¿Deseas hacer otro pedido antes de continuar con tus datos?</p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <button onClick={() => setStep(0)} className="bg-orange-500 text-black px-4 py-2 rounded">
              Sí, otro pedido
            </button>
            <button onClick={nextStep} className="bg-green-500 text-black px-4 py-2 rounded">
              No, continuar
            </button>
          </div>
        </div>
      )}

      {/* DATOS DEL CLIENTE */}
      {step === 4 && (
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
          <div className="mt-4">
            {renderAnterior()}
            <button onClick={nextStep} className="bg-orange-500 text-black px-4 py-2 rounded">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* PAGO */}
      {step === 5 && (
        <div className="mb-4">
          <p>Selecciona tu medio de pago:</p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <button onClick={() => handlePago("Nequi")} className="bg-green-500 text-black px-4 py-2 rounded">
              Nequi
            </button>
            <button onClick={() => handlePago("Efectivo")} className="bg-yellow-400 text-black px-4 py-2 rounded">
              Efectivo
            </button>
          </div>
          {renderAnterior()}
        </div>
      )}

      {/* CAMBIO */}
      {step === 6 && order.pago === "Efectivo" && (
        <div>
          <p>¿Necesitas que el repartidor lleve cambio o pagarás exacto?</p>
          <button onClick={() => handleCambio("Sencillo")} className="bg-orange-500 text-black px-4 py-2 rounded mr-2">
            Sencillo
          </button>
          <button onClick={() => handleCambio("Cambio")} className="bg-orange-500 text-black px-4 py-2 rounded">
            Con cambio
          </button>
          {renderAnterior()}
        </div>
      )}

      {/* RESUMEN FINAL */}
      {((step === 6 && order.pago !== "Efectivo") || (step === 7 && order.pago === "Efectivo")) && (
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Resumen de tu pedido:</h3>
          <p>Nombre: {order.nombre}</p>
          <p>Dirección: {order.direccion}</p>
          <p>Teléfono: {order.telefono}</p>
          <p>Tipo de pizza: {order.tipo}</p>
          {order.tipo === "Clasicos" && <p>Sabor clásico: {order.clasico}</p>}
          {order.tipo === "Arma tu Pizza" && (
            <>
              <p>Proteínas: {order.proteinas.join(", ")}</p>
              <p>Toppings: {order.toppings.join(", ")}</p>
              <p>Dulces: {order.dulce.join(", ")}</p>
              {order.addCheese && <p>Extra queso agregado</p>}
            </>
          )}
          {order.tipo === "Gourmet" && <p>Tamaño: {order.gourmet}</p>}
          <p>Medio de pago: {order.pago}</p>
          {order.cambio && <p>Cambio: {order.cambio}</p>}
          <p>Tiempo aproximado de entrega: 20 minutos ⏱️</p>
          <p className="mt-2 font-bold">Total: ${calcularPrecio().toLocaleString()}</p>
          <button onClick={() => setStep(0)} className="mt-4 bg-orange-500 text-black px-4 py-2 rounded">
            Hacer otro pedido
          </button>
        </div>
      )}
    </div>
  );
}
