import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import InventoryList from "@/components/Inventories/InventoryList"

const show = (props) => {
	var { id } = useParams()

	const [supplier, setSupplier] = useState({})
	const [inventories, setInventories] = useState([])

	const [nameQuery, setNameQuery] = useState("")

	const [tab, setTab] = useState("work-plan")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Supplier", path: ["suppliers", "view"] })
		props.get(`suppliers/${id}`, setSupplier)
		props.getPaginated(`inventories?supplierId=${id}`, setInventories)
	}, [id])

	useEffect(() => {
		props.getPaginated(
			`inventories?supplierId=${id}&
				name=${nameQuery}`,
			setInventories
		)
	}, [nameQuery])

	const active = (activeTab) => {
		return activeTab == tab
			? "bg-secondary text-white shadow-sm"
			: "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<h4>{supplier.name}</h4>
					<h6>{supplier.email}</h6>
					<h6>{supplier.phone}</h6>
					<h6>{supplier.location}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"goods"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("goods")}>
						Goods
					</div>
				</div>
				{/* Tabs End */}
				
				{/* Inventories Tab */}
				<InventoryList
					{...props}
					activeTab={activeTab("inventories")}
					inventories={inventories}
					setInventories={setInventories}
					totalInventory={supplier.inventoryCount}
					supplierId={id}
					setSupplier={setSupplier}
					setNameQuery={setNameQuery}
				/>
				{/* Inventories Tab End */}
			</div>
		</div>
	)
}

export default show
