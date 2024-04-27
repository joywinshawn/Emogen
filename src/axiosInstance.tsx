import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.133.75:5000/', // Replace with your Flask backend URL
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;

// {predictions &&
  // <div className='transparent-box'>
  //     <div>Predicted Gender: {predictions.genderPrediction[0].predictedGender}</div>
  //      <div>Confidence Scores:</div>
  //     <ul>
  //         <li>Male: {predictions.genderPrediction[0].confidenceScores.Male}</li>
  //         <li>Female: {predictions.genderPrediction[0].confidenceScores.Female}</li>
  //         <li>Predicted Emotion: {predictions.emotionPrediction.predictedEmotion}</li>
  //         <li>Confidence Score: {predictions.emotionPrediction.confidenceScore}</li>
  //     </ul>
  // </div>

// }

// if({predictions.genderPrediction[0].confidenceScores.Male} > {predictions.genderPrediction[0].confidenceScores.Female})
//   {predictions.genderPrediction[0].confidenceScores.Male.toFixed(2)} 
// else 
// {predictions.genderPrediction[0].confidenceScores.Female.toFixed(2)}