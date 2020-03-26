# Bitter

Bitter is a social media app made to mimic Twitter. Bitter employs a React frontend and communicates with its MongoDB backend via GraphQL and Apollo.

### [Live Site](https://meetin-mern.herokuapp.com/)

## Features

### Authentication

<img src="https://user-images.githubusercontent.com/55020778/77697420-10f71200-6f6c-11ea-9486-c53b1285fe82.png">
Bitter houses a custom-made auth pattern, utilizing BCrypt to hash passwords before storing them in the database. 

<img src="https://user-images.githubusercontent.com/55020778/77697561-4e5b9f80-6f6c-11ea-94a1-3fc73e70439b.png">
Bitter's UI was crafted to closely resemble the look and feel of Twitter. Users can create, rebit (retweet), and favorite posts. Users can also upload images and gifs with their posts, which are saved to an AWS S3 Bucket.

<img src="https://user-images.githubusercontent.com/55020778/77697578-587d9e00-6f6c-11ea-8b67-fdbb2e88f635.png">
Hashtags are automatically parsed from new posts and stored in the database as their own objects, allowing posts to be organized and categorized based on their hashtags.

<img width="300px" src="https://user-images.githubusercontent.com/55020778/77697539-43087400-6f6c-11ea-890d-350f100c68ac.png">
The search component utilizes regular expressions to only query the database for content that is related to the search term. Graphql queries the database in real time, allowing the search to autofill.

### Technologies Used
Bitter is built using MongoDB, Apollo, React, AWS
