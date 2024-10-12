import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [inventory, setInventory] = useState({})
	const [goodId, setGoodId] = useState()
	const [quantity, setQuantity] = useState()
	const [supplierId, setSupplierId] = useState()
	const [loading, setLoading] = useState()

	const [suppliers, setSuppliers] = useState([])
	const [goods, setGoods] = useState([])

	// Get Inventories
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Inventory",
			path: ["projects", "edit"],
		})

		// Fetch Inventory
		Axios.get(`api/inventories/${id}`).then((res) => {
			// Set page
			props.setPage({
				name: "Edit Inventory",
				path: ["projects", `projects/${res.data.data.projectId}/show`, "edit"],
			})

			setInventory(res.data.data)
			setSupplierId(res.data.data.supplierId.toString())
		})

		// Fetch Suppliers
		props.get("suppliers?idAndName=true", setSuppliers)
		// Fetch Goods
		props.get("goods?idAndName=true", setGoods)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/inventories/${id}`, {
			goodId: goodId,
			quantity: quantity,
			supplierId: supplierId,
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
					<h5 className="ms-1 mb-2">{inventory.name}</h5>
					{/* Good */}
					<label htmlFor="name">Good</label>
					<select
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setGoodId(e.target.value)}
						required={true}>
						{[{ id: "", name: "Select Good" }]
							.concat(goods)
							.map((good, key) => (
								<option
									key={key}
									value={good.id}
									selected={good.id == inventory.goodId}>
									{good.name}
								</option>
							))}
					</select>
					{/* Good End */}

					{/* Quantity */}
					<label htmlFor="name">Quantity</label>
					<input
						type="number"
						name="quantity"
						defaultValue={inventory.quantity}
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
									value={supplier.id}
									selected={supplier.id == inventory.supplierId}>
									{supplier.name}
								</option>
							))}
					</select>
					{/* Supplier End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update inventory"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/erp/projects/${id}/view`}
							icon={<BackSVG />}
							text="back to projects"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
