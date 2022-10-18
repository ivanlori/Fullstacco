import { ReactElement, useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'

interface Props {
	totalPages: number
	getData: (currentPage: number) => void
}

const Pagination = ({
	getData,
	totalPages
}: Props): ReactElement => {
	const [pageCount, setPageCount] = useState(1)

	useEffect(() => {
		setPageCount(totalPages)
	}, [totalPages])

	return (
		<div className="flex justify-center">
			<ReactPaginate
				className="flex gap-5"
				pageLinkClassName="bg-gray_400 p-3"
				activeLinkClassName="bg-gray_100"
				breakLabel="..."
				onPageChange={({ selected }) => getData(selected + 1)}
				pageCount={pageCount}
				previousLabel={false}
				nextLabel={false}
			/>
		</div>
	)
}

export default Pagination
