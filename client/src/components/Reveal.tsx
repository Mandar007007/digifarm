import  { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface props {
  children: JSX.Element;
  width?: "fit-content" | "full";
}

export default function Reveal({ children  }: props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();


  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, scale: 0.7 , y : 100},
          visible: { opacity: 1, scale: 1 , y: 0},
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>  
  );
}