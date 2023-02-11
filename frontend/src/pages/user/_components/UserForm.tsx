import { ReactElement, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Button, Input, Select } from 'components'
import { DataTestKeys } from 'data-test-keys'
import { IProfilePayload, IProfileState, IRoleSelection } from 'types/profile'
import { isEmail } from 'utils/utils'

import { createUser, updateUser } from '../User.api'

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
	onDelete: (user: IProfileState) => void | null
	onResult: (status: string, message: string) => void
}

const options = [
	{ id: 1, value: 'Admin' },
	{ id: 2, value: 'Account' },
]

const NAME = 'name'
const LASTNAME = 'lastname'
const PASSWORD = 'password'
const EMAIL = 'email'
const USERNAME = 'username'
const ROLE = 'role'

export const UserForm = ({
	user,
	title,
	onResult,
	onDelete,
}: Props): ReactElement => {
	const {
		formatMessage
	} = useIntl()
	const [roleSelected, setRoleSelected] = useState<IRoleSelection>(
		user ? options[user.role as number] : options[0]
	)
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

	const onSubmit: SubmitHandler<IFormInput> = async () => {

		const data: IProfilePayload = {
			email: email as string,
			lastname: lastname as string,
			name: name as string,
			username: username as string,
			role: roleSelected.id,
			photoUrl: '',
		}

		if (user) {
			const payload: IProfilePayload = {
				...data,
				_id: user._id,
				updatedAt: new Date().toISOString(),
			}

			const { status } = await updateUser(payload)
			onResult(status as string, "feedback.user.updated")
		} else {
			const payload: IProfilePayload = {
				...data,
				password: password
			}
			const {
				status
			} = await createUser(payload)
			onResult(status as string, "feedback.user.created")
		}
	}

	return (
		<div>
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
					<label htmlFor={NAME}>
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
							value: name
						})}
						id={NAME}
						name={NAME}
						error={errors.name?.message}
						dataTestId={DataTestKeys.userFormName}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor={LASTNAME}>
						{formatMessage({ id: 'user.create.update.lastname' })}
					</label>
					<Input
						{...register(LASTNAME, {
							required: {
								value: !lastname,
								message: formatMessage({
									id: "form.validation.empty.lastname"
								}),
							},
							onChange: (e) => setLastname(e.target.value),
							value: lastname
						})}
						id={LASTNAME}
						name={LASTNAME}
						error={errors.lastname?.message}
						dataTestId={DataTestKeys.userFormLastname}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor={USERNAME}>
						{formatMessage({ id: 'user.create.update.username' })}
					</label>
					<Input
						{...register(USERNAME, {
							required: {
								value: !username,
								message: formatMessage({
									id: "form.validation.empty.username"
								}),
							},
							onChange: (e) => setUsername(e.target.value),
							value: username
						})}
						id={USERNAME}
						name={USERNAME}
						error={errors.username?.message}
						dataTestId={DataTestKeys.userFormUsername}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor={EMAIL}>
						{formatMessage({ id: 'user.create.update.email' })}
					</label>
					<Input
						{...register(EMAIL, {
							required: {
								value: !email,
								message: formatMessage({
									id: "form.validation.empty.email"
								}),
							},
							onChange: (e) => setEmail(e.target.value),
							value: email,
							validate: value => isEmail(value),
						})}
						id={EMAIL}
						type="text"
						name={EMAIL}
						error={
							errors.email?.type === 'validate' ? formatMessage({
								id: "form.validation.notvalid.email"
							}) : errors.email?.message}
						dataTestId={DataTestKeys.userFormEmail}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor={ROLE}>
						<FormattedMessage id="user.create.update.roles" />
					</label>
					<Select
						id={ROLE}
						name={ROLE}
						items={options}
						value={{
							id: roleSelected.id,
							value: roleSelected.value
						}}
						onChange={(e) => setRoleSelected({
							id: e.id,
							value: e.value
						})}
						dataTestId={DataTestKeys.userFormRole}
					/>
				</div>
				{!user && (
					<div className="mb-4">
						<label htmlFor={PASSWORD}>
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
								value: password
							})}
							id={PASSWORD}
							type="password"
							name={PASSWORD}
							error={errors.password?.message}
							dataTestId={DataTestKeys.userFormPassword}
						/>
					</div>
				)}
				<div className="flex justify-end">
					{user && (
						<div className="w-40">
							<Button
								onClick={() => onDelete(user)}
								style="danger_outline"
								dataTestId={DataTestKeys.userFormDelete}
							>
								<FormattedMessage
									id="user.create.update.delete"
								/>
							</Button>
						</div>
					)}
					<div className="w-40 ml-3">
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
				</div>
			</form>
		</div>
	)
}
