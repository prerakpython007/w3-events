"use client"
import { useEffect, useState } from "react"
import { Yatra_One } from "next/font/google"
import Image from "next/image"

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
})

const LogoCarousel = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const logos = [
    { id: 1, src: "/l1.png", alt: "Logo 1" },
    { id: 2, src: "/l2.jpeg", alt: "Logo 2" },
    { id: 3, src: "/l3.png", alt: "Logo 3" },
    { id: 7, src: "/l7.png", alt: "Logo 7" },
    { id: 8, src: "/l8.png", alt: "Logo 8" },
    { id: 9, src: "/l9.png", alt: "Logo 9" },
    { id: 10, src: "/l10.png", alt: "Logo 10" },
    { id: 11, src: "/l11.png", alt: "Logo 11" },
    { id: 12, src: "/l12.jpeg", alt: "Logo 12" },
    { id: 13, src: "/l13.png", alt: "Logo 13" },
    { id: 14, src: "/l14.jpg", alt: "Logo 14" },
    { id: 15, src: "/l15.png", alt: "Logo 15" },
    { id: 16, src: "/l16.jpeg", alt: "Logo 16" },
    { id: 17, src: "/l17.png", alt: "Logo 17" },
    { id: 18, src: "/l18.png", alt: "Logo 18" },
    { id: 19, src: "/l19.png", alt: "Logo 19" },
    { id: 20, src: "/l20.png", alt: "Logo 20" },
    { id: 22, src: "/l22.jpeg", alt: "Logo 22" },
    { id: 23, src: "/l23.png", alt: "Logo 23" },
    { id: 24, src: "/l24.png", alt: "Logo 24" },
    { id: 25, src: "/l25.png", alt: "Logo 25" },
    { id: 26, src: "/l26.jpeg", alt: "Logo 26" },
    { id: 27, src: "/l27.jpg", alt: "Logo 27" },
    { id: 28, src: "/l28.jpg", alt: "Logo 28" },
    { id: 29, src: "/l29.jpg", alt: "Logo 29" },
    { id: 30, src: "/l30.jpg", alt: "Logo 30" },
    { id: 31, src: "/l31.jpg", alt: "Logo 31" },
    { id: 32, src: "/l32.jpg", alt: "Logo 32" },
    { id: 33, src: "/l33.jpg", alt: "Logo 33" },
    { id: 34, src: "/l34.jpg", alt: "Logo 34" },
    { id: 35, src: "/l35.jpg", alt: "Logo 35" },
    { id: 36, src: "/l36.jpg", alt: "Logo 36" },
    { id: 37, src: "/l37.jpg", alt: "Logo 37" },
    { id: 38, src: "/l38.jpg", alt: "Logo 38" },
    { id: 39, src: "/l39.jpg", alt: "Logo 39" },
    { id: 40, src: "/l40.jpg", alt: "Logo 40" },
    { id: 41, src: "/l41.jpg", alt: "Logo 41" },
    { id: 42, src: "/l42.jpg", alt: "Logo 42" },
  ]

  const repeatedLogos = [...logos, ...logos, ...logos]

  return (
    <div className="overflow-hidden lg:mb-44 w-full">
      <div className="max-w-[92vw] md:max-w-[96vw] mx-auto">
        <h2 className={`text-white ${yatraOne.className} text-3xl md:text-5xl font-medium text-center py-6 md:py-10`}>
          Our Frens
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-4 md:gap-7 infinite-scroll">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[120px] md:min-w-[160px]"
              >
                <Image
                  width={160}
                  height={48}
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-8 md:h-12 w-auto object-contain"
                  priority={index < 42}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-200%)); /* Adjust to accommodate all items */
          }
        }

        .infinite-scroll {
          width: 300%; /* Expand width to fit all logos */
          animation: infinite-scroll ${isMobile ? "60s" : "50s"} linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default LogoCarousel
