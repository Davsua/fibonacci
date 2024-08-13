import React, { createContext, useState, useContext } from 'react';

const FibonacciContext = createContext();

export const FibonacciProvider = ({ children }) => {
  const [fibonacciSr, setFibonacciSr] = useState([]);
  const [showSeries, setShowSeries] = useState(false);
  const [history, setHistory] = useState([]);

  const calculateFibonacci = () => {
    setFibonacciSr([]);
    const now = new Date();
    const seed1 = now.getMinutes();
    const seed2 = now.getSeconds();
    const count = now.getSeconds();

    const generateFibonacci = (n1, n2, count) => {
      if (count <= 0) {
        return;
      }
      setFibonacciSr(prevSeries => [...prevSeries, n1 + n2]);
      generateFibonacci(n2, n1 + n2, count - 1);
    };

    generateFibonacci(seed1, seed2, count);
    setShowSeries(true);

    setHistory(prevHistory => {
        const newHistory = [{ id: Date.now(), sequence: [...fibonacciSr].reverse() }, ...prevHistory];
        return newHistory.slice(0, 3);
      });
  };

  return (
    <FibonacciContext.Provider value={{ fibonacciSr, showSeries, calculateFibonacci, history }}>
      {children}
    </FibonacciContext.Provider>
  );
};

export const useFibonacci = () => useContext(FibonacciContext);