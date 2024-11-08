import './MostrarResultado.css';
const MostrarResultados = ({ resultados }) => {
    return (
        <div className="sect-2">
            {resultados.length === 0 ? (
                <p className='no-result'>Complete the form and click calculate repayment <br /> to see what your monthly repayments would be.</p>
            ) : (
                resultados.map((resultado, index) => (
                    <div className='res' key={index}>
                        <h1 className='title-result'>Your results</h1>
                        <p className='text-result'>Your results are shown below based on the information you provided. To adjust the results, edit the form and click calculate repayments again.</p>
                        <div className='results'>
    <p className='text-calc'>Your monthly repayments</p>
    {
        resultado.totalRepayment > resultado.totalInterest ? (
            <>
                <span className='text-num'>£{resultado.totalRepayment}</span>
                <p className='text-calc'>Total youll repay over the term</p>
            </>
        ) : (
            <>
                <span className='text-num'>£{resultado.totalInterest}</span>
                <p className='text-calc'>Total youll repay over the term</p>
            </>
        )
    }
</div>

                    </div>
                ))
            )}
        </div>
    );
};

export default MostrarResultados;

//<p>Total: {resultado.totalRepayment}</p>

//<p>Rate: {resultado.rate}</p>

/*
<ul>
                {resultados.map((resultado, index) => (
                    <li key={index}>
                        Your monthly repayment {resultado.month}, Número: {resultado.num}
                    </li>
                ))}
            </ul>

            <img src="../public/images/illustration-empty.svg" alt="Ilustración vacía" />
            <span className="result">Results shown here</span>
*/