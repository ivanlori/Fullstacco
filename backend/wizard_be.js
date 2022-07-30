#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let mondodbUser = ''
let mondodbPassword = ''
let mondodbCluster = ''
let mondodbTable = ''

let emailHost = ''
let emailPort = ''
let emailUsername = ''
let emailPassword = ''

let secretKey = ''

let clientDomain = ''

console.log(
	`Welcome to the Backend wizard of Fullstacco, here will be configured the .env file for you\n`
)

console.log(
	`First we need to setup the mongo db database\n`
)

rl.question('Enter your mongodb user: ', user => {
	mondodbUser = user

	rl.question('Enter your mongodb password: ', password => {
		mondodbPassword = password

		rl.question('Enter your mongodb cluster: ', cluster => {
			mondodbCluster = cluster

			rl.question('Enter your mongodb table: ', table => {
				mondodbTable = table

				console.log(
					`Ok, now we need to setup your email provider\n`
				)
				
				rl.question('Enter your email service host: ', host => {
					emailHost = host

					rl.question('Enter your email service port: ', port => {
						emailPort = port

						rl.question('Enter your email service username: ', user => {
							emailUsername = user

							rl.question('Enter your email service password: ', password => {
								emailPassword = password

								console.log(
									`Ok, now we create a secret key for authentication, make sure it is a strong password`
								)
								
								rl.question('Enter your super secret key password: ', secret => {
									secretKey = secret

									console.log(
										`Ok, finally we setup the client url, it could be your localhost for DEV environment or your production url`
									)
									
									rl.question('Enter your client url with the port (i.e. http://localhost:3000): ', client => {
										clientDomain = client

										console.log(
											`alright! Generating the .env file...\n`
										)

										const envExamplePath = path.join(__dirname + '.env.example')

										const dataToWrite = `
										\nSECRET_KEY=${secretKey}
										\nEMAIL_HOST=${emailHost}
										\nEMAIL_PORT=${emailPort}
										\nEMAIL_USERNAME=${emailUsername}
										\nEMAIL_PASSWORD=${emailPassword}
										\nCLIENT_DOMAIN=${clientDomain}
										\nMONGO_DB_USER=${mondodbUser}
										\nMONGO_DB_PASSWORD=${mondodbPassword}
										\nMONGO_DB_CLUSTER=${mondodbCluster}
										\nMONGO_DB_TABLE=${mondodbTable}
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
								})
							})
						})
					})
				})
			})
		})
	})
})





