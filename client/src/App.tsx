import React, { useState, useEffect } from "react"
import { Box, Button, Container, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const App: React.FC = () => {
    const [value, setValue] = React.useState('Text');
    const [data, setData] = useState<undefined | string>(undefined);
    const [input, setInput] = useState("Select")

    useEffect(() => {
        setInput("")
    }, [])

    const fetchData = () => {
        fetch(`/api/home?${value}=${input}`, {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        console.log("The value of value changed: ", input)
    }, [input])

    return (
        <React.Fragment>
            <Container maxWidth="lg" style={{ padding: "5%", width: "80%" }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Type of Prompt</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Text"
                    value={value}
                    onChange={handleChange}
                    name="radio-buttons-group">
                    <FormControlLabel value="Text" control={<Radio />} label="Text" />
                    <FormControlLabel value="Image" control={<Radio />} label="Image" />
                    <FormControlLabel value="Speech" control={<Radio />} label="Speech" />
                </RadioGroup>
                <br />
                <TextField
                    label="Prompt goes here...."
                    size="small"
                    variant="outlined"
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
                />
                <br /> <br />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <br /><br />
                <FormLabel id="demo-controlled-radio-buttons-group">Output</FormLabel>
                {
                    data !== undefined && (
                        <Box
                            my={4}
                            display="flex"
                            alignItems="center"
                            gap={4}
                            p={2}
                        >
                            {value == "Text" ?
                                (
                                    <Typography variant="subtitle1" component="h2">
                                        {data}
                                    </Typography>

                                ) : value == "Image" ?
                                    (
                                        <img src={data}></img>)
                                    : <p>You selected audio</p>}

                        </Box>
                    )
                }
            </Container>
        </React.Fragment>
    )
}

export default App
