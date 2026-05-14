import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Pul.css'

function CurrencyConverter(){
    const [rates, setRates] = useState([])
    const [amount, setAmout] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('UZS')
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const fetchRates = async () => {
            try{
                const response = await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
                const uzs = {Ccy: 'UZS', Rate:'1', CcyNm_UZ:'O`zbek so`mi'}
                const btc = {Ccy: 'BTC', Rate:'981888417.80', CcyNm_UZ:'Bitcoin'}
                const eth = {Ccy: 'ETH', Rate:'28246419.80', CcyNm_UZ:'Ethereum'}
                const usdt = {Ccy: 'USDT', Rate:'12121.75', CcyNm_UZ:'Tether'}
                setRates([uzs, btc, eth, ...response.data, usdt])
            }catch(error){
                console.error('XATOLIK:', error)
            }
        };
        fetchRates()
    }, [])

    useEffect(() => {
        if(rates.length > 0) {
            const fromRate = rates.find(r => r.Ccy === fromCurrency)?.Rate
            const toRate = rates.find(r => r.Ccy === toCurrency)?.Rate

            const calc = (amount * fromRate) / toRate
            setResult(calc.toFixed(2))
        }
    }, [amount,fromCurrency,toCurrency,rates])

    return(
        <div className="converter-container">
            <h2 className="converter-title">Valyuta Konvertori</h2>

            <div className="input-group">
                <label className='label'>Miqdorni kiriting</label>
                <input
                    className="styled-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmout(e.target.value)} 
                />
            </div>

            <div className="flex-row">
                <div className="flex-item">
                    <div className="input-group1">
                        <label className='label2'>Dan:</label>
                        <select 
                            className="styled-select"
                            value={fromCurrency} 
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {rates.map(r => <option key={r.Ccy} value={r.Ccy}>{r.Ccy} - {r.CcyNm_UZ}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex-item">
                    <div className="input-group2">
                        <label className='label2'>Ga:</label>
                        <select 
                            className="styled-select"
                            value={toCurrency} 
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                             {rates.map(r => <option key={r.Ccy} value={r.Ccy}>{r.Ccy} - {r.CcyNm_UZ}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="result-section">
                <h3 className="result-title">Natija:</h3>
                <p className="result-value">
                    {amount} {fromCurrency} = {result} {toCurrency}
                </p>
            </div>
        </div>
    )
}

export default CurrencyConverter;