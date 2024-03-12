import os
from openai import OpenAI
from flask import Flask, request
from pathlib import Path

app=Flask(__name__)

# API Route

client = OpenAI(
  api_key = ""
)

@app.route("/api/home", methods=["GET"])
def members():
    print(request)
    isImagePrompt = request.args.get('Image')
    isTextPrompt = request.args.get('Text')
    isSpeechPrompt = request.args.get("Speech")

    if isTextPrompt != None:
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": isTextPrompt},
        ])

        print(completion.choices[0].message)

        return completion.choices[0].message.content

    elif isImagePrompt != None:
        response = client.images.generate(
        model="dall-e-3",
        prompt=isImagePrompt,
        n=1,
        size="1024x1024"
        )
        print(response.data[0].url)
        return response.data[0].url
    
    elif isSpeechPrompt != None:
        file_path="../../client/audio/"+isSpeechPrompt+".mp3"
        path = Path(file_path)
        print(path.parent.absolute())        
        response = client.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=isSpeechPrompt,
        
        )
        response.stream_to_file(path)

if __name__ == "__main__":
    app.run(debug=True)