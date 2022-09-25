import { ReactElement, useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Dispatch } from 'redux'

import { Button, Loader, Input } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { IProfileState, IRoleSelection, IUserState } from 'types/profile'

import { createUser, deleteUser, updateUser } from '../User.api'

interface IFormInput {
	name: string
	lastname: string
	username: string
	email: string
	password: string
	role: number
}

interface Props {
	user: IProfileState | null
	title: string
}

const options = [
	{ value: 0, label: 'Admin' },
	{ value: 1, label: 'Account' },
]

const NAME = 'name'
const LASTNAME = 'lastname'
const PASSWORD = 'password'
const EMAIL = 'email'
const USERNAME = 'username'
const ROLE = 'role'

const UserForm = ({
	user,
	title
}: Props): ReactElement => {
	const {
		formatMessage
	} = useIntl()
	const [roleSelected, setRoleSelected] = useState<IRoleSelection>(options[0])
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch>()
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState(user?.name)
	const [lastname, setLastname] = useState(user?.lastname)
	const [email, setEmail] = useState(user?.email)
	const [username, setUsername] = useState(user?.username)
	const [password, setPassword] = useState(user?.password)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()

	const handleResult = (status: number | undefined, successLabel: string) => {
		if (status === 201) {
			dispatch(displayToast(
				formatMessage({ id: successLabel }),
				'success'
			))

			navigate('/users')
		} else {
			dispatch(displayToast(
				formatMessage({ id: "feedback.general.error" }),
				'error'
			))
		}
	}

	const onSubmit: SubmitHandler<IFormInput> = async () => {

		const data: IProfileState = {
			email: email as string,
			lastname: lastname as string,
			name: name as string,
			username: username as string,
			role: roleSelected.value,
			photoUrl: '',
			emailConfirmed: user ? user.emailConfirmed : false,
		}

		if (user) {
			const payload: IProfileState = {
				...data,
				id: user.id,
				updatedAt: new Date().toISOString(),
			}

			const { status } = await updateUser(payload)

			handleResult(status, "feedback.user.updated")
		} else {
			const payload: IUserState = {
				...data,
				isActive: true,
				password
			}

			const {
				status
			} = await createUser(payload)

			handleResult(status, "feedback.user.created")
		}
	}

	const onDeleteUser = async () => {
		setLoading(true)
		const {
			status
		} = await deleteUser(user?.id)
		setLoading(false)

		handleResult(status, "feedback.user.deleted")
	}

	useEffect(() => {
		if (user?.role) {
			setRoleSelected({
				value: user.role,
				label: options[user.role].label
			})
		}
	}, [user?.role])

	return (
		<div className="px-8">
			<div className="flex justify-between mb-5">
				<h1 className="text-2xl font-medium">
					{title}
				</h1>
			</div>
			<form
				className="text-gray_900"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-4">
					<label>
						{formatMessage({ id: 'user.create.update.name' })}
					</label>
					<Input
						{...register(NAME, {
							required: {
								value: !name,
								message: formatMessage({
									id: "form.validation.empty.name"
								})
							}
						})}
						name={NAME}
						value={name}
						onChange={(e) => setName(e.target.value)}
						error={errors.name}
						dataTestId={DataTestKeys.userFormName}
					/>
				</div>
				<div className="mb-4">
					<label>
						{formatMessage({ id: 'user.create.update.lastname' })}
					</label>
					<Input
						{...register(LASTNAME, {
							required: {
								message: formatMessage({
									id: "form.validation.empty.lastname"
								}),
								value: !lastname
							}
						})}
						name={LASTNAME}
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						error={errors.lastname}
						dataTestId={DataTestKeys.userFormLastname}
					/>
				</div>
				<div className="mb-4">
					<label>
						{formatMessage({ id: 'user.create.update.username' })}
					</label>
					<Input
						{...register(USERNAME, {
							required: {
								message: formatMessage({
									id: "form.validation.empty.username"
								}),
								value: !username
							}
						})}
						name={USERNAME}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={errors.username}
						dataTestId={DataTestKeys.userFormUsername}
					/>
				</div>
				<div className="mb-4">
					<label>
						{formatMessage({ id: 'user.create.update.email' })}
					</label>
					<Input
						{...register(EMAIL, {
							required: {
								message: formatMessage({
									id: "form.validation.empty.email"
								}),
								value: !email,
							},
							pattern: {
								message: formatMessage({
									id: "form.validation.notvalid.email"
								}),
								value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
							}
						})}
						type="email"
						name={EMAIL}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={errors.email}
						dataTestId={DataTestKeys.userFormEmail}
					/>
				</div>
				<div className="mb-4">
					<label>
						<FormattedMessage id="user.create.update.roles" />
					</label>
					<Select
						name={ROLE}
						options={options}
						value={{
							value: roleSelected.value,
							label: roleSelected.label
						}}
						onChange={(e) => setRoleSelected({
							value: e?.value,
							label: e?.label
						})}
						data-testid={DataTestKeys.userFormRole}
					/>
				</div>
				{!user && (
					<div className="mb-4">
						<label>
							{formatMessage({
								id: 'user.create.update.password'
							})}
						</label>
						<Input
							{...register(PASSWORD, {
								required: {
									message: formatMessage({
										id: "form.validation.empty.password"
									}),
									value: !password
								}
							})}
							type="password"
							name={PASSWORD}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={errors.password}
							dataTestId={DataTestKeys.userFormPassword}
						/>
					</div>
				)}
				<div className="flex justify-end">
					{user && (
						loading ? <Loader /> : <Button
							onClick={onDeleteUser}
							style="danger_outline"
							dataTestId={DataTestKeys.userFormDelete}
						>
							<FormattedMessage
								id="user.create.update.delete"
							/>
						</Button>
					)}
					<Button
						style="primary"
						type="submit"
						loading={false}
						dataTestId={
							user ? DataTestKeys.userFormUpdate : DataTestKeys.userFormSave
						}
					>
						{user ? (
							<FormattedMessage id="user.create.update.update" />
						) : (
							<FormattedMessage id="user.create.update.save" />
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default UserForm
