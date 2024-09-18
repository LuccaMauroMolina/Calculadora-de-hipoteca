/*import "./MostrarResultado.css"
const MostrarResultados = ({ resultados,month }) => {
    return (
        <div className="sect-2">
        <img src="../public/images/illustration-empty.svg" alt="Ilustración vacía" />
        <span className="result">Results shown here</span>
        <p>hhogohogfoghgohgsohsgohsgohg</p>
        
        <ul>
                {resultados.map((resultados, index) => (
                    <li key={index}>
                        Your monthly repayment {resultados.month}, Número:
                        <p>{month}</p>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
    };


export default MostrarResultados*/

/*import './MostrarResultado.css';

const MostrarResultados = ({ month }) => {
    return (
        <div className="sect-2">
            <img src="../public/images/illustration-empty.svg" alt="Ilustración vacía" />
            <span className="result">Results shown here</span>
            <p>{month}</p>


        </div>
    );
};

export default MostrarResultados;*/



import './MostrarResultado.css';

const MostrarResultados = ({ resultados }) => {
    return (
        <div className="sect-2">
            <img src="../public/images/illustration-empty.svg" alt="Ilustración vacía" />
            <span className="result">Results shown here</span>
            {resultados.length === 0 ? (
                <p>No results yet.</p>
            ) : (
                resultados.map((resultado, index) => (
                    <div key={index}>
                        <p>Amount: {resultado.amount}</p>
                        <p>Term: {resultado.term}</p>
                        <p>Rate: {resultado.rate}</p>
                        <p>Total: {resultado.total}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MostrarResultados;



/*
<ul>
                {resultados.map((resultado, index) => (
                    <li key={index}>
                        Your monthly repayment {resultado.month}, Número: {resultado.num}
                    </li>
                ))}
            </ul>
*/