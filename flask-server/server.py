from openai import OpenAI
from flask import Flask, request

app=Flask(__name__)

# API Route

client = OpenAI(
  api_key = ""
)

@app.route("/api/home", methods=["GET"])
def members():
    isImagePrompt = request.args.get('image')
    isTextPrompt = request.args.get('text')

    print("prompt1: ", isImagePrompt == None)
    print("prompt2: ", isTextPrompt == None)

    if isTextPrompt != None:
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": isTextPrompt},
        ])

        print(completion.choices[0].message)

        return completion.choices[0].message.content

    else:
        
        response = client.images.generate(
        model="dall-e-3",
        prompt=isImagePrompt,
        n=1,
        size="1024x1024"
        )
        print(response.data[0].url)
        return response.data[0].url


    # print("The data is: ", prompt)
    return {"1": ["Hello1", "Hello2", "Hello3"]}

if __name__ == "__main__":
    app.run(debug=True)