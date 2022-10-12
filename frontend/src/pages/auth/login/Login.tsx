import { ReactElement, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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

import { login, ILoginFormInput } from '../Auth.api'

const EMAIL = 'email'
const PASSWORD = 'password'

const Login = (): ReactElement => {
	const dispatch = useDispatch<Dispatch>()
	const navigate = useNavigate()
	const { formatMessage } = useIntl()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILoginFormInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<ILoginFormInput> = async (
		payload: ILoginFormInput
	) => {
		const {
			data,
			status
		} = await login(payload, (userId, token) => {
			localStorage.setItem(TOKEN_STORAGE, token)
			localStorage.setItem(USER_ID_STORAGE, userId)
			navigate(dashboardHome)
		})

		if (status === 401) {
			if (data.message === 'wrong_password') {
				dispatch(
					displayToast(formatMessage({
						id: "feedback.user.wrong.password"
					}), 'error')
				)
			} else {
				dispatch(
					displayToast(formatMessage({
						id: "feedback.user.not.exists"
					}), 'error')
				)
			}
		} else if (status !== 401 && status !== 200) {
			dispatch(
				displayToast(formatMessage({
					id: "feedback.general.error"
				}), 'error')
			)
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-6">
					<label htmlFor={EMAIL}>
						<FormattedMessage id="email" />
					</label>
					<Input
						{...register('email', {
							required: {
								message: formatMessage({
									id: 'form.validation.empty.email'
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
						type="email"
						name={EMAIL}
						placeholder="user@email.com"
						error={errors.email?.message}
						dataTestId={DataTestKeys.loginEmail}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor={PASSWORD}>
						<FormattedMessage id='password' />
					</label>
					<Input
						{...register('password', {
							required: {
								message: formatMessage({
									id: 'form.validation.empty.password'
								}),
								value: true
							}
						})}
						id={PASSWORD}
						type="password"
						name={PASSWORD}
						placeholder="**********"
						error={errors.password?.message}
						dataTestId={DataTestKeys.loginPassword}
					/>
				</div>
				<div className="flex justify-between items-center">
					<a
						href="/recovery-password"
						className="text-gray-800 hover:underline"
					>
						<FormattedMessage id="login.forgot.password" />
					</a>
					<div className="w-40">
						<Button
							style="primary"
							type="submit"
							dataTestId={DataTestKeys.loginSubmit}
						>
							<FormattedMessage id="login" />
						</Button>
					</div>
				</div>
				<p className="text-sm font-semibold mt-2 pt-1 mb-0">
					<FormattedMessage id="login.dont.have.account" />
					{' '}
					<a
						href="/signup"
						className="hover:underline"
					>
						<FormattedMessage id="login.register" />
					</a>
				</p>
			</form>
		</div>
	)
}

export default Login
