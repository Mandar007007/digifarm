import  { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface props {
  children: JSX.Element;
  width?: "fit-content" | "full";
}

export default function RevealCards({ children  }: props) {
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
          hidden: { opacity: 0, scale: 0.6 , x : 0},
          visible: { opacity: 1, scale: 1 , x: 0},
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration:2 , delay: 0.1 , type : "spring" , stiffness : 40} }
      >
        {children}
      </motion.div>  
  );
}