import react, {useState, useEffect} from 'react'

const CountryList = () => {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState([true])
    const [error, setError] = useState([null])

    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region'

    useEffect(() => {
        const getCountries = async () => {
            try{
                const response = await fetch(API_URL)

                if(!response.ok){
                    throw new Error('Ma`lumot yuklashda xatolik yuz berdi')
                }

                const data = await response.json()

                const sortedData = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
            )

            setCountries(sortedData)
            }catch(err) {
                setError(err.message)

            }finally{
                setLoading(false)
            }
        }

        getCountries()
    }, [])

    if (loading) return <h2 style={{textAlign:'center'}}>Dunyo Xaritasi Yuklanmoqda   ffffff...</h2>
    // if (error) return <h2 style={{color:'red', textAlign:'center'}}>Xato: yana {error}</h2>

    return(
        <div style={{padding:'20px', fontFamily:'Arial'}}>
            <h1 style={{textAlign:'center'}}>Davlatlar Ma`lumotnomasi</h1>

            <div
            style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',
                gap:'20px',
                marginTop:'20px'
            }}>
                {countries.map((country, index) => (
                    <div key={index} style={{
                        border:'1px solid #ddd',
                        borderRadius:'10px',
                        padding:'15px',
                        boxShadow:'0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor:'#f9f9f9'
                    }}>
                        <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        style={{width:'100%', height:'150px', objectFit:'cover', borderRadius:'5px'}} />
                        <h3 style={{margin:'10px 0'}}>{country.name.common}</h3>
                        <p><strong>Poytaxti:</strong> {country.capital ? country.capital[0] : 'Mavjud emas'}</p>
                        <p><strong>Poytaxti:</strong> {country.region}</p>
                        <p><strong>Aholi:</strong> {country.population.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default CountryList