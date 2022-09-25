import { ChangeEvent, ReactElement } from 'react'

import { FormattedMessage, useIntl } from 'react-intl'

import { Button } from 'components'
import { Upload } from 'components/Icon/svg/icons'
import { DataTestKeys } from 'data-test-keys'

import { uploadPhoto, removePhoto } from '../../Profile.api'
import styles from './Photo.module.css'

interface Props {
	id: string
	photoUrl: string
}

const Photo = ({
	id,
	photoUrl
}: Props): ReactElement => {
	const { formatMessage } = useIntl()

	const removePhotoProfile = async () => {
		const {
			status
		} = await removePhoto(String(id))

		if (status === 201) {
			window.location.reload()
		}
	}

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData()

		if (e.target.files) {
			formData.append("photo", e.target.files[0])

			const payload = {
				photo: formData.get('photo')
			}

			await uploadPhoto(String(id), payload)
		}
	}

	return (
		<label htmlFor="photo">
			{photoUrl ? (
				<div className={styles.PhotoWrapper}>
					<img src={photoUrl} alt={formatMessage({
						id: 'photo.profile.alt'
					})} />
					<Button
						type="button"
						style="danger_outline"
						onClick={removePhotoProfile}
						dataTestId={DataTestKeys.removePhotoBtn}
					>
						<FormattedMessage id="remove.photo.profile" />
					</Button>
				</div>
			) : (
				<div
					className={styles.Placeholder}
					data-testid={DataTestKeys.uploadPhoto}
				>
					<Upload />
					<span>
						<FormattedMessage id="upload.photo" />
					</span>
				</div>
			)}
			<input
				className={styles.Upload}
				type="file"
				name="photo"
				onChange={handleUpload}
				id="photo"
			/>
		</label>
	)
}

export default Photo
