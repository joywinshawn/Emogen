import React, { useState } from 'react';
import './Emogen.css';
import axios from './axiosInstance';

function Emogen() {
    const [showInput, setShowInput] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [showPredict, setShowPredict] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [postFile, setFileForPost] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleClick = () => {
        setShowInput(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setFile(URL.createObjectURL(file));
        setFileName(file.name);
        setShowInput(false);
        setShowPredict(true);
        setFileForPost(file)
    };

    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleReupload = () => {
        setFile(null);
        setFileName(null);
        setShowInput(true);
        setShowPredict(false);
    };

    const handleGenerate = async () => {
        const formData = new FormData();
        formData.append("file", postFile);

        try {
            const response = await axios.post("/upload", formData);
            console.log(response.data);
            if (response.status === 200) {
                setPredictions(response.data);
                setShowResults(true);
                setShowPredict(false);
            }
            else {
                throw new Error('Failed to fetch predictions');
            }
        } catch (error) {
            console.error("Error");
        }
    };

    return (
        <div>
            <div className="video-background">
                <video autoPlay loop muted className="fullscreen-video">
                    <source src="/videoback.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='title' onClick={handleTitleClick}>
                <img src="/apptitle.png" alt="Title" className="title-image" />
            </div>
            <div className='container'>
                {!showInput && !file && !showResults &&
                    <button className='buttoninput' onClick={handleClick}>
                        <img src="/inputfileicon.png" alt="Upload Icon" />
                    </button>
                }
                {showInput && !showResults &&
                    <div className='transparent-box'>
                        <div className="message1">
                            Audio File Here...
                        </div>
                        <div className="centerBox">
                            <div className="subBox">
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    UPLOAD
                                </label>
                                <input id="file-upload" type='file' accept='.wav' onChange={handleFileChange} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                }
                {file && !showResults &&
                    <div className='transparent-box'>
                        <div className='message1'>
                            File Uploaded Successfully !!!
                        </div>
                        <div className='audio-container'><audio controls>
                            <source src={file} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        </div>
                        <div className='centerBox2'>
                            <div className='subBox2'>
                                <p>{fileName}</p>
                            </div>
                        </div>
                    </div>
                }
                {showResults &&
                    <div className='transparent-box2'>
                        <h1>Estimated Result</h1>
                        <div className='result-container' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <div className='emoji'>
                                {predictions.emotionPrediction.predictedEmotion === 'Happy' && predictions.genderPrediction[0].predictedGender === 'Male' ?
                                    <img src="/maleHappy.jpg" alt="HappyMale" /> :
                                    predictions.emotionPrediction.predictedEmotion === 'Sad' && predictions.genderPrediction[0].predictedGender === 'Male' ?
                                    <img src="/maleSad.jpg" alt="SadMale" /> :
                                        predictions.emotionPrediction.predictedEmotion === 'Neutral' && predictions.genderPrediction[0].predictedGender === 'Male' ?
                                        <img src="/maleNeutral.jpg" alt="NeutralMale" /> :
                                        predictions.emotionPrediction.predictedEmotion === 'Happy' && predictions.genderPrediction[0].predictedGender === 'Female' ?
                                        <img src="/femaleHappy.jpg" alt="Happyfemale" /> :
                                        predictions.emotionPrediction.predictedEmotion === 'Sad' && predictions.genderPrediction[0].predictedGender === 'Female' ?
                                        <img src="/femaleSad.jpg" alt="Sadfemale" /> :
                                        predictions.emotionPrediction.predictedEmotion === 'Neutral' && predictions.genderPrediction[0].predictedGender === 'Female' ?
                                        <img src="/femaleNeutral.jpg" alt="Neutralfemale" /> : 'ERROR'
                                    }
                            </div>
                            <div className='results' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
                                <div className='result1'>Emotion: <p><b>{predictions.emotionPrediction.predictedEmotion}</b></p></div>
                                <div className='result2'>Confidence: <p><b>{(predictions.emotionPrediction.confidenceScore * 100).toFixed(2)}%</b></p></div>
                                <div className='result3'>Gender: <p><b>{predictions.genderPrediction[0].predictedGender}</b></p></div>
                                <div className='result4'>
                                    Confidence:
                                    <p>
                                        <b>
                                            {`${(predictions.genderPrediction[0].confidenceScores.Male > predictions.genderPrediction[0].confidenceScores.Female ?
                                                predictions.genderPrediction[0].confidenceScores.Male : predictions.genderPrediction[0].confidenceScores.Female) * 100
                                                }%`}
                                        </b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='buttoncontainer'>
                {showPredict && !showResults &&
                    <>
                        <button className='buttonreupload' onClick={handleReupload}>RE-UPLOAD</button>&nbsp;&nbsp;&nbsp;
                        <button className='buttongenerate' onClick={handleGenerate}>GENERATE</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Emogen;
