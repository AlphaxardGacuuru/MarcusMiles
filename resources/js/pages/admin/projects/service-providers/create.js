import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [serviceProviders, setServiceProviders] = useState([])

	const [serviceProviderId, setServiceProviderId] = useState()

	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Service Provider",
			path: ["service-providers", "create"],
		})
		props.get("service-providers", setServiceProviders)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/project-service-providers", {
			projectId: id,
			serviceProviderId: serviceProviderId,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to ServiceProvider
				setTimeout(() => history.push(`/admin/erp/projects/${id}/view`), 500)
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
					{/* Service Provider Start */}
					<label htmlFor="">Service Provider</label>
					<select
						className="form-control mb-2 me-2"
						onChange={(e) => setServiceProviderId(e.target.value)}
						required={true}>
						{[{ id: "", name: "Select Service Provider" }]
							.concat(serviceProviders)
							.map((serviceProvider, key) => (
								<option
									key={key}
									value={serviceProvider.id}>
									{serviceProvider.name}
								</option>
							))}
					</select>
					{/* Service Provider End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add service provider"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/erp/projects/${id}/view`}
							icon={<BackSVG />}
							text="back to service provider"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
