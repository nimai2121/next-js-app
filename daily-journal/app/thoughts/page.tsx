"use client"
import React, {useState, useEffect} from "react";

export default function thoughts() {
   const [thoughts, setThoughts] = 
       useState<{text: string; time: string}[]>([]);

         //load thoughts from local storage on page load
            useEffect(() => {
                const savedThoughts = localStorage.getItem("dailyThoughts");
                if (savedThoughts) {
                    setThoughts(JSON.parse(savedThoughts));
                }
            }, []); //empty dependency array; ie. runs only once on component mount

    return (
        <div className= "mt-5 space-y-3 text-left">
                {thoughts.length === 0 ? (<p className = "italic text-center">no thoughts yet</p>) : (
                    thoughts.map((thought, index) => ( 
                        <div 
                            key = {index}
                            className= "bg-white/20 p-3 rounded-lg shadow-sm"> 
                            <p className = "text-lg"> {thought.text} </p>
                            <p className = "text-sm opacity-80 mt-1">{thought.time}</p>
                        </div>
                ))
            )}   
             </div>
    )
}

