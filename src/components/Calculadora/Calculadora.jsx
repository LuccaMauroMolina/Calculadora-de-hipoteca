import { useState} from 'react';
import './Calculadora.css';
import MostrarResultados from '../MostrarResultado/MostrarResultados';
import { useError } from '../Context/Context';

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
        radio: "initial color"
    })
    const [colorRed, setColorRed] = useState('hsl(4, 69%, 50%)');
    //const [showErrorAmount, setShowErrorAmount] = useState(false);
    //const [showErrorTerm, setShowErrorTerm] = useState(false);
    //const [showErrorRate, setShowErrorRate] = useState(false);
    //const [showErrorRadio, setShowErrorRadio] = useState(false)
    const { errorAmount,errorTerm,errorRate,errorRadio,setError } = useError();


    const repayment = () => {
        const p = parseFloat(amount); // Monto del préstamo (300,000)
        const r = 5.25 / 100 / 12; // Tasa de interés mensual (5.25% anual)
        const n = parseInt(term) * 12; // Número total de pagos (300 meses)
    
        // Fórmula para calcular el pago mensual
        const monthlyPayment = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        
        return monthlyPayment;
    };
    

    const interest = () => {
        const p = parseFloat(amount)
        const rI = parseFloat(rate) / 100
        const t = parseFloat(term)
        const iTotal = p * rI * t

        return iTotal
    }

    const reembolso = () => {
        const monthlyPayment = repayment(); // Llamar a la función repayment() que ya tienes
        const n = parseInt(term) * 12; // Número total de pagos (en meses)
    
        // Total a reembolsar = Pago mensual * Número total de pagos
        const totalReembolso = monthlyPayment * n;
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

        
        if (amount === '') setError('amount', true);
        else setError('amount', false);

        if (term === '') setError('term', true);
        else setError('term', false);

        if (rate === '') setError('rate', true);
        else setError('rate', false);

        if (radio === '') setError('radio', true);
        else setError('radio', false);

        if (amount && term && rate && radio) {
            onCalcular(amount, term, rate, radio);
        }
        
        let totalRepayment = 0;
        let totalInterest = 0;
        let totalReembolso = 0

        if (radio === "repayment") {
            totalRepayment = repayment();
        } else if (radio === "interest-only") {
            totalInterest = interest();
        }
        
        if (radio == "repayment" || radio == "interest-only") {
            // Asegúrate de que "reembolso" sea la condición correcta
            totalReembolso = reembolso();  // Llamar a la función que calcula el reembolso
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

    /*const colorLime = (input,radius) => {
        setLime((colors) => ({
            ...colors,
            [input]: amount === "" ? "hsl(61, 70%, 52%)" : colors[input],
            [input]: term === "" ? "hsl(61, 70%, 52%)" : colors[input],
            [input]: rate === "" ? "hsl(61, 70%, 52%)" : colors[input],
            [radius]: radio === "" ? "hsl(61, 70%, 52%)" : colors[radius]
        }));
    };*/

    const colorLime = (input) => {
        setLime((colors) => ({
            ...colors,
            [input]: 'hsl(61, 70%, 52%)', // Lime cuando se enfoca o selecciona
        }));
    };
    
    
    const handleInputChange = (setter, value, input,radius) => {
        setter(value);
    
        // Si el campo está vacío, mostrar el mensaje de error y cambiar el color
        if (value === '') {
            if (input === 'amount') errorAmount(true);
            if (input === 'term') errorTerm(true);
            if (input === 'rate') errorRate(true);
            if (radius === 'radio') errorRadio(true)
    
            setLime((colors) => ({
            ...colors,
            [input]: 'hsl(203, 41%, 72%)', // Color gris cuando está vacío
            }));
        } else {
            if (input === 'amount') errorAmount(false);
            if (input === 'term') errorTerm(false);
            if (input === 'rate') errorRate(false);
            if (radius === 'radio') errorRadio(false);
    
            setLime((colors) => ({
            ...colors,
            [input]: 'hsl(61, 70%, 52%)', // Color normal cuando tiene valor
            [radius] : 'hsl(61, 70%, 52%)'
            }));
        }
        //hsl(203, 41%, 72%)
        //hsl(61, 70%, 52%)
    
        if (value === '') {
          setColorRed(colorRed); // Cambia el color a rojo si el campo está vacío
        }
};
    
    const handleBlur = (value, input,radius) => {
        // Cuando el input pierde el foco
        if (value === "") {
            //setShowErrorAmount(true); // Asegurarse de que el mensaje de error se muestre si está vacío
            setLime((prevColors) => ({
            ...prevColors,
            //[input]: "hsl(203, 41%, 72%)",  // Gris cuando está vacío al perder el foco
            [input]: amount === "" ? "hsl(203, 41%, 72%)" : prevColors[input],
            [input]: term === "" ? "hsl(203, 41%, 72%)" : prevColors[input],
            [input]: rate === "" ? "hsl(203, 41%, 72%)" : prevColors[input],
            [radius]: radio === "radius" ? "hsl(61, 70%, 52%)" : prevColors[radius], // Cambiar color si es el radio
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
                        style={{ border: `2px solid ${errorAmount ? 'red' : lime.amount}`, outline: 'none' }}
                        onFocus={() => colorLime("amount")}
                        onBlur={() => handleBlur(amount, "amount")}
                    />
                    <span className='img-input'>£</span>
                    {errorAmount && <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>}
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
                        style={{ border: `2px solid ${errorTerm ? 'red' : lime.term}`, outline: 'none' }}
                        onFocus={() => colorLime("term")}
                        onBlur={() => handleBlur(term, "term")}
                    />
                    {errorTerm && (
                <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>
            )}
                    <span className='img-input img-input-2'>years</span>
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
                        style={{ border: `2px solid ${errorRate ? 'red' : lime.rate}`, outline: 'none' }}
                        onFocus={() => colorLime("rate")}
                        onBlur={() => handleBlur(rate, "rate")}
                    />
                    {errorRate && (
                <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>
            )}
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
    onChange={e => { 
        setRadio(e.target.value);
        colorLime("radio"); // Cambia el color a lime cuando se selecciona
    }}
    onFocus={() => colorLime("radio")} // Aplica lime cuando se enfoca
        onBlur={() => setLime((prev) => ({ ...prev, radio: 'initial color' }))}
    style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
/>
                        </label>

                        <label className='labels' htmlFor="interest-only" tabIndex="0" onFocus={() => colorLime("radio", "radius")}
        onBlur={() => colorLime("radio", "")}>
        Interest Only
        <input 
            type="radio" 
            id="interest-only"
            className='radio'
            name='options' 
            value="interest-only" 
            checked={radio === "interest-only"} 
            onChange={e => {
                setRadio(e.target.value);
                colorLime("radio"); // Cambia el color a lime cuando se selecciona
            }}
            onFocus={() => colorLime("radio")} // Aplica lime cuando se enfoca
            onBlur={() => setLime((prev) => ({ ...prev, radio: 'initial color' }))}      // Al perder foco, limpia el color
            style={{ border: `2px solid ${lime.radio}`, outline: 'none' }}
        />
    </label>
    {errorRadio && <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>}
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
}

export default Calculadora;

/*
import { useState } from 'react';
import { useError } from '../Context/Context';  // Importar el hook para manejar errores

const Calculadora = ({ onCalcular }) => {
    // Obtener el estado de los errores desde el contexto
    const { showErrorAmount, showErrorTerm, showErrorRate, showErrorRadio, setError } = useError();

    // Estado local para los valores de los campos
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [rate, setRate] = useState('');
    const [radio, setRadio] = useState('');

    // Función para manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si los campos tienen errores y actualizar el estado en el contexto
        if (amount === '') {
            setError('amount', true); // Si 'amount' está vacío, marcarlo como error
        } else {
            setError('amount', false); // Si no está vacío, quitar el error
        }

        if (term === '') {
            setError('term', true); // Lo mismo para 'term'
        } else {
            setError('term', false);
        }

        if (rate === '') {
            setError('rate', true); // Lo mismo para 'rate'
        } else {
            setError('rate', false);
        }

        if (radio === '') {
            setError('radio', true); // Lo mismo para 'radio'
        } else {
            setError('radio', false);
        }

        // Si no hay errores, llamar a la función onCalcular para realizar el cálculo
        if (amount && term && rate && radio) {
            onCalcular(amount, term, rate, radio); // Aquí pasas los valores al componente padre
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <section>
                {/* C
                <label>
                    Amount:
                    <input 
                        type="text" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        style={{ borderColor: showErrorAmount ? 'red' : '' }}  // Cambiar el borde si hay error
                    />
                    {showErrorAmount && <p style={{ color: 'red' }}>This field is required</p>} 
                </label>

            
                <label>
                    Term:
                    <input 
                        type="text" 
                        value={term} 
                        onChange={(e) => setTerm(e.target.value)} 
                        style={{ borderColor: showErrorTerm ? 'red' : '' }}  // Cambiar el borde si hay error
                    />
                    {showErrorTerm && <p style={{ color: 'red' }}>This field is required</p>} 
                </label>

                {/* Campo Rate 
                <label>
                    Rate:
                    <input 
                        type="text" 
                        value={rate} 
                        onChange={(e) => setRate(e.target.value)} 
                        style={{ borderColor: showErrorRate ? 'red' : '' }}  // Cambiar el borde si hay error
                    />
                    {showErrorRate && <p style={{ color: 'red' }}>This field is required</p>} {/* Mensaje de error
                </label>

                <label>
                    Radio:
                    <input 
                        type="radio" 
                        value="option1" 
                        checked={radio === 'option1'} 
                        onChange={(e) => setRadio(e.target.value)} 
                        style={{ borderColor: showErrorRadio ? 'red' : '' }}  // Cambiar el borde si hay error
                    />
                    Option 1
                    <input 
                        type="radio" 
                        value="option2" 
                        checked={radio === 'option2'} 
                        onChange={(e) => setRadio(e.target.value)} 
                        style={{ borderColor: showErrorRadio ? 'red' : '' }}  // Cambiar el borde si hay error
                    />
                    Option 2
                    {showErrorRadio && <p style={{ color: 'red' }}>This field is required</p>} {/* Mensaje de erro
                </label>

                {/* Botón de enviar
                <button id="btn" className="btn" type="submit">
                    <img className='icon-calc' src="../public/images/icon-calculator.svg" alt="Calculate Icon" />
                    <p className='calculate'>Calculate Repayments</p>
                </button>
            </section>
        </form>
    );
};

export default Calculadora;*/
