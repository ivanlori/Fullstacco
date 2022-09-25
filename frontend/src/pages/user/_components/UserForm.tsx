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
import { isEmail } from 'utils/utils'

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
							},
							onChange: (e) => setName(e.target.value),
						})}
						name={NAME}
						value={name}
						error={errors.name?.message}
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
							},
							onChange: (e) => setLastname(e.target.value),
						})}
						name={LASTNAME}
						value={lastname}
						error={errors.lastname?.message}
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
							},
							onChange: (e) => setUsername(e.target.value),
						})}
						name={USERNAME}
						value={username}
						error={errors.username?.message}
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
							onChange: (e) => setEmail(e.target.value),
							validate: value => isEmail(value),
						})}
						type="text"
						name={EMAIL}
						value={email}
						error={
							errors.email?.type === 'validate' ? formatMessage({
								id: "form.validation.notvalid.email"
							}) : errors.email?.message}
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
								},
								onChange: (e) => setPassword(e.target.value),
							})}
							type="password"
							name={PASSWORD}
							value={password}
							error={errors.password?.message}
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
						<FormattedMessage
							id={`user.create.update.${user ? 'update' : 'save'}`}
						/>
					</Button>
				</div>
			</form>
		</div>
	)
}

export default UserForm
