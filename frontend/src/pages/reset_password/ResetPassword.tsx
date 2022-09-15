import { ReactElement, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'

import { recoverPassword, resetPassword } from './ResetPassword.api'
import styles from './ResetPassword.module.css'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

interface IFormInput {
	email?: string
	password?: string
	repeatPassword?: string
}

const ResetPassword = (): ReactElement => {
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
				navigate('/login')
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

	const renderRecoveryView = () => (
		<div className="mb-6">
			<Input
				{...register('email', {
					required: {
						message: formatMessage({
							id: 'form.validation.empty.email'
						}),
						value: true
					},
					pattern: {
						value: emailRegex,
						message: formatMessage({
							id: 'form.validation.notvalid.email'
						})
					}
				})}
				name="email"
				type="email"
				error={errors.email}
				placeholder="user@email.com"
				dataTestId={DataTestKeys.resetPasswordEmail}
			/>
		</div>
	)

	const renderResetView = () => (
		<>
			<div className="mb-6">
				<Input
					{...register('password', {
						required: {
							message: '',
							value: true
						}
					})}
					type="password"
					placeholder={
						formatMessage({
							id: 'recovery.password.your.new.password'
						})
					}
					error={errors.password}
				/>
			</div>
			<div className="mb-6">
				<Input
					{...register('repeatPassword', {
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
					type="password"
					placeholder={
						formatMessage({
							id: 'recovery.password.repeat.password'
						})
					}
					error={errors.repeatPassword}
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
			<Button
				type="submit"
				style="primary"
				dataTestId={DataTestKeys.resetPasswordSubmit}
			>
				<FormattedMessage id="recovery.password.reset" />
			</Button>
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
		<section className={styles.Container}>
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
		</section>
	)
}

export default ResetPassword
