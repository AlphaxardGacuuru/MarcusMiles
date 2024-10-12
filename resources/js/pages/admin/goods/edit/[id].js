import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [good, setGood] = useState({})

	const [itemNo, setItemNo] = useState()
	const [name, setName] = useState()
	const [loading, setLoading] = useState()

	// Get Goods
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Good",
			path: ["goods", "edit"],
		})

		// Fetch Good
		props.get(`goods/${id}`, setGood)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/goods/${id}`, {
			itemNo: itemNo,
			name: name,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					{/* Name */}
					<input
						type="text"
						defaultValue={good.name}
						placeholder="Name"
						className="form-control mb-2"
						onChange={(e) => setName(e.target.value)}
					/>
					{/* Name End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update good"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/erp/goods`}
							icon={<BackSVG />}
							text="back to goods"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
