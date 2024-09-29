import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [supplier, setSupplier] = useState({})

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [location, setLocation] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Supplier", path: ["suppliers", "edit"] })
		// Fetch Supplier
		props.get(`suppliers/${id}`, setSupplier)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/suppliers/${id}`, {
			name: name,
			email: email,
			phone: phone,
			location: location,
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
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						placeholder="John Doe"
						defaultValue={supplier.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<label htmlFor="">Email</label>
					<input
						type="text"
						placeholder="johndoe@gmail.com"
						defaultValue={supplier.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="">Phone</label>
					<input
						type="tel"
						placeholder="0722123456"
						defaultValue={supplier.phone}
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
					/>

					{/* Location Start */}
					<label htmlFor="">Location</label>
					<input
						type="text"
						defaultValue={supplier.location}
						placeholder="Nairobi"
						className="form-control mb-2 me-2"
						onChange={(e) => setLocation(e.target.value)}
					/>
					{/* Location End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update supplier"
							loading={loading}
						/>
					</div>

					<center className="mb-5">
						<MyLink
							linkTo={`/erp/suppliers`}
							text="back to suppliers"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
