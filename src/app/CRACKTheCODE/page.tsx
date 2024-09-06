"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const charset = "0123456789";

function getBackgroundColorClass(correctCount: number) {
  if (correctCount === 0) {
    return "bg-red-500"; 
  } else if (correctCount <= 3) {
    return "bg-green-500"; 
  }
  return "bg-gray-500"; 
}

export default function Index() {

  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  const [number, setNumber] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [lastGuess, setLastGuess] = useState<string>("");

  function generateNumber() {
    let numbers = "";
    for (let i = 0, n = charset.length; i < 4; i++) {
      numbers += charset.charAt(Math.floor(Math.random() * n));
    }
    setNumber(numbers);
    setCorrectCount(0);
    setInputValues(["", "", "", ""]);
    setHasWon(false);
    setShowNumbers(false);
    setLastGuess("");
    inputRefs.current[0]?.focus();
  }

  function checkNumbers() {
    if (inputValues.some((val) => val === "")) {
      alert("Incomplete Input. Please fill in all digits.");
      return;
    }

    let correct = 0;
    for (let i = 0; i < 4; i++) {
      if (inputValues[i] === number[i]) {
        correct++;
      }
    }

    setCorrectCount(correct);
    setLastGuess(inputValues.join(""));
    setInputValues(["", "", "", ""]);

    if (correct === 4) {
      setHasWon(true);
      setInputValues(["", "", "", ""]);
      alert("You Won! Congratulations, you guessed the number correctly!");
      return;
    }
  }

  function toggleShowNumbers() {
    setShowNumbers(!showNumbers);
  }

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkNumbers();
      inputRefs.current[0]?.focus(); 
    }
  };

  useEffect(() => {
    generateNumber(); 
  }, []);

  return (
    <>
      <div onClick={goBack} className="absolute tablet:p-24 p-12 font-mono hover:underline cursor-pointer">GO BACK</div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono p-4">
        <h1 className="font-mono text-green-400 text-2xl mb-4">
          Guess the Number!
        </h1>
        <div className="w-60 border-b border-white mb-8"></div>

        {/* Number Display */}
        <div className="flex flex-col justify-center items-center w-60 mb-4 gap-6">
          <div className="flex flex-row space-x-4 items-center">
            {showNumbers || hasWon
              ? number
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
                  .fill("#")
                  .map((_, index) => (
                    <input
                      key={index}
                      className="w-16 h-16 bg-black text-white border-2 border-white rounded-lg text-center text-2xl cursor-default"
                      value="#"
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
            Correct Digits: {correctCount}
          </p>
        </div>

        {/* Your Guess */}
        <div className="mb-4 text-xl">
          <p>Your Guess: {lastGuess || "None"}</p>
        </div>

        {/* Input Fields for Guess */}
        <div className="flex space-x-4 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-16 h-16 bg-black text-white border-2 border-white rounded-lg text-center text-2xl focus:outline-none"
              maxLength={1}
              value={inputValues[index]}
              
              onChange={(e) => handleChangeText(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
              onClick={checkNumbers}
            >
              Check Numbers
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
              onClick={toggleShowNumbers}
            >
              {showNumbers ? "Hide Numbers" : "Show Numbers"}
            </button>
          </div>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition w-full"
            onClick={generateNumber}
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
}
