import './App.css'
function QuotteCard({muallif, matn}){
    const nusxalash = () => {
        navigator.clipboard.writeText(`${matn} -_- ${muallif}`)
        alert('nusxalandi')
    }
    return(
        <div style={{
            borderLeft:'5px solid #61dafb',
            padding:'20px',
            margin:'20px 0',
            background:'#09129b',
            borderRadius:'8px',
            boxShadow:'10px 40px 8px rgba(14, 44, 110, 0.19)',
            color:'azure'
        }}>
            <p style={{fontSize:'20px', fontStyle:'oblique'}}>"{matn}"</p>
            <h4 style={{textAlign:'right', color:'#ffffff'}}>- {muallif}</h4>
        <button class="btn-ultimate">
  <div class="glow-container"></div>
  <span class="btn-text" onClick={nusxalash}>Nusxa olish</span>
</button>
        </div>
    )
}
export default QuotteCard