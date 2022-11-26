import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import { renderWithProviders } from 'utils/testing-library-utils'

import { Photo } from '../Photo'

describe('<Photo />', () => {

	test('should check elements if photo is set', () => {
		renderWithProviders(
			<MemoryRouter>
				<Photo id='123' photoUrl='some url' />
			</MemoryRouter>,
			{
				withIntl: true,
			}
		)

		const removePhotoBtn = screen.getByTestId(DataTestKeys.removePhotoBtn)
		const photoUploadWrapper = screen.queryByTestId(DataTestKeys.uploadPhoto)

		expect(removePhotoBtn).toBeInTheDocument()
		expect(photoUploadWrapper).not.toBeInTheDocument()
	})

	test('should check elements if photo is not set', () => {
		renderWithProviders(
			<MemoryRouter>
				<Photo id='123' photoUrl='' />
			</MemoryRouter>,
			{
				withIntl: true,
			}
		)

		const removePhotoBtn = screen.queryByTestId(DataTestKeys.removePhotoBtn)
		const photoUploadWrapper = screen.getByTestId(DataTestKeys.uploadPhoto)

		expect(removePhotoBtn).not.toBeInTheDocument()
		expect(photoUploadWrapper).toBeInTheDocument()
	})
})
