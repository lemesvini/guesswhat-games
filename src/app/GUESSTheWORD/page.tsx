"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const wordList = [
  "BARN",
  "KEEP",
  "LAND",
  "FIST",
  "BAKE",
  "MILD",
  "FISH",
  "SAND",
  "MOON",
  "CAVE",
  "WIND",
  "TIME",
  "TURN",
  "RAIN",
  "FIRE",
  "LEAF",
  "STAR",
  "COLD",
  "WALL",
  "BELT",
  "FACE",
  "MILK",
  "HAND",
  "LUCK",
  "GIFT",
  "DARK",
  "WOLF",
  "SNOW",
  "ROCK",
  "GAME",
  "WALK",
  "BLUE",
  "TREE",
  "FOOT",
  "GOLD",
  "SALT",
  "SHIP",
  "ROAD",
  "FARM",
  "BIRD",
  "DEEP",
  "DOOR",
  "SEED",
  "TOOL",
  "PATH",
  "CLAY",
  "CROW",
  "WAVE",
  "HEAD",
  "WOLF",
  "GROW",
  "NOTE",
  "FORK",
  "PLAN",
  "DROP",
  "FLOW",
  "RING",
  "MOON",
  "SKIN",
  "FLAG",
  "SLOW",
  "RIDE",
  "LAKE",
  "GLOW",
  "BAND",
  "FEAR",
  "COAT",
  "ROOF",
  "KING",
  "HILL",
  "BOOT",
  "IRON",
  "LAMP",
  "WAVE",
  "JUMP",
  "PICK",
  "SINK",
  "LOCK",
  "PACK",
  "COIN",
  "RUSH",
  "BALL",
  "MARK",
  "BELL",
  "COOK",
  "SHOP",
  "CARD",
  "WAVE",
  "PLAY",
  "ROLL",
  "SAIL",
  "BOOK",
  "KICK",
  "CHIP",
  "POST",
  "BIKE",
  "DUST",
  "HORN",
  "FARM",
  "PALM",
];

function getBackgroundColorClass(correctCount: number) {
  if (correctCount === 0) {
    return "bg-red-500"; // Red background if correctCount = 0
  } else if (correctCount <= 3) {
    return "bg-green-500"; // Green background if correctCount > 0
  }
  return "bg-gray-500"; // Default background color
}

export default function WORD() {
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
      alert("Incomplete Input. Please fill in all letters.");
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
      alert("You Won! Congratulations, you guessed the word correctly!");
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
        GO BACK
      </div>
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-black text-white font-mono p-4">
        <h1 className="font-mono text-green-400 text-2xl mb-4">
          Guess the Word!
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
            Correct Letters: {correctCount}
          </p>
        </div>

        {/* Your Guess */}
        <div className="mb-4 text-xl">
          <p>Your Guess: {lastGuess || "None"}</p>
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
              Check Word
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
              onClick={toggleShowWord}
            >
              {showWord ? "Hide Word" : "Show Word"}
            </button>
          </div>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition w-full"
            onClick={generateWord}
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
}
