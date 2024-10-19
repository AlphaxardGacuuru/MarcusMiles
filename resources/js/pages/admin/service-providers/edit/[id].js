import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [serviceProvider, setServiceProvider] = useState({})

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [idNumber, setIdNumber] = useState([])

	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Service Provider", path: ["service-providers", "edit"] })
		// Fetch ServiceProvider
		props.get(`service-providers/${id}`, setServiceProvider)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/service-providers/${id}`, {
			name: name,
			email: email,
			phone: phone,
			idNumber: idNumber,
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
				{/* Name Start */}
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						placeholder="John Doe"
						defaultValue={serviceProvider.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
{/* Name End */}

{/* Email Start */}
					<label htmlFor="">Email</label>
					<input
						type="text"
						placeholder="johndoe@gmail.com"
						defaultValue={serviceProvider.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
						/>
						{/* Email End */}

{/* Phone Start */}
					<label htmlFor="">Phone</label>
					<input
						type="tel"
						placeholder="0722123456"
						defaultValue={serviceProvider.phone}
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
						/>
						{/* Phone End */}

					{/* ID Number Start */}
					<label htmlFor="">ID Number</label>
					<input
						type="number"
						placeholder="31531513"
						defaultValue={serviceProvider.idNumber}
						className="form-control mb-2 me-2"
						onChange={(e) => setIdNumber(e.target.value)}
					/>
					{/* ID Number End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update service provider"
							loading={loading}
						/>
					</div>

					<center className="mb-5">
						<MyLink
							linkTo={`/erp/service-providers`}
							icon={<BackSVG />}
							text="back to service providers"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
