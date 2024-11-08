import { useState} from 'react';
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
    const [red, setRed] = useState({
        amount: "hsl(4, 69%, 50%)",
        term: "hsl(4, 69%, 50%)",
        rate: "hsl(4, 69%, 50%)"
    })

    const colorRed = (input, amount) => {
        setRed((colors) => ({
            ...colors,
            [input] : amount === "" ? "hsl(4, 69%, 50%)" : colors[input]
        }))
    }

    const manejarCalculo = (amount,term,rate, radio) => {
        if (amount === '' || term === '' || rate === '') {
            alert('Por favor, seleccione inputs');
            return colorRed(red);
        }
        else if(radio === ''){
            alert('Por favor, seleccione una opcion');
            return;
        }
        setResultados([...resultados, { num: numero, month: month, amount, term, rate, radio }]);
        setNumero(prevNumero => prevNumero + 1)
        setMonth('')
    };


    return (
        <div>
            <section>
                <Calculadora onCalcular={manejarCalculo} />
            </section>
        </div>
    );
};

export default App;