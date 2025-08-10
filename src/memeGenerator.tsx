import React, { useEffect, useState } from "react"
import "./styles.css"

type MemeType = {
    id: string
    name: string
    url: string
    width: number
    height: number
    box_count: number
}

const demoMemeTexts = [
    { topText: "WHEN YOU CODE", bottomText: "AND IT WORKS IN FIRST TRY" },
    { topText: "ME TRYING TO STUDY", bottomText: "BUT MEMES EXIST" },
    { topText: "REACT DEVELOPERS BE LIKE", bottomText: "USESTATE TO CONTROL EMOTIONS" }
]

export default function MemeGenerator() {
    const [meme, setMeme] = useState({
        topText: demoMemeTexts[0].topText,
        bottomText: demoMemeTexts[0].bottomText,
        imageUrl: "https://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState<MemeType[]>([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getRandomMemeImage() {
        const index = Math.floor(Math.random() * allMemes.length)
        const selected = allMemes[index]
        if (selected?.url) {
            const randomText = demoMemeTexts[Math.floor(Math.random() * demoMemeTexts.length)]
            setMeme(prev => ({
                ...prev,
                imageUrl: selected.url,
                ...randomText
            }))
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div
            className="min-h-screen bg-chat-pattern bg-cover bg-center flex flex-col items-center justify-center px-4 py-10 text-white"
        >
            <h1
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-center gap-3 text-3xl md:text-4xl lg:text-4xl text-white font-extrabold py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-md shadow-md animate-fade-in"
            >
                <i className="fas fa-laugh-beam text-white text-2xl mt-1"></i>
                Meme Generator
            </h1>




            <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-6 mt-10 animate-slide-up">
                <input
                    type="text"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                    className="flex-1 p-3 rounded-md text-black text-md shadow-md border border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Enter your Top Text here"
                />
                <input
                    type="text"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                    className="flex-1 p-3 rounded-md text-black text-md shadow-md border border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Enter your Bottom Text here"
                />
            </div>

            <button
                onClick={getRandomMemeImage}
                className="w-full md:w-[calc(100%-1rem)] max-w-2xl bg-gradient-to-r from-purple-500 to-indigo-600 bg-[length:200%_200%] bg-left-top hover:bg-right-bottom transition-all duration-400 ease-in-out 
             text-white font-bold py-3 px-6 rounded-md shadow-lg transform hover:scale-102 animate-pop-in cursor-pointer"
            >
                Generate a new Meme 🔄
            </button>


            <div className="relative mt-10 w-full max-w-2xl">
                <img
                    src={meme.imageUrl}
                    alt="meme"
                    className="w-full max-h-[500px] object-contain rounded-lg shadow-lg border border-white animate-zoom-in"
                />
                <h2 className="absolute top-3 left-1/2 transform -translate-x-1/2 w-full px-4 text-center text-white text-[6.2vw] sm:text-[5vw] md:text-[6vw] lg:text-[2.6vw] font-extrabold uppercase break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] meme-text">
                    {meme.topText}
                </h2>


                <h2 className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full px-4 text-center text-white text-[6.2vw] sm:text-[5vw] md:text-[6vw] lg:text-[2.6vw] font-extrabold uppercase break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] meme-text">
                    {meme.bottomText}
                </h2>

            </div>
        </div>
    )
}
