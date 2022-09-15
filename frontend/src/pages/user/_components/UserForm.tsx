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
import { IRoleSelection, IUserState } from 'types/user'
import { getUserId, isAdmin } from 'utils/utils'

import { createUser, deleteUser, updateUser } from '../User.api'
import styles from './UserForm.module.css'

interface IFormInput {
	name: string
	lastname: string
	username: string
	email: string
	password: string
	role: number
}

interface Props {
	user?: IUserState | null
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

const UserForm = ({ user }: Props): ReactElement => {
	const {
		formatMessage
	} = useIntl()
	const [roleSelected, setRoleSelected] = useState<IRoleSelection>(options[0])
	const navigate = useNavigate()
	const dispatch = useDispatch<Dispatch>()
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			email: user?.email || '',
			lastname: user?.lastname || '',
			name: user?.name || '',
			username: user?.username || '',
		}
	})

	const isOwner = user?.id === getUserId()

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

		const data: IUserState = {
			email,
			lastname,
			name,
			username,
			role: roleSelected.value,
			isActive: true,
			emailConfirmed: user ? user.emailConfirmed : false,
		}

		if (user) {
			const payload = {
				...data,
				id: user.id,
				updatedAt: new Date().toISOString(),
			}
			const { status } = await updateUser(payload)

			handleResult(status, "feedback.user.updated")
		} else {
			const {
				status
			} = await createUser({
				...data,
				password
			})

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
		if (user?.name) {
			setName(user.name)
		}
	}, [user?.name])

	useEffect(() => {
		if (user?.username) {
			setUsername(user.username)
		}
	}, [user?.username])

	useEffect(() => {
		if (user?.email) {
			setEmail(user.email)
		}
	}, [user?.email])

	useEffect(() => {
		if (user?.lastname) {
			setLastname(user.lastname)
		}
	}, [user?.lastname])

	useEffect(() => {
		if (user?.role) {
			setRoleSelected({
				value: user.role,
				label: options[user.role].label
			})
		}
	}, [user?.role])

	return (
		<div className="p-10">
			<div className="flex justify-between mb-5">
				<h1 className="text-2xl font-medium">
					{user ? (
						<FormattedMessage id="user.create.update.title.update" />
					) : (
						<FormattedMessage id="user.create.update.title.create" />
					)}
				</h1>
				{
					isOwner && (
						<div className={styles.CurrentUser}>
							<span>
								{formatMessage({ id: 'user.create.update.current.user' })}
							</span>
						</div>
					)
				}
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
					{user &&
						isAdmin(user) &&
						!isOwner && (
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
