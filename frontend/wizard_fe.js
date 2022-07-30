#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let backendApiUrl = ''

console.log(
	`Welcome to the Frontend wizard of Fullstacco, here will be configured the .env file for you\n`
)

console.log(
	`For this part we need to setup only the API url\n`
)

rl.question('Enter your backend API url: ', url => {
	backendApiUrl = url

	console.log(
		`alright! Generating the .env file...\n`
	)

	const envExamplePath = path.join(__dirname + '.env.example')

	const dataToWrite = `
		\nREACT_APP_SERVER_API_URL=${backendApiUrl}
	`

	// delete the old content
	fs.writeFile(envExamplePath, '', (err) => {
		if (err) return console.log(
			`Error cancelling old file\n`
		)

		fs.writeFile(envExamplePath, dataToWrite, { flag: 'a+' }, (err) => {
			if (err) return console.log(
				`Error writing new file\n`
			)

			fs.rename(envExamplePath, '.env', (err) => {
				if (err) return console.log(
					`Error renaming old file\n`
				)
			})
		})
	})

	console.log('.env file generated!')

	rl.close()
})





