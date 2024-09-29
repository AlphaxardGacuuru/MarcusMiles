import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()
	var { id } = useParams()

	const [name, setName] = useState()
	const [quantity, setQuantity] = useState()
	const [supplierId, setSupplierId] = useState()
	const [loading, setLoading] = useState()

	const [suppliers, setSuppliers] = useState([])

	// Get Inventories
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Inventory",
			path: [`properties`, `properties/${id}/view`, "create"],
		})
		// Fetch Suppliers
		props.get("suppliers?idAndName=true", setSuppliers)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/inventories", {
			projectId: id,
			name: name,
			quantity: quantity,
			supplierId: supplierId,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Redirect to Inventories
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
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<form onSubmit={onSubmit}>
					{/* Name */}
					<label htmlFor="name">Name</label>
					<input
						name="name"
						placeholder="Name"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>
					{/* Name End */}

					{/* Quantity */}
					<label htmlFor="name">Quantity</label>
					<input
						type="number"
						name="description"
						placeholder="Quantity"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setQuantity(e.target.value)}
						required={true}
					/>
					{/* Quantity End */}

					{/* Supplier */}
					<label htmlFor="name">Supplier</label>
					<select
						name="type"
						placeholder="Supplier"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setSupplierId(e.target.value)}>
						{[
							{
								id: "",
								name: "Select Supplier",
							},
						]
							.concat(suppliers)
							.map((supplier, key) => (
								<option
									key={key}
									value={supplier.id}>
									{supplier.name}
								</option>
							))}
					</select>
					{/* Supplier End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add inventory"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/erp/projects/${id}/view`}
							icon={<BackSVG />}
							text="back to projects"
						/>
					</div>
					<div className="col-sm-2"></div>
				</form>
			</div>
		</div>
	)
}

export default create
