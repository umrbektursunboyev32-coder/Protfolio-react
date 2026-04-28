import './App.css'
import I from './assets/umrbek.png'
function Homepage(){
    return(
        <div className="home">
            <img src={I} className='img'/>
        <h1>Hi, I'm <span className="Umrbek" style={{  }}>Umrbek</span> <br /></h1>
        <p>"Cod yozish san`at <br />deb bilaman"</p>
        <div className="social-icons">
    <a href="https://www.instagram.com/tursunboyevv_013/"><i className="fa-brands fa-instagram"></i></a>
    <a href="https://github.com/umrbektursunboyev32-coder"><i className="fa-brands fa-github"></i></a>
    <a href="https://t.me/TursunboyevUmrbek"><i className="fa-brands fa-telegram"></i></a>
    <a href="https://www.youtube.com/@Umrbek_channel"><i className="fa-brands fa-youtube"></i></a>
        </div>
        </div>
    )
}
export default Homepage