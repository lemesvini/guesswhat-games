"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToGame1 = () => {
    router.push("/CRACKTheCODE");
  }
  const goToGame2 = () => {
    router.push("/GUESSTheWORD");
  }

  const text = "select a game:";

  // Create an array of each character in the text
  const letters = Array.from(text);

  // Animation variants for each letter
  const letterAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15, // Delays each letter a bit
        duration: 0, // Short, snappy duration to simulate typing
        ease: "linear", // Linear transition for no easing
      },
    }),
  };

  return (
    <>
      <motion.div className="flex flex-col h-screen w-full justify-center items-center">
        <motion.div className="pb-12">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="font-mono text-green-400 text-lg"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="flex flex-col gap-3"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 3, duration: 0,  ease: "linear"}}
        >
          <motion.div
            onClick={goToGame1}
            className="w-96 py-3 flex flex-row border px-3 bg-transparent font-black"
            transition={{duration: 0, ease: "linear"}}
            whileHover={{ backgroundColor: "#e6f0e9", x: 1, y: 1, color: "black", cursor: "pointer", border: "1", borderColor: "white", fontWeight: "900" }}
          >
              <span>GAME 1 - <i className="font-normal font-mono">CRACK THE CODE</i></span>
          </motion.div>
          <motion.div
            onClick={goToGame2}
            className="w-96 py-3 border px-3 bg-transparent font-black"
            transition={{duration: 0, ease: "linear"}}
            whileHover={{ backgroundColor: "#e6f0e9", x: 1, y: 1, color: "black", cursor: "pointer", border: "1", borderColor: "white", fontWeight: "900" }}
          >
            <span>GAME 2 - <i className="font-normal font-mono">GUESS THE WORD</i></span>
          </motion.div>          
        </motion.div>
      </motion.div>
    </>
  );
}
