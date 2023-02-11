import { ReactElement, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { dashboardHome } from 'routes'
import {
	emailReg,
	isAuthenticated,
	TOKEN_STORAGE,
	USER_ID_STORAGE
} from 'utils/utils'

import { signup, ISignupFormInput } from '../Auth.api'

const EMAIL = 'email'
const USERNAME = 'username'
const NAME = 'name'
const PASSWORD = 'password'
const LASTNAME = 'lastname'

export const Signup = (): ReactElement => {
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ISignupFormInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<ISignupFormInput> = async (
		payload: ISignupFormInput
	) => {

		const {
			data,
			status
		} = await signup(payload, (userId, token) => {
			localStorage.setItem(TOKEN_STORAGE, token)
			localStorage.setItem(USER_ID_STORAGE, userId)
			navigate(dashboardHome)
		})

		if (status === 201) {
			navigate(dashboardHome)
		} else if (status === 400) {
			if (data.errors.length > 0) {
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

	useEffect(() => {
		if (isAuthenticated()) {
			navigate(dashboardHome)
		}
	}, [navigate])

	return (
		<div className="px-6">
			<div className="mb-5 text-3xl">
				<h1>Welcome to Fullstacco</h1>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-auto"
			>
				<div className="flex gap-2 mb-4">
					<div className="flex-1">
						<label htmlFor={NAME}>
							<FormattedMessage id="name" />
						</label>
						<Input
							{...register(NAME, {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.name'
									}),
									value: true
								}
							})}
							id={NAME}
							name={NAME}
							type="text"
							placeholder="Name"
							error={errors.name?.message}
							dataTestId={DataTestKeys.signupName}
						/>
					</div>
					<div className="flex-1">
						<label htmlFor={LASTNAME}>
							<FormattedMessage id="lastname" />
						</label>
						<Input
							{...register(LASTNAME, {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.lastname'
									}),
									value: true
								}
							})}
							name={LASTNAME}
							id={LASTNAME}
							type="text"
							placeholder="Lastname"
							error={errors.lastname?.message}
							dataTestId={DataTestKeys.signupLastname}
						/>
					</div>
				</div>
				<div className="mb-6">
					<label htmlFor={USERNAME}>
						<FormattedMessage id="username" />
					</label>
					<Input
						{...register(USERNAME, {
							required: {
								message: formatMessage({
									id: 'form.validation.empty.username'
								}),
								value: true
							}
						})}
						id={USERNAME}
						name={USERNAME}
						type="text"
						placeholder="Username"
						error={errors.username?.message}
						dataTestId={DataTestKeys.signupUsername}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor={EMAIL}>
						<FormattedMessage id="email" />
					</label>
					<Input
						{...register(EMAIL, {
							required: {
								message: formatMessage({
									id: 'form.validation.empty.email',
								}),
								value: true
							},
							pattern: {
								value: emailReg,
								message: formatMessage({
									id: 'form.validation.notvalid.email'
								})
							}
						})}
						id={EMAIL}
						name={EMAIL}
						type="text"
						placeholder="user@email.com"
						error={errors.email?.message}
						dataTestId={DataTestKeys.signupEmail}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor={PASSWORD}>
						<FormattedMessage id="password" />
					</label>
					<Input
						{...register(PASSWORD, {
							required: {
								message: formatMessage({
									id: 'form.validation.empty.password'
								}),
								value: true
							}
						})}
						id={PASSWORD}
						name={PASSWORD}
						type="password"
						placeholder="Password"
						error={errors.password?.message}
						dataTestId={DataTestKeys.signupPassword}
					/>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-sm font-semibold mt-2 pt-1 mb-0">
						<FormattedMessage id="signup.already.registered" />
						{' '}
						<Link
							to="/login"
							className="hover:underline"
						>
							<FormattedMessage id="login" />
						</Link>
					</p>
					<div className="w-40">
						<Button
							type="submit"
							style="primary"
							dataTestId={DataTestKeys.signupBtn}
						>
							<FormattedMessage id="signup" />
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
