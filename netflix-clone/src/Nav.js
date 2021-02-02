import React, { useEffect,useState } from 'react'
import './Nav.css';

export function Nav() {
    
    const [show, handleShow] = useState(false);
    //attach a scroll listener
    //When user scrolls down 100pixels down from the Y axis the Black nav bar is displayed
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll"); // remove the listeners to avoid accumulation of listeners each time the user scrolls
        };
        
    }, []);

    return (
        // flex box/ flex in css is used to put items in rows
        <div className={`nav ${show && "nav_black"}`}>
            <h2 className="nav_title">amovies</h2>

            <img className="nav_avatar"
                src= "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt = "AMovies Logo"
            />
        </div>
    )
}
export default Nav;
