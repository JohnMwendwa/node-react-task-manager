import React from 'react'
import './css/Footer.css'

function Footer() {
  return (
   <footer className='Footer'>
    <div className="Footer__container">
        <div className="Footer__information">

        </div>
    <div className="Footer__copyright">
        <div className="Footer__copyright-text">
            <p> &copy; 2022 <a href="dev.johnmwendwa@gmail.com">John Mwendwa</a></p>
        </div>
        <div className="Footer__menu">
            <ul>
                <li><a href="#!">Terms</a></li>
                <li><a href="#!">Privacy</a></li>
                <li><a href="dev.johnmwendwa@gmail.com">Contact</a></li>
            </ul>
        </div>
    </div>
    </div>
   </footer>
  )
}

export default Footer