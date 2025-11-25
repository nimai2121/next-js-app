"use client";
import React, {useState, useEffect} from "react";
//import {useFormState} from "react-dom";
//import "thoughts/page.tsx";

type Thought = {
    text: string; 
    time: string; 
    competencies: number[];
};

type Competency =  {
    id: number; 
    skill: string;
    description: string;
};

export default function DailyThought() {
    // input is the variable and setInput updates the variable
    const [input, setInput] = useState(""); 
    const [thoughts, setThoughts] = 
    useState<{text: string; time: string}[]>([]);
    const [competencies, setCompetencies] = useState<Competency[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    // Load competencies from API
    useEffect(() => {
        async function fetchCompetencies(){
            const res = await fetch("/api/competencies");
            const data = await res.json();
            setCompetencies(data);
        }
        fetchCompetencies();
    }, []);

    //load thoughts from local storage on page load
    useEffect(() => {
        const savedThoughts = localStorage.getItem("dailyThoughts");
        if (savedThoughts) {
            setThoughts(JSON.parse(savedThoughts));
        }
    }, []); //empty dependency array; ie. runs only once on component mount

    //save thoughts to local storage whenever thoughts are added.
    useEffect(() => {
        //convert the stored json data to string
        localStorage.setItem("dailyThoughts", JSON.stringify(thoughts));
    }, [thoughts]); //runs whenever thought state chnages

    // handle saving a thought
    const handleSave = () => {
        if (input.trim() === "") 
            return;
        //else 
            //alert(input);

        //create timestamp
        const now = new Date();
        const timestamp = now.toLocaleString("en-US", {
            month: "short", 
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const newThought = {text: input, time: timestamp, competencies: selected};
        setThoughts([newThought, ...thoughts]); //add new thought to the thoughts collection.
        setInput(""); //

    }

    const toggleCompetency = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-[#ff0000] text-white p-6 rounded-xl shadow-md text-center max-w-md w-full">
             <h2 className = "text-xl font-bold mb-3"> Daily Thoughts </h2> 
             <textarea
                value = {input}
                onChange ={(e) => setInput(e.target.value)}
                placeholder="Type your thoughts for the day..."
                className = "w-full p-2 rounded-md text-white focus: outline-none"
             />
             <div className = "mt-4 text-left">
                <h3 className= "font-semibold mb-2">Employability Competencies</h3>
                <div className = "space-y-1">
                {
                    competencies.map((comp) => (
                        <label
                            key={comp.id}
                            title={comp.description}
                            className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            className="cursor-point"
                            type="checkbox"
                            checked={selected.includes(comp.id)}
                            onChange={() => {toggleCompetency(comp.id)}}
                        />
                        <span>{comp.skill}</span>
                    </label>
                    )
                )}
            </div>
             </div>
             <button 
                onClick = {handleSave}
                className = "mt-3 bg-white text-[#ff0000] px-4 py-2 rounded-md font-semibold hover:bg-[#000000] transition-colors cursor-pointer">
                Save Thought 
             </button>

             <div className= "mt-5 space-y-3 text-left">
                {thoughts.length === 0 ? (<p className = "italic text-center">no thoughts yet, start typing</p>) : (
                    thoughts.slice(0,5).map((thought, index) => ( 
                        <div 
                            key = {index}
                            className= "bg-white/20 p-3 rounded-lg shadow-sm"> 
                            <p className = "text-lg"> {thought.text} </p>
                            <p className = "text-sm opacity-80 mt-1">{thought.time}</p>
                            {thought.competencies.length > 0 && (
                                <p className = "text-sm mt-1">
                                    <strong>Competencies</strong>
                                    
                                    
                                </p>
                            )}
                        </div>
                ))
            )}   
             </div>
        </div>

    );
}