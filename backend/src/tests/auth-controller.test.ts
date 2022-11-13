import { expect } from 'chai'
import { test } from 'mocha'
import request from 'supertest'

import app, { apiV1Base } from '../index'
import {
	EMAIL_NOT_EXISTS,
	EMAIL_RECOVERY_SENT,
	RESET_PASSWORD_DONE,
	TOKEN_NOT_VALID,
	USER_NOT_EXISTS,
	WAITING_CONFIRMATION_EMAIL,
	WRONG_PASSWORD
} from '../messages'
import user from '../models/user'
import { EMAIL_INVALID } from '../routes/auth'

describe('Auth Controller', () => {
	const mockedUser = {
		email: `test.${Date.now() + 3600000}@email.com`,
		password: 'password',
		id: '',
		reset_token: ''
	}

	test('[Signup] should execute signup successfully', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/signup`)
			.send({
				name: 'testname',
				lastname: 'testlastname',
				username: 'testusername',
				email: mockedUser.email,
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				expect(res.body).deep.equal({
					message: WAITING_CONFIRMATION_EMAIL,
					userId: res.body.userId,
					token: res.body.token
				})

				mockedUser.id = res.body.userId
				done()
			})
	})

	test('[Signup] should fail signup', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/signup`)
			.send({
				name: 'testname',
				lastname: 'testlastname',
				username: 'testusername',
				email: 'someemail.com',
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(400)
				expect(res.body).deep.equal({
					errors: [
						{
							location: "body",
							msg: EMAIL_INVALID,
							param: "email",
							value: "someemail.com"
						}
					]
				})
				done()
			})
	})

	test('[Login] should execute authentication successfully', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/login`)
			.send({
				email: mockedUser.email,
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(200)
				expect(res.body).deep.equal({
					userId: res.body.userId,
					token: res.body.token
				})
				done()
			})
	})

	test('[Login] should fail because user doesn\'t exist', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/login`)
			.send({
				email: 'notexisting@email.com',
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(401)
				expect(res.body).deep.equal({
					message: USER_NOT_EXISTS,
				})
				done()
			})
	})

	test('[Login] should fail because wrong password', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/login`)
			.send({
				email: mockedUser.email,
				password: 'wrongpassword'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(401)
				expect(res.body).deep.equal({
					message: WRONG_PASSWORD,
				})
				done()
			})
	})

	test('[Recovery Password] should recover successfully', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/recovery-password`)
			.send({
				email: mockedUser.email
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				expect(res.body).deep.equal({
					message: EMAIL_RECOVERY_SENT,
					token: res.body.token
				})

				mockedUser.reset_token = res.body.token
				done()
			})
	})

	test('[Recovery Password] should fail because user doesn\'t exist ', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/recovery-password`)
			.send({
				email: 'notexisting@email.com'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(400)
				expect(res.body).deep.equal({
					message: EMAIL_NOT_EXISTS,
				})
				done()
			})
	})

	test('[Reset Password] should reset successfully', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/reset-password/${mockedUser.reset_token}`)
			.send({
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				expect(res.body).deep.equal({
					message: RESET_PASSWORD_DONE
				})
				done()
			})
	})

	test('[Reset Password] should fail because incorrect token', (done) => {
		request(app)
			.post(`${apiV1Base}/auth/reset-password/incorrecttoken123`)
			.send({
				password: mockedUser.password
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(400)
				expect(res.body).deep.equal({
					message: TOKEN_NOT_VALID
				})
				done()
			})
	})

	after((done) => {
		user.findByIdAndDelete(mockedUser.id).then(() => {
			console.log('Mocked user deleted!')
			done()
		})
	})
})
