import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] =useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {
    if (replace) {
      setHistory(prev => {
        const newHistory = [...prev.slice(0, prev.length - 1), mode];
        setMode(mode);
        return newHistory;
      });
    } else {
      setMode(mode);
      setHistory(prev => [...prev, mode]);
    }


  }

  function back() {
    setMode(initial);
    setHistory(prev => {
      if (prev.length > 1) {
        const newHistory = [...prev.slice(0, prev.length - 1)];
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prev;
    }
    );
  }

  return {mode, transition, back};
}


