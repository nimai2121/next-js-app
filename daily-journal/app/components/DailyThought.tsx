"use client";
import React, {useState} from "react";

export default function DailyThought() {
    // input is the variable and setInput updates the variable
    const [input, setInput] = useState(""); 
    const [thoughts, setThoughts] = 
    useState<{text: string; time: string}[]>([])

    // handle saving a thought
    const handleSave = () => {
        if (input.trim() === "") 
            return;
        //else 
            //alert(input);

        //create timestamp
        const now = new Date();
        const timestamp = now.toLocaleString("en-US", {
            weekday: "short", 
            hour: "2-digit",
            minute: "2-digit",
        });

        const newThought = {text: input, time: timestamp};
        setThoughts([newThought, ...thoughts]); //add new thought to the thoughts collection.
        setInput(""); //

    }


    return (
        <div className="bg-[#ff0000] text-white p-6 rounded-xl shadow-md text-center max-w-md w-full">
             <h2 className = "text-xl font-bold mb-3"> Daily Thoughts </h2> 
             <textarea
                value = {input}
                onChange ={(e) => setInput(e.target.value)}
                placeholder="Type your thoughts for the day..."
                className = "w-full p-2 rounded-md text-white focus: outline-none"
             />
             <button 
                onClick = {handleSave}
                className = "mt-3 bg-white text-[#ff0000] px-4 py-2 rounded-md font-semibold hover:bg-[#000000] transition-colors cursor-pointer">
                Save Thought 
             </button>

             <div className= "mt-5 space-y-3 text-left">
                {thoughts.length === 0 ? (<p className = "italic text-center">no thoughts yet, start typing</p>) : (
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
        </div>

    );
}