import { useState } from 'react'

function Counter(){
    const [son, setSon] = useState(0)
    const [Daraja, Dson] = useState(0)


const oshirish = () => {
    setSon(son + 1)  
}
const doshirish = () => {
    Dson(Daraja+1)
}
const dminus = () => {
    Dson(Daraja-1)
}

const Kamaytirish = () => {
    setSon(son - 1)
}
const Kvadratlash = () => {
    setSon(son * son)
}
const Ildiz = () => {
    setSon(Math.sqrt(son,2))
}

return(
    <div className='divv'>
            <h2>Hozirgi sanoq:{son} <sup>{Daraja}</sup>= {Math.pow(son,Daraja)}</h2>
<div className="btn-div">
            <button onClick={oshirish} className='btnn'>Oshirish(+)</button>
            <button onClick={Kamaytirish} className='btnn'>Kamaytirish(-)</button>
            <button onClick={Kvadratlash} className='btnn'>Kvadratlash(2)</button>
            <button onClick={Ildiz} className='btnn'>Ildiz</button>
            <button onClick={doshirish} className='btnn'>Daraja oshirish</button>
            <button onClick={dminus} className='btnn'>Daraja minus</button>
            <button onClick={() => setSon(0)} className='btnn'>Nollash</button>
        </div>
        </div>
);
}
export default Counter;