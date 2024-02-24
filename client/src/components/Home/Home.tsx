import RevealCards from "../RevealCards";
import Cards from "./Card";
import Hero from "./Hero";
import "./home.css";

import { motion } from "framer-motion";

export default function Home() {
  const cards = [
    {
      title: "Smart Crop Recommendations",
      disc: "Unlock the full potential of your farm with personalized crop recommendations based on soil type, climate, and other factors. Maximize your yield and profitability with expert advice tailored to your unique farming conditions.",
      imgSrc: "/6.png",
    },
    {
      title: "Plant Health Guardian",
      disc: "Ensure the well-being of your crops by detecting and addressing plant diseases in real-time. Simply capture a photo of the affected plant, and our advanced system will analyze and provide effective solutions to keep your farm thriving.",
      imgSrc: "/7.svg",
    },
    {
      title: "Crop Marketplace",
      disc: "Maximize your crop sales with our integrated auction platform. Showcase your harvest to a wide audience of buyers, and let them bid for the best quality produce. Experience a transparent and efficient way to sell your crops while getting the best value for your hard work.",
      imgSrc: "/8.png",
    },
  ];

  return (
    <>
      <div className="hero">
        <motion.div
          initial={{ opacity: 0, y: -300, scale: 0.4 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -400 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="background flex justify-center"
        >
          <Hero />
        </motion.div>
      </div>

      <div className="flex flex-col justify-center items-center mt-20 space-y-8">
        {cards.map((card, index) => {
          return (
            <RevealCards key={index}>
              <Cards
                even={index % 2 !== 0}
                key={index}
                title={card.title}
                disc={card.disc}
                imgSrc={card.imgSrc}
              />
            </RevealCards>
          );
        })}
      </div>
    </>
  );
}