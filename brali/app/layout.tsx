import "./globals.css";

export const metadata = {
  title: "Brali Pizzas & Bebidas",
  description: "Las mejores pizzas artesanales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
