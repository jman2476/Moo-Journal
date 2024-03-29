# MooJournal

## Overview 
MooJournal is an innovative journaling application designed to empower users to track their mood and engage in reflective writing through personalized light and heavy prompts depending on how the user is feeling. Rooted in the belief that journaling can significantly enhance emotional well-being and self-awareness, MooJournal offers a user-friendly platform for individuals to cultivate mindfulness and emotional intelligence.

## Repository
Link to deployed code: https://github.com/jman2476/Moo-Journal

## Features
Mood Tracking: MooJournal allows users to log their mood on a daily basis using an intuitive interface. Users can select their mood from a range of options and see their moods tracked in graphs overtime to provide a comprehensive overview of their emotional state over time.

Personalized Prompts: To inspire meaningful reflection and self-discovery, Moo Journal delivers personalized writing prompts tailored to each user's mood and preferences. These prompts are designed to stimulate introspection, creativity, and personal growth, guiding users to explore their thoughts, feelings, and experiences in depth.

Journal Entries: Users can effortlessly create journal entries in response to the provided prompts or write freely about any topic of interest. MooJournal provides a safe and welcoming space for users to express themselves authentically, allowing them to revisit their entries later for reflection and insight.

## Usage
Head to the deployed link: 

Create an account on MooJournal or login to an exisiting account.

Then feel free to create new journal entries. Begin by indicating your current mood using the bar labeled 'How do you feel today?' and then proceed by clicking 'Continue'. Once your mood is submitted, you have the option to either receive a prompt or engage in a free write entry. If you opt for a prompt, you can select either 'light' or 'heavy' based on the depth of exploration desired. Should the generated prompt not align with your preferences, you also have the choice to generate a new one. Once you are content with the journal entry you have made click 'submit'.

All of the journal entries made can be viewed on your 'My MooJournal' Dashboard. From this page you can also write additional entries and 'Check your Charts' which allows you to see graph data of your logged mood entries. 

## Installtion
To install this project, follow these steps:

1. Open your terminal.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:
     ```bash
   git clone git@github.com:jman2476/Moo-Journal.git
4. Navigate into the project directory: 
    ```bash
    cd moo-journal
5. Set up your .env file
    ```bash
    touch.env
    nano.env
    
Add the following environment variables to the .env file:

        JWT_SECRET=''   
        API_KEY=''
        OPENAI_API_KEY_1=''  
    
6. Install dependencies for the client side: 
    ```bash
    npm run install:client
7. Install dependencies for the server side:
    ```bash
    npm run install
8. Now you're ready to go! You can start the development environment by running: 
    ```bash
    npm run dev

## Technologies
Backend: Mongoose, Express, Graphql, OpenAI, DayJs

Frontend: HTML, SCSS, Javascript, Tachyons CSS, Vite, React, DraftJs

## License
This project is licensed under the MIT License.

## Badges
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Credits
Resources provided by rutgers university full stack bootcamp and Chatgpt-4

## Contributors
https://github.com/cjswayne
https://github.com/jsaini1727
https://github.com/shannontice
https://github.com/Wintino5
https://github.com/jman2476
