import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav(){

    const [show, handleshow] = useState(false);

    useEffect(()=>{

        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                handleshow(true);
            }
            else{
                handleshow(false);
            }
        });

        return ()=> {
            window.removeEventListener("scroll", null);
        };

    }, []);


    return(
        <div className={`${show?"nav":"nav_black"}`}>
            <img className="logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="netflix logo" />
        </div>
    );
}

export default Nav