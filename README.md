## SonicSpeech - Speech-to-Text Transcription App

SonicSpeech is a web-based application that allows you to transcribe audio/video files or text to speech. This app uses the AssemblyAI API for audio transcription and the react-speech-kit library for text-to-speech conversion.



## Features

- Transcribe audio files (MP3, WAV, MP4, WebM) to text.
- Generate audio files from text input.
- Download transcribed text and generated audio.

# Technologies Used

- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for making API requests.
- AssemblyAI API: Used for audio transcription.
- react-speech-kit: A text-to-speech library.
- React Icons: Icons for the user interface.
- React-File-Download: A library for triggering file downloads.

# Installation

1. Clone the repository to your local machine:
   ```shell
    git clone https://github.com/yourusername/SonicSpeech.git

3. Navigate to the project directory:
    cd SonicSpeech

5. Install the required dependencies:
    npm install

   
7. Set up your AssemblyAI API Key:

Create a .env file in the project root.
Add your AssemblyAI API Key to the .env file:
  REACT_APP_ASSEMBLY_API_KEY=your_api_key_here

#  Usage
Start the development server:
  npm start
Open your web browser and navigate to http://localhost:3000 to use SonicSpeech.

# Transcribe Audio
1. Click the "Transcribe Audio" button.
2. Select an audio file or provide a link to an audio file.
3. Optionally, check the "Include Speaker Information" box.
4. Choose the transcription language from the dropdown.
5. Click the "Transcribe File" button.
6. View the transcription when it's completed.
   
# Generate Audio from Text
1. Provide the text you want to convert to audio.
2. Select the desired language.
3. Click the "Generate Audio" button.
4. You can download the generated audio once it's ready.

# Contributing
Contributions are welcome! If you'd like to contribute to SonicSpeech, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

 # Contact
If you have any questions or issues, feel free to contact us:

# Devdatt Datar - datardevdatt@gamil.com

# Acknowledgments
We would like to thank the following libraries and services for making SonicSpeech possible:

AssemblyAI API
responsivevoice

