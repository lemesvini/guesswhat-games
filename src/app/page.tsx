"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import br from "../../public/br.svg";
import us from "../../public/us.svg";
import checked from "../../public/checked.svg";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");

  const router = useRouter();

  const goToGame1 = () => {
    if (lang === "en") {
      router.push("/CRACKTheCODE");
    } else {
      router.push("/QUEBREoCODIGO");
    }
  };
  const goToGame2 = () => {
    if (lang === "en"){
      router.push("/GUESSTheWORD");
    } else {
      router.push("/DESCUBRAaPALAVRA")
    }
    
  };

  const text = lang === "en" ? "select a game:" : "escolha um jogo:";
  const gameTitle1 = lang === "en" ? "GAME 1" : "JOGO 1";
  const gameTitle2 = lang === "en" ? "GAME 2" : "JOGO 2";
  const game1Label = lang === "en" ? " CRACK THE CODE" : " QUEBRE O CÓDIGO";
  const game2Label = lang === "en" ? " GUESS THE WORD" : " DESCUBRA A PALAVRA";

  const letters = Array.from(text);

  const letterAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0,
        ease: "linear",
      },
    }),
  };

  const changeLanguage = (lang: string) => {
    setLang(lang);
  };

  return (
    <>
      <motion.div className="flex flex-col h-[100dvh] w-full justify-center items-center bg-[#0A0A0A]">
        <motion.div className="pb-12" key={lang}>
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

        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0, ease: "linear" }}
        >
          <motion.div
            onClick={goToGame1}
            className="w-80 py-3 flex flex-row text-sm justify-between border px-3 bg-transparent font-black"
            transition={{ duration: 0, ease: "linear" }}
            whileHover={{
              backgroundColor: "#e6f0e9",
              x: 1,
              y: 1,
              color: "black",
              cursor: "pointer",
              border: "1",
              borderColor: "white",
              fontWeight: "900",
            }}
          >
            <span>
              {gameTitle1} -
              <i className="font-normal font-mono">{game1Label}</i>
            </span>
            <span className="text-gray-800">
              {"["} 1 - 9 {"]"}
            </span>
          </motion.div>
          <motion.div
            onClick={goToGame2}
            className="w-80 py-3 flex flex-row text-sm justify-between border px-3 bg-transparent font-black"
            transition={{ duration: 0, ease: "linear" }}
            whileHover={{
              backgroundColor: "#e6f0e9",
              x: 1,
              y: 1,
              color: "black",
              cursor: "pointer",
              border: "1",
              borderColor: "white",
              fontWeight: "900",
            }}
          >
            <span>
              {gameTitle2} -
              <i className="font-normal font-mono">{game2Label}</i>
            </span>
            <span className="text-gray-800">
              {"["} a - z {"]"}
            </span>
          </motion.div>
        </motion.div>

        {/* Language Switcher with checkmark */}
        <motion.div className="absolute flex flex-row bottom-2 px-3 py-2 right-2 mb-3 border gap-3">
          {/* English Flag */}
          <div className="relative cursor-pointer" onClick={() => changeLanguage("en")}>
            <Image src={us} alt="usa flag" height={30} width={30} />
            {lang === "en" && (
              <Image
                src={checked}
                alt="checked"
                height={15}
                width={15}
                className="absolute top-0 left-[20px] rounded-full border bg-green-500"
              />
            )}
          </div>

          {/* Brazilian Flag */}
          <div className="relative cursor-pointer" onClick={() => changeLanguage("pt")}>
            <Image src={br} alt="br flag" height={30} width={30} />
            {lang === "pt" && (
              <Image
                src={checked}
                alt="checked"
                height={15}
                width={15}
                className="absolute top-0 left-[20px] rounded-full border bg-green-500"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
