// App.js o un componente padre que maneja Calculadora y Resultado
/*import { useState } from 'react';
import Calculadora from './components/Calculadora/Calculadora';
import "../src/App.css"
import MostrarResultados from './components/MostrarResultado/MostrarResultados';


const App = () => {
    const [resultados, setResultados] = useState([]);
    const [mostrar, setMostrar] = useState([]);
    const [numero, setNumero] = useState(0);
    const [month, setMonth] = useState('');

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
        <div>
            <input
                type="text"
                onChange={e => setMonth(e.target.value)}
                value={month}
                placeholder="Introduce un nombre"
                onKeyUp={e => {
                    if (e.key === 'Enter') manejarMostrar();
                }}
            />
            <button onClick={manejarMostrar}>
                Tocar
            </button>

            <p>{month}</p>
            <section>
                <Calculadora onCalcular={manejarCalculo} />
                <MostrarResultados resultados={resultados} month={month} />
            </section>
        </div>
    );
};

export default App;*/

import { useState } from 'react';
import Calculadora from './components/Calculadora/Calculadora';
import "../src/App.css"
/*import MostrarResultados from './components/MostrarResultado/MostrarResultados';
<MostrarResultados resultados={resultados}/>
*/

const App = () => {
    const [resultados, setResultados] = useState([]);
    //const [mostrar, setMostrar] = useState([]);
    const [numero, setNumero] = useState(0);
    const [month, setMonth] = useState('');

    const manejarCalculo = (amount,term,rate) => {
        if (amount.trim() === '' || term.trim() === '' || rate.trim() === '') {
            alert('Por favor, introduce una cantidad.');
            return;
        }
        setResultados([...resultados, { num: numero, month: month, amount, term, rate }]);
        setNumero(prevNumero => prevNumero + 1)
        setMonth('')
    };

    /*const manejarMostrar = () => {
        if (month.trim() === '') {
            alert('Por favor, introduce un nombre.');
            return;
        }
        setMostrar([...mostrar, { num: numero}]);
        setNumero(prevNumero => prevNumero + 1);
        setMonth([...month, {month: month}])
    };*/

    return (
        <div>
            {/*<input
                type="text"
                onChange={e => setMonth(e.target.value)}
                value={month}
                placeholder="Introduce un nombre"
                onKeyUp={e => {
                    if (e.key === 'Enter') manejarMostrar();
                }}
            /> */}
            {/*<button onClick={manejarMostrar}>
                Tocar
            </button>*/}

            <section>
                <Calculadora onCalcular={manejarCalculo} />
                
            </section>
        </div>
    );
};

export default App;


/*
<input
                type="text"
                onChange={e => setMonth(e.target.value)}
                value={month}
                placeholder="Introduce un nombre"
                onKeyUp={e => {
                    if (e.key === 'Enter') manejarMostrar();
                }}
            />
*/