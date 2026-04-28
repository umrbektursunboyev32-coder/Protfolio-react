import {  useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from "react";
import QuoteCard from "./QuoteCard";
import './App.css'

function Ap() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Xatolikni ko‘rish uchun

  const getNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      
      setQuote({
        content: data.quote,
        author: data.author
      })
    } catch (err){
      setError("Malumotni yuklashda xatolik yuz berdi!")
      console.error("Xato tavfsiloti:", err)
    }
    setLoading(false)
  }
  useEffect(() =>{
    getNewQuote()
  }, [])

  useEffect(() => {
    if(quote) {
      const ranglar = ['#1abc9c', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c']
      const tasodifiyRang = ranglar[Math.floor(Math.random() * ranglar.length)]
      document.body.style.backgroundColor = tasodifiyRang

      document.body.style.transition = '0.5'
    }
  }, [quote])
  return (
    <div style={{maxWidth:'600px', margin:'50px auto', textAlign:'center'}}>
        <h1 style={{color:'azure', fontFamily:'monospace', fontWeight:'bold'}}>Bu mening demo <br /> <br /> loyiham</h1>
      {loading && <p>Yuklanmoqda...</p>}

      {error && <p style={{color:'red'}}>{error}</p>}

      {!loading && !error && quote && (
        <QuoteCard matn={quote.content} muallif={quote.author} />
      )}

      <button class="btn-pro">
  <span class="btn-text" onClick={getNewQuote}>Yangi hikmat</span>
</button>   
    </div>
  )
}

export default Ap;