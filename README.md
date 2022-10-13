<h1 align="center">
 	Fullstacco
</h1>

<h4 align="center">the MERN boilerplate for your next project</h4>

<p align="center">
<a href="https://github.com/ivanlori/Fullstacco/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/ivanlori/Fullstacco"></a>
<a href="https://github.com/ivanlori/Fullstacco/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/ivanlori/Fullstacco"></a>
<a href="https://github.com/ivanlori/Fullstacco/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/ivanlori/Fullstacco"></a>
<a href="https://github.com/ivanlori/Fullstacco/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/ivanlori/Fullstacco"></a>
</p>

<br />

Fullstacco (IPA: /fullstakkɒ/) is a boilerplate written in NodeJs/ExpressJs for the backend part, with ReactJs for the Frontend and MongoDB as Database. It has basic functionalities (reported below) to speed your development up if you start from scratch.

## Features

* Classic Login
* Classic Signup
* Reset password
* List of users
* Delete, update and creation of user
* Roles per user (Admin|Account)

## Tech Stack used

* Express.js/Node.js
* MongoDB
* React.js
* Typescript
* Redux.js
* React testing library
* TailwindCSS

## 🐳 Using it with Docker
```
# clone repository
git clone https://github.com/ivanlori/Fullstacco.git

## backend
cd fullstacco/backend && docker-compose up -d

## frontend
cd fullstacco/frontend && docker-compose up -d
```

## Requirements

- MongoDb account and a running cluster
- Node.js v18

## 🚀 Classic installation

```
# clone repository
git clone https://github.com/ivanlori/Fullstacco.git

## backend:

# setup the .env file with wizard
cd fullstacco/backend && yarn setup-env

# install dependencies
yarn

# start the app, it will run at localhost:5000
yarn start

## frontend:

# setup the .env file with wizard
cd fullstacco/frontend && yarn setup-env

# install dependencies
yarn

# start the app, it will run at localhost:3000
yarn start
```

## 🐛 Bugs

Have you found a bug? Feel free to open an <a href="https://github.com/ivanlori/Fullstacco/issues/new?assignees=&labels=&template=bug_report.md&title=">issue here</a>.

## 🙋 Discussions

Do you have questions, ideas or any request related to Fullstacco? Start a <a href="https://github.com/ivanlori/Fullstacco/discussions">discussion here</a>.

## 🏷️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
