import { ReactElement } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { setIdProfile } from 'pages/profile/store/Profile.actions'

import { login, IFormInput } from './Login.api'
import styles from './Login.module.css'

const Login = (): ReactElement => {
	const dispatch = useDispatch<Dispatch>()
	const navigate = useNavigate()
	const { formatMessage } = useIntl()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IFormInput> = async (payload: IFormInput) => {
		const {
			data,
			status
		} = await login(payload)

		if (status === 200) {
			localStorage.setItem('tk', data.token)
			localStorage.setItem('userId', data.userId)
			dispatch(setIdProfile(data.userId))
			navigate('/')
		} else if (status === 401) {
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
		} else {
			dispatch(
				displayToast(formatMessage({
					id: "feedback.general.error"
				}), 'error')
			)
		}
	}

	return (
		<section className={styles.Container}>
			<div className="px-6">
				<div className="mb-5 text-3xl">
					<h1>Welcome to Fullstacco</h1>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-6">
						<Input
							{...register('email', {
								required: {
									message: formatMessage({
										id: 'form.validation.empty.email'
									}),
									value: true
								}
							})}
							type="email"
							name="email"
							placeholder="user@email.com"
							error={errors.email?.message}
							dataTestId={DataTestKeys.loginEmail}
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
							name="password"
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
						<Button
							style="primary"
							type="submit"
							dataTestId={DataTestKeys.loginSubmit}
						>
							<FormattedMessage id="login" />
						</Button>
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
		</section>
	)
}

export default Login
