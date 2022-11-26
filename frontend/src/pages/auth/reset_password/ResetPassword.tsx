import { ReactElement, useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { dashboardHome, login } from 'routes'
import { emailReg, isAuthenticated } from 'utils/utils'

import { recoverPassword, resetPassword } from '../Auth.api'

const EMAIL = 'email'
const PASSWORD = 'password'
const REPEAT_PASSWORD = 'repeatPassword'

interface IFormInput {
	email?: string
	password?: string
	repeatPassword?: string
}

export const ResetPassword = (): ReactElement => {
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const [recoverySuccess, setRecoverySuccess] = useState(false)
	const { token } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm<IFormInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IFormInput> = async (payload: IFormInput) => {
		if (token) {
			const {
				status
			} = await resetPassword({
				password: payload.password,
				token
			})

			if (status === 201) {
				dispatch(displayToast(
					formatMessage({
						id: "feedback.reset.password.new.set"
					}), 'success'
				))
				navigate(login)
			} else {
				dispatch(displayToast(
					formatMessage({ id: "feedback.general.error" }), 'error')
				)
			}
		} else {
			const {
				status
			} = await recoverPassword(payload.email)

			if (status === 201) {
				setRecoverySuccess(true)
			} else {
				dispatch(displayToast(
					formatMessage({ id: "feedback.general.error" }), 'error'
				))
			}
		}
	}

	useEffect(() => {
		if (isAuthenticated()) {
			navigate(dashboardHome)
		}
	}, [navigate])

	const renderRecoveryView = () => (
		<div className="mb-6">
			<label htmlFor={EMAIL}>
				<FormattedMessage id="email" />
			</label>
			<Input
				{...register(EMAIL, {
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
				name={EMAIL}
				type="email"
				error={errors.email?.message}
				placeholder="user@email.com"
				dataTestId={DataTestKeys.resetPasswordEmail}
			/>
		</div>
	)

	const renderResetView = () => (
		<>
			<div className="mb-6">
				<label htmlFor={PASSWORD}>
					<FormattedMessage id="password" />
				</label>
				<Input
					{...register(PASSWORD, {
						required: {
							message: '',
							value: true
						}
					})}
					name={PASSWORD}
					id={PASSWORD}
					type="password"
					placeholder={
						formatMessage({
							id: 'recovery.password.your.new.password'
						})
					}
					error={errors.password?.message}
				/>
			</div>
			<div className="mb-6">
				<label htmlFor={REPEAT_PASSWORD}>
					<FormattedMessage id="recovery.password.repeat.password" />
				</label>
				<Input
					{...register(REPEAT_PASSWORD, {
						required: {
							message: '',
							value: true
						},
						validate: {
							matchesPreviousPassword: (value) => {
								const { password } = getValues()
								return password === value || formatMessage({
									id: 'recovery.password.passwords.dont.match'
								})
							}
						}
					})}
					id={REPEAT_PASSWORD}
					name={REPEAT_PASSWORD}
					type="password"
					placeholder={
						formatMessage({
							id: 'recovery.password.repeat.password'
						})
					}
					error={errors.repeatPassword?.message}
				/>
			</div>
		</>
	)

	const renderTitle = () => (
		<div className="mb-5 text-3xl">
			<h1>
				{token ? (
					<FormattedMessage id="recovery.password.set.new.password" />
				) : (
					<FormattedMessage id="recovery.password.reset.password" />
				)}
			</h1>
		</div>
	)

	const renderActionsView = () => (
		<div className="flex justify-between items-center">
			{!token && (
				<a
					href="/login"
					className="hover:underline"
				>
					<FormattedMessage id="recovery.password.go.back" />
				</a>
			)}
			<div className="w-40">
				<Button
					type="submit"
					style="primary"
					dataTestId={DataTestKeys.resetPasswordSubmit}
				>
					<FormattedMessage id="recovery.password.reset" />
				</Button>
			</div>
		</div>
	)

	const renderRecoverySuccessView = () => (
		<div
			className="text-center text-3xl"
			data-testid={DataTestKeys.recoverySuccess}
		>
			{formatMessage({
				id: "feedback.reset.password.email.sent"
			})}
		</div>
	)

	return (
		<div className="px-6">
			{
				!recoverySuccess && renderTitle()
			}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-96"
			>
				{
					!recoverySuccess ? (
						token ? renderResetView() : renderRecoveryView()
					) : (<></>)
				}
				{
					!recoverySuccess && renderActionsView()
				}
				{
					recoverySuccess && renderRecoverySuccessView()
				}
			</form>
		</div>
	)
}
