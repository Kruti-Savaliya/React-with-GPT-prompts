import React, { useState, useEffect } from "react"
import DropDown from "./DropDown";

const App: React.FC = () => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [selectPrompt, setSelectPrompt] = useState<string>("");
    const prompts = () => {
        return ["Text", "Image", "Speech"];
    };

    const [data, setData] = useState<undefined | string>(undefined);
    const [input, setInput] = useState("")

    useEffect(() => {
        setInput("")
    }, [])

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropDown(false);
        }
    };

    const promptSelection = (prompt: string): void => {
        setSelectPrompt(prompt);
    };

    const fetchData = () => {
        fetch(`/api/home?${selectPrompt}=${input}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((
            res => res.text()
        )).then((result) => setData(result))
    }

    useEffect(() => {
        console.log("The data is: ", data)
    }, [data])

    const handleSubmit = () => {
        console.log("Button clicked")
        if (input === "") {
            alert("Prompt is empty. Please give me a prompt")
        }
        else fetchData();
    }

    return (
        <div>
            <button
                className={showDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
                <div>{selectPrompt ? "Select: " + selectPrompt : "Select ..."} </div>
                {showDropDown && (
                    <DropDown
                        prompts={prompts()}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        promptSelection={promptSelection}
                    />
                )}
            </button>
            <br /><br />
            The prompt goes here: <input onChange={(event) => setInput(event.target.value)} />
            <br /> <br />
            <button onClick={handleSubmit}>Submit</button>
            <br /><br />
            {
                data === undefined ? (<p>Loading....</p>) :
                    selectPrompt == "Image" ? <img src={data}></img> :
                        selectPrompt == "Text" ? <p>{data}</p> : (
                            <audio controls>
                                <source src="audio/marathi.mp3" type="audio/mpeg" />
                            </audio>
                        )
            }
            <p></p>
        </div >
    )
}

export default App
