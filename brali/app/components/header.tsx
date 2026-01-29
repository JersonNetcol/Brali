"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div className="relative pointer-events-auto">
        
        {/* BORDE SERPIENTE */}
        <div className="absolute -inset-[2px] rounded-full snake-border blur-sm" />

        {/* ISLA */}
        <div
          className="
            relative
            flex items-center gap-10
            px-10 h-20
            rounded-full
            bg-black/80
            backdrop-blur-xl
            shadow-[0_30px_70px_rgba(0,0,0,0.55)]
          "
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Brali Pizza"
              width={56}
              height={56}
              priority
              className="hover:scale-110 transition-transform"
            />
          </Link>

          {/* REDES */}
          <div className="flex items-center gap-7">
            <SocialIcon
              href="https://www.instagram.com/brali.pizza/"
              icon="/instagram.png"
              alt="Instagram"
            />
            <SocialIcon
              href="https://www.tiktok.com/@brali2025"
              icon="/tiktok.png"
              alt="TikTok"
            />
            <SocialIcon
              href="https://www.facebook.com/"
              icon="/facebook.png"
              alt="Facebook"
            />
            <SocialIcon
              href="https://wa.me/573011406686"
              icon="/whatsapp.png"
              alt="WhatsApp"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function SocialIcon({
  href,
  icon,
  alt,
}: {
  href: string;
  icon: string;
  alt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition-transform"
    >
      <Image src={icon} alt={alt} width={36} height={36} />
    </a>
  );
}
