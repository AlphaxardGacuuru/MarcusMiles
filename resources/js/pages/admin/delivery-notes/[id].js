import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

import PlusSVG from "@/svgs/PlusSVG"
import PrintSVG from "@/svgs/PrintSVG"

const form = (props) => {
	var { id } = useParams()

	const [deliveryNote, setDeliveryNote] = useState({})

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Invoice", path: ["projects", "delivery note"] })
		props.get(`delivery-notes/${id}`, setDeliveryNote)
	}, [])

	/*
	 * Print Invoice
	 */
	const printInvoice = () => {
		var contentToPrint = document.getElementById("contentToPrint").innerHTML
		var originalBody = document.body.innerHTML

		document.body.innerHTML = contentToPrint

		window.print()

		document.body.innerHTML = originalBody
	}

	return (
		<React.Fragment>
			{/*Create Link*/}
			<div className="d-flex justify-content-end mb-4">
				<Btn
					className="me-5"
					icon={<PrintSVG />}
					text="print"
					onClick={printInvoice}
				/>
			</div>
			{/*Create Link End*/}

			<div
				id="contentToPrint"
				className="row mb-5">
				<div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card bg-white p-5">
						<div className="border-0 d-flex justify-content-between">
							<h2 className="text-dark mb-1">Marcus Miles</h2>

							<div>
								<h2 className="mb-0">DELIVERY NOTE</h2>
								<div className="p-2 text-center text-capitalize"></div>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1"></h5>
								</div>
								<div className="text-end">
									<h5 className="text-muted">Form No: {deliveryNote.code}</h5>
									<h5 className="text-muted">
										Project No: {deliveryNote.projectCode}
									</h5>
									<h5 className="text-muted">
										Issue Date: {deliveryNote.createdAt}
									</h5>
								</div>
							</div>

							<hr />
							<h5>Project: {deliveryNote.projectName}</h5>
							<hr />

							<div className="table-responsive-sm">
								<table className="table table-borderless bg-white">
									<thead className="border-bottom">
										<tr>
											<th>No</th>
											<th>BOQ REF</th>
											<th>Item Description</th>
											<th>Unit</th>
											<th>Quantity</th>
											<th>Approval</th>
										</tr>
									</thead>
									<tbody>
										{deliveryNote.inventories?.map((inventory, key) => (
											<tr key={key}>
												<td>{inventory.goodCode}</td>
												<td></td>
												<td>{inventory.description}</td>
												<td></td>
												<td>{inventory.quantity}</td>
												<td></td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="card-footer d-flex justify-content-start bg-white border-0">
							<div className="text-start">
								<h6 className="text-dark mb-1">Delivered By</h6>
								<h6 className="text-dark mb-1">Received By (Clerk of Works)</h6>
								<h6 className="text-dark mb-1">
									Approved By (Construction Manager)
								</h6>
							</div>
						</div>
						<hr />
						<center>
							<small className="text-muted">
								Delivery notes accompany documents being delivered to or
								collected by a client. A copy of this goes with the supplier,
								another copy is retained by the clerk of works and the last copy
								is retained in the booklet.
							</small>
						</center>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default form
