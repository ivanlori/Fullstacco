import { ReactElement } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'

import { signup } from './Signup.api'
import styles from './Signup.module.css'

interface IFormInput {
	name: string
	lastname: string
	username: string
	email: string
	password: string
}

const Signup = (): ReactElement => {
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {

		const result = await signup(data)

		if (result?.status === 201) {
			navigate('/')
		} else if (result?.status === 400) {
			if (result.data.errors.length > 0) {
				dispatch(displayToast(
					formatMessage({ id: 'form.validation.generic' }),
					'error'
				))
			}
		} else {
			dispatch(displayToast(
				formatMessage({ id: 'feedback.general.error' }),
				'error'
			))
		}
	}

	return (
		<section className={styles.Container}>
			<div className="px-6">
				<div className="mb-5 text-3xl">
					<h1>Welcome to Fullstacco</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-96"
				>
					<div className="mb-6">
						<Input
							{...register('name', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.name'
									}),
									value: true
								}
							})}
							type="text"
							placeholder="Name"
							error={errors.name}
							dataTestId="name"
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('lastname', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.lastname'
									}),
									value: true
								}
							})}
							type="text"
							placeholder="Lastname"
							error={errors.lastname}
							dataTestId="lastname"
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('username', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.username'
									}),
									value: true
								}
							})}
							type="text"
							placeholder="Username"
							error={errors.username}
							dataTestId="username"
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('email', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.email',
									}),
									value: true
								},
								pattern: {
									value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
									message: formatMessage({
										id: 'form.validation.notvalid.email'
									})
								}
							})}
							type="text"
							placeholder="Email address"
							error={errors.email}
							dataTestId="email"
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('password', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.password'
									}),
									value: true
								}
							})}
							type="password"
							placeholder="Password"
							error={errors.password}
							dataTestId="password"
						/>
					</div>
					<div className="flex justify-between items-center">
						<p className="text-sm font-semibold mt-2 pt-1 mb-0">
							<FormattedMessage id="signup.already.registered" />
							{' '}
							<a
								href="/login"
								className="hover:underline"
							>
								<FormattedMessage id="login" />
							</a>
						</p>
						<Button
							type="submit"
							style="primary"
							dataTestId="signupBtn"
						>
							<FormattedMessage id="signup" />
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Signup