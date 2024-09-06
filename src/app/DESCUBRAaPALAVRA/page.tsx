"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const wordList = [
  "AMOR",
  "FATO",
  "MITO",
  "COMO",
  "CAOS",
  "ESMO",
  "BRIO",
  "VIDE",
  "SEDE",
  "VIDA",
  "CASA",
  "SAGA",
  "MEDO",
  "AUGE",
  "ÔNUS",
  "ERMO",
  "SINA",
  "SUMA",
  "MOTE",
  "MAIS",
  "PELA",
  "TOLO",
  "URGE",
  "IDEM",
  "ZELO",
  "CRER",
  "APTO",
  "TUDO",
  "VEIO",
  "PUDE",
  "AMAR",
  "RUIM",
  "PARA",
  "RUDE",
  "COXO",
  "ATER",
  "COTA",
  "DOCE",
  "SOAR",
  "FASE",
  "ENTE",
  "AUTO",
  "LOGO",
  "VOGA",
  "DEUS",
  "ONDE",
  "PELO",
  "ALMA",
  "ARTE",
  "SIDO",
  "ANTE",
  "JUGO",
  "RIMA",
  "CEDO",
  "MEIO",
  "META",
  "TRAZ",
  "NUMA",
  "SELA",
  "CUJO",
  "ISSO",
  "NOIA",
  "CELA",
  "TEOR",
  "SAIR",
  "FACE",
  "ASCO",
  "NOJO",
  "ALVO",
  "FOCO",
  "ALTO",
  "POSE",
  "BASE",
  "AGIR",
  "VALE",
  "TEVE",
  "EITA",
  "RITO",
  "NOVO",
  "ALVA",
  "TESE",
  "BOJO",
  "ALTA",
  "QUER",
  "NADA",
  "NEXO",
  "ORLA",
  "ÚTIL",
  "HOJE",
  "FRIO",
  "MERO",
  "REGE",
  "BOLA",
  "CASO",
  "FORA",
  "JOIA",
  "SEIO",
  "ESTE",
];

function getBackgroundColorClass(correctCount: number) {
  if (correctCount === 0) {
    return "bg-red-500"; // Red background if correctCount = 0
  } else if (correctCount <= 3) {
    return "bg-green-500"; // Green background if correctCount > 0
  }
  return "bg-gray-500"; // Default background color
}

export default function PALAVRA() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const [word, setWord] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showWord, setShowWord] = useState<boolean>(false);
  const [lastGuess, setLastGuess] = useState<string>("");

  function generateWord() {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(randomWord);
    setCorrectCount(0);
    setInputValues(["", "", "", ""]);
    setHasWon(false);
    setShowWord(false);
    setLastGuess("");
    inputRefs.current[0]?.focus();
  }

  function checkWord() {
    if (inputValues.some((val) => val === "")) {
      alert("Incompleto!");
      return;
    }

    let correct = 0;
    for (let i = 0; i < 4; i++) {
      if (inputValues[i] === word[i]) {
        correct++;
      }
    }

    setCorrectCount(correct);
    setLastGuess(inputValues.join(""));
    setInputValues(["", "", "", ""]);

    if (correct === 4) {
      setHasWon(true);
      setInputValues(["", "", "", ""]);
      alert("Você descobriu a palavra!");
      return;
    }
  }

  function toggleShowWord() {
    setShowWord(!showWord);
  }

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text.toUpperCase();
    setInputValues(newInputValues);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkWord();
      inputRefs.current[0]?.focus();
    }
  };

  useEffect(() => {
    generateWord();
  }, []);

  return (
    <>
      <div
        onClick={goBack}
        className="absolute tablet:p-24 p-12 font-mono hover:underline cursor-pointer"
      >
        VOLTAR
      </div>
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-black text-white font-mono p-4">
        <h1 className="font-mono text-green-400 text-2xl mb-4">
          Descubra a palavra!
        </h1>
        <div className="w-60 border-b border-white mb-8"></div>

        {/* Word Display */}
        <div className="flex flex-col justify-center items-center w-60 mb-4 gap-6">
          <div className="flex flex-row space-x-4 items-center">
            {showWord || hasWon
              ? word
                  .split("")
                  .map((char, index) => (
                    <input
                      key={index}
                      className="w-16 h-16 bg-black text-white border-2 border-white rounded-lg text-center text-2xl cursor-default"
                      value={char}
                      readOnly
                    />
                  ))
              : Array(4)
                  .fill("_")
                  .map((_, index) => (
                    <input
                      key={index}
                      className="w-16 h-16 bg-black text-white border-2 border-white rounded-lg text-center text-2xl cursor-default"
                      value="_"
                      readOnly
                    />
                  ))}
          </div>

          {/* Correct Count Display */}
          <p
            className={`text-xl border w-full text-center ${getBackgroundColorClass(
              correctCount
            )}`}
          >
            Letra corretas: {correctCount}
          </p>
        </div>

        {/* Your Guess */}
        <div className="mb-4 text-xl">
          <p>Seu palpite: {lastGuess || "None"}</p>
        </div>

        {/* Input Fields for Guess */}
        <div className="flex space-x-4 mb-8">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-16 h-16 bg-black text-white border-2 border-white rounded-lg text-center text-2xl focus:outline-none"
              maxLength={1}
              type="text"
              pattern="[a-z]"
              value={inputValues[index]}
              onChange={(e) =>
                handleChangeText(
                  (e.target as HTMLInputElement).value.toLowerCase(),
                  index
                )
              }
              onInput={(e) => {
                const inputElement = e.target as HTMLInputElement;
                inputElement.value = inputElement.value.toLowerCase();
              }}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
              onClick={checkWord}
            >
              Checar palavra
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
              onClick={toggleShowWord}
            >
              {showWord ? "esconder resposta" : "mostrar resposta"}
            </button>
          </div>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition w-full"
            onClick={generateWord}
          >
            Novo Jogo
          </button>
        </div>
      </div>
    </>
  );
}
