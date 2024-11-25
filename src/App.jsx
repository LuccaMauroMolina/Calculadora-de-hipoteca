import { useState } from 'react';
import Calculadora from './components/Calculadora/Calculadora';
import "../src/App.css";
import { ErrorProvider } from './components/Context/Context';

const App = () => {
    const [resultados, setResultados] = useState([]);
    const [numero, setNumero] = useState(0);
    const [month, setMonth] = useState('');

    const manejarCalculo = (amount, term, rate, radio) => {
        if (amount === '' || term === '' || rate === '') {
            alert('Por favor, seleccione inputs');
            return;
        }
        else if (radio === '') {
            alert('Por favor, seleccione una opción');
            return;
        }

        setResultados([...resultados, { num: numero, month: month, amount, term, rate, radio }]);
        setNumero(prevNumero => prevNumero + 1);
        setMonth('');
    };

    return (
        <ErrorProvider>
            <div>
                <section>
                    <Calculadora onCalcular={manejarCalculo} />
                </section>
            </div>
        </ErrorProvider>
    );
};

export default App;
