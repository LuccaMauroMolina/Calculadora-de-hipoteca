    /*Math.abs(x): Devuelve el valor absoluto de x.
    Math.acos(x): Devuelve el arco coseno de x, en radianes.
    Math.asin(x): Devuelve el arco seno de x, en radianes.
    Math.atan(x): Devuelve el arco tangente de x, en radianes.
    Math.atan2(y, x): Devuelve el arco tangente del cociente y/x, en radianes.
Math.ceil(x): Devuelve el entero mayor o igual más cercano a x.
Math.cos(x): Devuelve el coseno de x, en radianes.
Math.exp(x): Devuelve e elevado a la potencia de x, donde e es la base de los logaritmos naturales.
Math.floor(x): Devuelve el entero menor o igual más cercano a x.
Math.log(x): Devuelve el logaritmo natural (base e) de x.
Math.max(a, b, c, ...): Devuelve el valor máximo de los argumentos proporcionados.
Math.min(a, b, c, ...): Devuelve el valor mínimo de los argumentos proporcionados.
Math.pow(base, exponent): Devuelve el valor de base elevado a la potencia de exponent.
Math.random(): Devuelve un número pseudoaleatorio entre 0 (inclusive) y 1 (exclusivo).
Math.round(x): Devuelve el valor de x redondeado al entero más cercano.
Math.sin(x): Devuelve el seno de x, en radianes.
Math.sqrt(x): Devuelve la raíz cuadrada de x.
Math.tan(x): Devuelve la tangente de x, en radianes.
Math.trunc(x): Devuelve la parte entera de x, eliminando la fracción.*/
    

/*Tasa de interes a tasa mensual
Interes = 5.25
mensual = 12
*/

//plazo de hipoteca años convertirlo a meses
/*
plazo = 25
meses = 12
*/

/*import { useState } from 'react';
import "./Calculadora.css"

const Calculadora = ({ onCalcular}) => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [rate, setRate] = useState('');
    const [numero, setNumero] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [mostrar, setMostrar] = useState([]);
    const [month, setMonth] = useState('');

    const handleKeyUp = () => {
        console.log("Key Up Event Triggered: ", amount);
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        onCalcular(); // Llama a la función de cálculo pasada como prop
    };

    /*const manejarCalculo = () => {
        if (month.trim() === '') {
            alert('Por favor, introduce una cantidad.');
            return;
        }
        setResultados([...resultados, { num: numero, month: month }]);
    };
    const manejarCalculo = () => {
        if (month.trim() === '') {
            alert('Por favor, introduce una cantidad.');
            return;
        }
        setResultados([...resultados, { num: numero, month: month }]);
    };

    const manejarMostrar = () => {
        if (month.trim() === '') {
            alert('Por favor, introduce un nombre.');
            return;
        }
        setMostrar([...mostrar, { num: numero, month: month }]);
        setNumero(prevNumero => prevNumero + 1);
    };




    return (
        <>
        <section className="sect-1">
            <form action="">
                <div className="form-mort">
                <input
                type="text"
                onChange={e => setMonth(e.target.value)}
                value={month}
                placeholder="Introduce un nombre"
                onKeyUp={e => {
                    if (e.key === 'Enter') manejarMostrar();
                }}
            />
                    <label htmlFor="amount">Mortgage Amount</label>
                    <input
                        type="number"
                        className="amount"
                        id="amount"
                        onChange={e => setAmount(e.target.value)}
                        onKeyUp={handleCalculate}
                        value={amount}
                    />
                    <label htmlFor="mort">Mortgage Term</label>
                    <input
                        type="number"
                        className="mort"
                        id="mort"
                        onChange={e => setTerm(e.target.value)}
                        onKeyUp={handleKeyUp}
                        value={term}
                    />
                    <label htmlFor="rate">Interest Rate</label>
                    <input
                        type="number"
                        className="mort"
                        id="rate"
                        onChange={e => setRate(e.target.value)}
                        onKeyUp={handleKeyUp}
                        value={rate}
                    />
                </div>
                <div>
                    <label htmlFor="">Mortgage Type</label>
                    <input type="checkbox"/>
                    <p>Repayment</p>
                    <input type="checkbox"/>
                    <p>Interest Only</p>
                </div>
                <button id="btn" className="btn" onClick={handleCalculate} value={numero} >
                    <img src="../public/images/icon-calculator.svg" alt="" />
                    Calculate Repayments
                </button>

            </form>
            <div>
            </div>
        </section>
        </>
    );
};

export default Calculadora;*/




//import MostrarResultados from '../MostrarResultado/MostrarResultados';
import { useState } from 'react';
import './Calculadora.css';
import MostrarResultados from '../MostrarResultado/MostrarResultados';

const Calculadora = () => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [rate, setRate] = useState('');
    const [resultados, setResultados] = useState([]); // Nuevo estado para los resultados

    const handleCalculate = (e) => {
        e.preventDefault();
        // Calcular el total (esto es solo un ejemplo, ajusta el cálculo según tus necesidades)
        let resultado = parseFloat(amount) + parseFloat(term) + parseFloat(rate);
        // Crear el nuevo resultado
        const nuevoResultado = {
            amount,
            term,
            rate,
            total: resultado
        };
        // Actualizar el estado de resultados
        setResultados([...resultados, nuevoResultado]);
    };


    return (
        <>
            <section className="sect-1">
                <form onSubmit={handleCalculate}>
                    <div className="form-mort">
                        <label htmlFor="amount">Mortgage Amount</label>
                        <input
                            type="number"
                            id="amount"
                            onChange={e => setAmount(e.target.value)}
                            value={amount}
                            placeholder="Enter amount"
                        />
                        <label htmlFor="mort">Mortgage Term</label>
                        <input
                            type="number"
                            id="mort"
                            onChange={e => setTerm(e.target.value)}
                            value={term}
                            placeholder="Enter term"
                        />
                        <label htmlFor="rate">Interest Rate</label>
                        <input
                            type="number"
                            id="rate"
                            onChange={e => setRate(e.target.value)}
                            value={rate}
                            placeholder="Enter rate"
                        />
                    </div>
                    <div>
                        <label htmlFor="repayment">Mortgage Type</label>
                        <input type="checkbox" id="repayment" />
                        <label htmlFor="repayment">Repayment</label>
                        <input type="checkbox" id="interest-only" />
                        <label htmlFor="interest-only">Interest Only</label>
                    </div>
                    <button
                        id="btn"
                        className="btn"
                        type="submit"
                    >
                        <img src="../public/images/icon-calculator.svg" alt="Calculate Icon" />
                        Calculate Repayments
                    </button>
                </form>
            </section>
            <MostrarResultados resultados={resultados} />
        </>
    );
};

export default Calculadora;


//<MostrarResultados resultados={resultados} />