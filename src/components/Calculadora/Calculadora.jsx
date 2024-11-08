import { useState} from 'react';
import './Calculadora.css';
import MostrarResultados from '../MostrarResultado/MostrarResultados';


const Calculadora = ({ onCalcular }) => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [rate, setRate] = useState("");
    const [resultados, setResultados] = useState([]);
    const [radio, setRadio] = useState('');
    const [tecla, setTecla] = useState('');
    const [lime, setLime] = useState({
        amount: "initial color",
        term: "initial color",
        rate: "initial color",
    })
    const [colorRed, setColorRed] = useState("hsl(4, 69%, 50%)")
    const [showErrorAmount, setShowErrorAmount] = useState(false);



    const repayment = () => {
        const p = parseFloat(amount);
        const annualRate = parseFloat(rate);
        const r = annualRate / 100 / 12;
        const n = parseInt(term) * 12;
        
        if (r === 0) return p / n;

        const m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return m;
    };

    const interest = () => {
        const p = parseFloat(amount)
        const rI = parseFloat(rate) / 100
        const t = parseFloat(term)
        const iTotal = p * rI * t

        return iTotal
    }

    const reembolso = () => {
        const p = parseFloat(amount);
        const monthlyPayment = repayment(); // Llamar a la función de reembolso
        const n = parseInt(term) * 12; // Número total de pagos
    
        const totalReembolso = monthlyPayment * n * p; // Total a reembolsar
        return totalReembolso;
    };
    

    const evento = (e) => {
        if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
            e.preventDefault()
            setTecla(e.key)
            console.log(tecla)
        }
    }


    const handleCalculate = (e) => {
        e.preventDefault();
        
        let totalRepayment = 0;
        let totalInterest = 0;
        let totalReembolso = 0

        if (radio === "repayment") {
            totalRepayment = repayment();
        } else if (radio === "interest-only") {
            totalInterest = interest();
        }

        //totalRepayment = (radio === "repayment") ? repayment() : (radio === "interest-only" ? interest() : null);

        if(totalRepayment == totalInterest){
            totalReembolso = reembolso()
        }

        const formattedTotalRepayment = parseFloat(totalRepayment).toFixed(2);
        const formattedTotalInterest = parseFloat(totalInterest).toFixed(2);
        const formattedTotalReembolso = parseFloat(totalReembolso).toFixed(2)
        // Crear el nuevo resultado
        const nuevoResultado = {
            amount,
            term,
            rate,
            totalRepayment: formattedTotalRepayment,
            totalInterest: formattedTotalInterest,
            totalReembolso: formattedTotalReembolso,
            tipo: radio
        };


        // Actualizar el estado de resultados
            setResultados([...resultados, nuevoResultado]);
        // Pasar el resultado a la función padre
        onCalcular(amount, term, rate, radio, formattedTotalRepayment, formattedTotalInterest, formattedTotalReembolso);
    };

    const clearAll = () => {
        setAmount("");
        setTerm("");
        setRate("");
        setResultados([]);
        setRadio('');
        setTecla('');
    };

    const colorLime = (input) => {
        setLime((colors) => ({
            ...colors,
            [input]: amount === "" ? "hsl(61, 70%, 52%)" : colors[input],
        }));
    };
    
    const handleInputChange = (setter, value, input) => {
        setter(value);
        // Si el campo está vacío, mostrar el mensaje de error
        if (value === "") {
          setShowErrorAmount(true); // Mostrar el error cuando el campo está vacío
            setLime((colors) => ({
            ...colors,
            [input]: "hsl(203, 41%, 72%)", // Color gris cuando está vacío
            }));
        } else {
          setShowErrorAmount(false); // Ocultar el error si hay valor
            setLime((colors) => ({
            ...colors,
            [input]: "hsl(61, 70%, 52%)", // Color normal cuando tiene valor
            }));
        }
        };

        if (value === "") {
            setColorRed(); // Cambia el color a rojo si el campo está vacío
        }
    };
    
    const handleBlur = (value, input) => {
        // Cuando el input pierde el foco
        if (value === "") {
          setShowErrorAmount(true); // Asegurarse de que el mensaje de error se muestre si está vacío
            setLime((prevColors) => ({
            ...prevColors,
            [input]: "hsl(203, 41%, 72%)",  // Gris cuando está vacío al perder el foco
            }));
        }
    };
    
    return (
        <>
            <section className="sect-1">
                    <div className='calculator'>
                        <h1>Mortgage Calculator</h1>
                        <button className='clear' onClick={clearAll}>Clear All</button>
                    </div>
                <form onSubmit={handleCalculate}>
                    <div className="form-mort">
                        <label htmlFor="amount">Mortgage Amount</label>
                        <input
                        type="number"
                        id="amount"
                        className='numbers'
                        onChange={e => handleInputChange(setAmount, e.target.value, "amount")}
                        value={amount}
                        placeholder="£"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.amount}`, outline: 'none' }}
                        onFocus={() => colorLime("amount")}
                        onBlur={() => handleBlur(amount, "amount")}
                    />
                    {showErrorAmount && <p style={{ color: colorRed }}>This field is required</p>} 
                    <span className='img-input'>£</span>
                    <div>
                    <label htmlFor="mort" className='mortgage-term'>Mortgage Term</label>
                    <input
                        type="number"
                        id="term"
                        className='numbers'
                        onChange={e => handleInputChange(setTerm, e.target.value, "term")}
                        value={term}
                        placeholder="years"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.term}`, outline: 'none' }}
                        onFocus={() => colorLime("term")}
                        onBlur={() => handleBlur(term, "term")}
                    />
                    <span className='img-input'>years</span>
                        </div>
                    <div>
                    <label htmlFor="rate" className='interest'>Interest Rate</label>
                    <input
                        type="number"
                        id="rate"
                        className='numbers'
                        onChange={e => handleInputChange(setRate, e.target.value, "rate")}
                        value={rate}
                        placeholder="%"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.rate}`, outline: 'none' }}
                        onFocus={() => colorLime("rate")}
                        onBlur={() => handleBlur(rate, "rate")}
                    />
                    <span className='img-input'>%</span>
                        </div>
                </div>
                <div className='options'>
                    <p htmlFor="repayment">Mortgage Type</p>
                        <label className='labels' htmlFor="repayment">Repayment
                        <input 
    type="radio" 
    id="repayment"
    className='radio'
    name='options' 
    value="repayment" 
    checked={radio === "repayment"}
    onChange={e => setRadio(e.target.value)}
    style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
/>
                        </label>

                        <label className='labels' htmlFor="interest-only">Interest Only
                    <input 
                        type="radio" 
                        id="interest-only"
                        className='radio'
                        name='options' 
                        value="interest-only" 
                        checked={radio === "interest-only"} 
                        onChange={e => setRadio(e.target.value)}
                        style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
                        />
                        </label>
                        </div>
                <button id="btn" className="btn" type="submit">
                    <img className='icon-calc' src="../public/images/icon-calculator.svg" alt="Calculate Icon" />
                    <p className='calculate'>Calculate Repayments</p>
                </button>
            </form>
        </section>
        <MostrarResultados resultados={resultados} />
    </>
);
    


export default Calculadora;
/*
    return (
        <>
            <section className="sect-1">
                    <div className='calculator'>
                        <h1>Mortgage Calculator</h1>
                        <button className='clear' onClick={clearAll}>Clear All</button>
                    </div>
                <form onSubmit={handleCalculate}>
                    <div className="form-mort">
                        <label htmlFor="amount">Mortgage Amount</label>
                        <input
                        type="number"
                        id="amount"
                        className='numbers'
                        onChange={e => handleInputChange(setAmount, e.target.value, "amount")}
                        value={amount}
                        placeholder="£"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.amount}`, outline: 'none' }}
                        onFocus={() => colorLime("amount")}
                        onBlur={() => handleBlur(amount, "amount")}
                    />
                    {showErrorAmount && <p style={{ color: colorRed }}>This field is required</p>} 
                    <span className='img-input'>£</span>
                    <div>
                    <label htmlFor="mort" className='mortgage-term'>Mortgage Term</label>
                    <input
                        type="number"
                        id="term"
                        className='numbers'
                        onChange={e => handleInputChange(setTerm, e.target.value, "term")}
                        value={term}
                        placeholder="years"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.term}`, outline: 'none' }}
                        onFocus={() => colorLime("term")}
                        onBlur={() => handleBlur(term, "term")}
                    />
                    <span className='img-input'>years</span>
                        </div>
                    <div>
                    <label htmlFor="rate" className='interest'>Interest Rate</label>
                    <input
                        type="number"
                        id="rate"
                        className='numbers'
                        onChange={e => handleInputChange(setRate, e.target.value, "rate")}
                        value={rate}
                        placeholder="%"
                        onKeyDown={evento}
                        style={{ border: `2px solid ${lime.rate}`, outline: 'none' }}
                        onFocus={() => colorLime("rate")}
                        onBlur={() => handleBlur(rate, "rate")}
                    />
                    <span className='img-input'>%</span>
                        </div>
                </div>
                <div className='options'>
                    <p htmlFor="repayment">Mortgage Type</p>
                        <label className='labels' htmlFor="repayment">Repayment
                        <input 
    type="radio" 
    id="repayment"
    className='radio'
    name='options' 
    value="repayment" 
    checked={radio === "repayment"}
    onChange={e => setRadio(e.target.value)}
    style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
/>
                        </label>

                        <label className='labels' htmlFor="interest-only">Interest Only
                    <input 
                        type="radio" 
                        id="interest-only"
                        className='radio'
                        name='options' 
                        value="interest-only" 
                        checked={radio === "interest-only"} 
                        onChange={e => setRadio(e.target.value)}
                        style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
                        />
                        </label>
                        </div>
                <button id="btn" className="btn" type="submit">
                    <img className='icon-calc' src="../public/images/icon-calculator.svg" alt="Calculate Icon" />
                    <p className='calculate'>Calculate Repayments</p>
                </button>
            </form>
        </section>
        <MostrarResultados resultados={resultados} />
    </>
);
*/

//<MostrarResultados resultados={resultados} />
//{resultados.length > 0 && <MostrarResultados resultados={resultados} />}
//<label className='label-option' htmlFor="repayment">Repayment</label>