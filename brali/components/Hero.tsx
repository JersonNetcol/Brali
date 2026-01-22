"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Importa tus bots
import PizzaBot from "./PizzaBot";
import PaneCookBot from "./PaneCookBot";
import LasagnaBot from "./LasagnaBot";
import BebidasBot from "./BebidasBot";

const cards = [
  { id: "pizza", title: "PIZZA", image: "/pizza.png" },
  { id: "panecook", title: "PANE COOK", image: "/panecook.png" },
  { id: "lasagna", title: "LASAGNA", image: "/lasagna.png" },
  { id: "bebidas", title: "BEBIDAS", image: "/bebidas.png" },
];

export default function Hero() {
  const [openBot, setOpenBot] = useState<null | string>(null);

  const renderBot = () => {
    switch (openBot) {
      case "pizza":
        return <PizzaBot />;
      case "panecook":
        return <PaneCookBot />;
      case "lasagna":
        return <LasagnaBot />;
      case "bebidas":
        return <BebidasBot />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center py-32 px-6 relative">
      {/* TÍTULO */}
      <div className="mb-20 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          ¿Qué quieres pedir <span className="text-orange-500">hoy</span>?
        </h1>
        <p className="mt-4 text-neutral-400 text-lg">Elige tu favorito 🍕</p>
      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl w-full">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group"
          >
            {/* Card */}
            <div className="relative bg-neutral-900 rounded-3xl border border-orange-500/40 animate-border overflow-hidden shadow-xl">
              {/* Imagen */}
              <div className="flex justify-center pt-10">
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center shadow-lg">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="px-6 pb-8 text-center">
                <h3 className="mt-6 text-lg font-bold tracking-widest">
                  {card.title}
                </h3>

                <button
                  onClick={() => setOpenBot(card.id)}
                  className="mt-6 w-full rounded-xl border border-orange-500 text-orange-500 py-3 font-semibold hover:bg-orange-500 hover:text-black transition"
                >
                  Hacer pedido
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOT HOJA FLOTANTE */}
      {openBot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="fixed top-30 bottom-12 left-8 right-8 z-50 p-6 bg-white rounded-3xl shadow-2xl border-2 border-orange-500 mx-auto max-h-[calc(100vh-6rem)] overflow-hidden"
        >
          {/* Líneas tipo cuaderno */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-neutral-300 opacity-20"
                style={{ top: `${i * 2}rem`, position: "absolute" }}
              />
            ))}
          </div>

          {/* Bot correspondiente */}
          <div className="relative z-10 h-full overflow-auto">{renderBot()}</div>

          {/* Botón cerrar */}
          <button
            onClick={() => setOpenBot(null)}
            className="absolute top-4 right-4 text-red-500 font-bold text-2xl hover:scale-125 transition z-20"
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  );
}
