import { expect } from 'chai'
import { test } from 'mocha'
import request from 'supertest'

import { PAGINATION_LIMIT } from '../controllers/user'
import app, { apiV1Base } from '../index'
import { mockedUser } from '../mocks/mocked_user'
import user from '../models/user'

describe('User Controller', () => {
	test('[Create] should create a user', (done) => {
		request(app)
			.post(`${apiV1Base}/users/create`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.send({
				name: 'somename',
				lastname: 'somelastname',
				username: 'someusername',
				email: 'some@email.com',
				password: 'password',
				photoUrl: '',
				emailConfirmed: true,
				isActive: true,
				role: 0,
			})
			.end((err, res) => {
				mockedUser.id = res.body.userId
				expect(res.statusCode).to.equal(201)
				expect(res.body).deep.equal({
					userId: res.body.userId
				})
				done()
			})
	})

	test('[Get User] should get a user', (done) => {
		request(app)
			.get(`${apiV1Base}/users/${mockedUser.id}`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.end((err, res) => {
				expect(res.statusCode).to.equal(200)
				expect(res.body).deep.equal({
					_id: res.body._id,
					isActive: res.body.isActive,
					lastname: res.body.lastname,
					name: res.body.name,
					username: res.body.username,
					email: res.body.email,
					role: res.body.role,
					photoUrl: res.body.photoUrl,
					createdAt: res.body.createdAt,
					updatedAt: res.body.updatedAt,
				})
				done()
			})
	})

	test('[Get Users] should get list of users', (done) => {
		request(app)
			.get(`${apiV1Base}/users/?page=1&limit=${PAGINATION_LIMIT}`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.end((err, res) => {
				expect(res.statusCode).to.equal(200)
				expect(res.body).deep.equal({
					users: res.body.users,
					totalPages: res.body.totalPages,
					currentPage: res.body.currentPage
				})
				done()
			})
	})

	test('[Update User] should update a user', (done) => {
		request(app)
			.patch(`${apiV1Base}/users/${mockedUser.id}`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.send({
				name: 'updated name'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				done()
			})
	})

	test('[Status User] should handle status user', (done) => {
		request(app)
			.patch(`${apiV1Base}/users/${mockedUser.id}/activate`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.send({
				isActive: false
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				done()
			})
	})

	test('[Delete Photo User] should delete photo user', (done) => {
		request(app)
			.delete(`${apiV1Base}/users/${mockedUser.id}/photo`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.send({
				photoUrl: ''
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
				expect(res.body).deep.equal({
					photo_url: ''
				})
				done()
			})
	})

	test('[Delete User] should delete user', (done) => {
		request(app)
			.delete(`${apiV1Base}/users/${mockedUser.id}`)
			.set('Authorization', `Bearer ${mockedUser.token}`)
			.end((err, res) => {
				expect(res.statusCode).to.equal(201)
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
