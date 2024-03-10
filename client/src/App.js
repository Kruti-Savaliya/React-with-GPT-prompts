import React, { useState, useEffect } from "react"

function App() {
    const [data, setData] = useState(undefined);
    const [input, setInput] = useState("")
    const [imageChecked, setImageChecked] = useState(false)
    const [textChecked, setTextChecked] = useState(true)

    useEffect(() => {
        setInput("")
    }, [])

    const fetchData = () => {
        const typeOfPrompt = imageChecked ? new URLSearchParams({ image : input }) : new URLSearchParams({ text : input })
        fetch("/api/home?" + typeOfPrompt, {
            type: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((
            res => res.text()
        )).then((result) => {
            setData(result)
        })
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

    useEffect(() => {
        setInput("")
        setData(undefined)
    }, [imageChecked, textChecked])

    return (
        <div>
            <input type="radio" value="text" checked={textChecked} onClick={() => {
                setTextChecked(true)
                setImageChecked(false)
            }}></input>
            <label>Text</label>
            <input type="radio" value="image" checked={imageChecked} onClick={() => {
                setImageChecked(true)
                setTextChecked(false)
            }}></input>
            <label>Image</label>
            <br /><br />
            The prompt goes here: <input onChange={(event) => setInput(event.target.value)} />
            <br /> <br />
            <button onClick={handleSubmit}>Submit</button>
            <br/><br/>
            {data === undefined ? (<p>Loading....</p>) : 
              imageChecked ? <img src={data}></img> : <p>{JSON.stringify(data, null, 2)}</p>}
            <p></p>
        </div>
    )
}

export default App
