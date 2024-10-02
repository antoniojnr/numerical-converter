"use client";

import { useState } from "react";
// import gitHubIcon from "/github-mark.svg";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [patternValue, setPatternValue] = useState("");
  const [selectedFromBase, setSelectedFromBase] = useState("2");
  const [selectedToBase, setSelectedToBase] = useState("");
  const [result, setResult] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFromBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFromBase(e.target.value);
    setInputValue("");
    setResult("");

    switch (e.target.value) {
      case "8":
        setPatternValue("[0-7]*");
        break;
      case "10":
        setPatternValue("[0-9]*");
        break;
      case "16":
        setPatternValue("[0-9A-F]*");
        break;
      default:
        setPatternValue("[01]*");
        break;
    }
  };

  const handleToBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedToBase(e.target.value);

    if (inputValue === "") return;

    calculateResult(
      parseInt(inputValue, parseInt(selectedFromBase)),
      e.target.value
    );
  };

  const calculateResult = (value: number, base: string) => {
    if (isNaN(value)) {
      setResult("");
      return;
    }

    if (base == "2") {
      let formattedBinary = value.toString(2);
      const mustPad = formattedBinary.length % 4 !== 0;
      const division = Math.floor(formattedBinary.length / 4);
      const pad = mustPad ? (division + 1) * 4 : formattedBinary.length;
      console.log("pad is", pad, "length is ", formattedBinary.length);
      formattedBinary = formattedBinary
        .padStart(pad, "0")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setResult(formattedBinary);
    } else {
      setResult(value.toString(parseInt(base)));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let mask;

    switch (selectedFromBase) {
      case "8":
        mask = /[^0-7]/g;
        break;
      case "10":
        mask = /[^0-9]/g;
        break;
      case "16":
        mask = /[^0-9A-F]/gi;
        break;
      default:
        mask = /[^01]/g;
    }
    const filteredValue = inputValue.replace(mask, "");
    setInputValue(filteredValue);
    if (selectedToBase != "") {
      calculateResult(
        parseInt(filteredValue, parseInt(selectedFromBase)),
        selectedToBase
      );
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-4 font-sans'>Numerical Converter</h1>

      <div className='w-full max-w-lg py-2 font-semibold font-sans'>
        Convert from
      </div>

      <div
        id='from'
        className='grid grid-cols-4 gap-2 justify-items-stretch w-full max-w-lg pb-4 text-sm font-sans'
      >
        <label className='cursor-pointer'>
          <input
            type='radio'
            name='fromBase'
            value='2'
            className='hidden peer'
            checked={selectedFromBase === "2"}
            onChange={handleFromBaseChange}
          />
          <div
            className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
          >
            <span className='block sm:hidden'>Bin</span>
            <span className='hidden sm:block'>Binary</span>
          </div>
        </label>

        <label className='cursor-pointer'>
          <input
            type='radio'
            name='fromBase'
            value='8'
            className='hidden peer'
            checked={selectedFromBase === "8"}
            onChange={handleFromBaseChange}
          />
          <div
            className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
          >
            <span className='block sm:hidden'>Oct</span>
            <span className='hidden sm:block'>Octal</span>
          </div>
        </label>

        <label className='cursor-pointer'>
          <input
            type='radio'
            name='fromBase'
            value='10'
            className='hidden peer'
            checked={selectedFromBase === "10"}
            onChange={handleFromBaseChange}
          />
          <div
            className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
          >
            <span className='block sm:hidden'>Dec</span>
            <span className='hidden sm:block'>Decimal</span>
          </div>
        </label>

        <label className='cursor-pointer'>
          <input
            type='radio'
            name='fromBase'
            value='16'
            className='hidden peer'
            checked={selectedFromBase === "16"}
            onChange={handleFromBaseChange}
          />
          <div
            className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
          >
            <span className='block sm:hidden'>Hex</span>
            <span className='hidden sm:block'>Hexadecimal</span>
          </div>
        </label>
      </div>

      <input
        type='text'
        value={inputValue}
        pattern={patternValue}
        onChange={handleInputChange}
        placeholder='Insert the number'
        className='w-full max-w-lg p-4 my-2 border focus:ring-2 ring-sky-400 rounded-lg text-lg font-mono'
      />

      <div className='w-full max-w-lg py-2 font-semibold font-sans'>
        Convert to
      </div>

      <div
        id='from'
        className='grid grid-cols-3 gap-2 w-full justify-items-stretch max-w-lg pb-4 p-2 text-sm font-sans'
      >
        {selectedFromBase !== "2" && (
          <label className='cursor-pointer'>
            <input
              type='radio'
              name='toBase'
              value='2'
              className='hidden peer'
              checked={selectedToBase === "2"}
              onChange={handleToBaseChange}
            />
            <div
              className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
            >
              <span className='block sm:hidden'>Bin</span>
              <span className='hidden sm:block'>Binary</span>
            </div>
          </label>
        )}

        {selectedFromBase !== "8" && (
          <label className='cursor-pointer'>
            <input
              type='radio'
              name='toBase'
              value='8'
              className='hidden peer'
              checked={selectedToBase === "8"}
              onChange={handleToBaseChange}
            />
            <div
              className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
            >
              <span className='block sm:hidden'>Oct</span>
              <span className='hidden sm:block'>Octal</span>
            </div>
          </label>
        )}

        {selectedFromBase !== "10" && (
          <label className='cursor-pointer'>
            <input
              type='radio'
              name='toBase'
              value='10'
              className='hidden peer'
              checked={selectedToBase === "10"}
              onChange={handleToBaseChange}
            />
            <div
              className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
            >
              <span className='block sm:hidden'>Dec</span>
              <span className='hidden sm:block'>Decimal</span>
            </div>
          </label>
        )}

        {selectedFromBase !== "16" && (
          <label className='cursor-pointer'>
            <input
              type='radio'
              name='toBase'
              value='16'
              className='hidden peer'
              checked={selectedToBase === "16"}
              onChange={handleToBaseChange}
            />
            <div
              className='bg-gray-200 peer-checked:bg-sky-500 peer-hover:bg-sky-400 peer-hover:text-white text-gray-800 
            peer-checked:text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out text-center'
            >
              <span className='block sm:hidden'>Hex</span>
              <span className='hidden sm:block'>Hexadecimal</span>
            </div>
          </label>
        )}
      </div>

      {result !== "" && (
        <div className='w-full max-w-lg'>
          <div className='bg-sky-100 text-sky-700 text-3xl text-center p-4 mb-2 rounded-md font-mono'>
            {result}
          </div>
          <div className='p-2 text-sm bg-sky-400 text-sky-100 rounded-md hidden'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-sky-100 p-1 rounded-lg hover:text-sky-200 focus:outline-none'
            >
              Explain
            </button>

            <div
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                isExpanded ? "max-h-96" : "max-h-0"
              } mt-2 bg-gray-200 text-gray-700 p-2`}
            >
              To be implemented.
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-center mt-6'>
        <a
          href='https://github.com/antoniojnr/numerical-converter'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm'
        >
          <img src='/github-mark.svg' alt='GitHub' className='w-4 h-4' />
          <span className='font-medium'>View on GitHub</span>
        </a>
      </div>
    </div>
  );
}
