import { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorAmount, setErrorAmount] = useState(false);
  const [errorTerm, setErrorTerm] = useState(false);
  const [errorRate, setErrorRate] = useState(false);
  const [errorRadio, setErrorRadio] = useState(false);

  const setError = (field, value) => {
    switch (field) {
      case 'amount':
        setErrorAmount(value);
        break;
      case 'term':
        setErrorTerm(value);
        break;
      case 'rate':
        setErrorRate(value);
        break;
      case 'radio':
        setErrorRadio(value);
        break;
      default:
        break;
    }
  };

  return (
    <ErrorContext.Provider value={{ 
      errorAmount, 
      errorTerm, 
      errorRate, 
      errorRadio, 
      setError 
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
