"use client";

import { useEffect, useState } from "react";

export default function BebidasBot() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        "¡Hola! 👋 Bienvenido a la sección de Bebidas.",
        "Vamos a tomar tu pedido 🥤",
      ]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      {messages.map((msg, idx) => (
        <div key={idx} className="mb-4 bg-orange-100 text-black px-4 py-2 rounded-lg">
          {msg}
        </div>
      ))}
    </div>
  );
}
