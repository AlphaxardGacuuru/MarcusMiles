import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

import PlusSVG from "@/svgs/PlusSVG"
import PrintSVG from "@/svgs/PrintSVG"
import CheckSVG from "@/svgs/CheckSVG"

const form = (props) => {
	var { id } = useParams()

	const [requisition, setRequisition] = useState({})

	useEffect(() => {
		// Set page
		props.setPage({
			name: "View Requisition",
			path: ["requisitions", "view"],
		})
		props.get(`requisitions/${id}`, setRequisition)
	}, [])

	/*
	 * Print Requisition
	 */
	const printRequisition = () => {
		var contentToPrint = document.getElementById("contentToPrint").innerHTML

		document.body.innerHTML = contentToPrint
		// Print
		window.print()
		// Reload
		window.location.reload()
	}

	return (
		<React.Fragment>
			{/*Create Link*/}
			<div className="d-flex justify-content-end mb-4">
				<Btn
					className="me-5"
					icon={<PrintSVG />}
					text="print"
					onClick={printRequisition}
				/>
			</div>
			{/*Create Link End*/}

			<div
				id="contentToPrint"
				className="row mb-5">
				<div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card bg-white p-5">
						<div className="border-0 d-flex justify-content-between">
							<div
								className=""
								style={{ width: "5em" }}>
								<Img
									src="/storage/img/favicon.png"
									style={{ width: "100%", height: "auto" }}
								/>
							</div>

							<div>
								<h2 className="text-end mb-0">PROJECT REQUISITION FORM</h2>
								<div className="p-2 text-center text-capitalize"></div>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1"></h5>
								</div>
								<div className="text-end">
									<h5>
										Form No:{" "}
										<span className="text-dark fw-normal">
											{requisition.code}
										</span>
									</h5>
									<h5>
										Project No:{" "}
										<span className="text-dark fw-normal">
											{requisition.projectCode}
										</span>
									</h5>
									<h5>
										Issue Date:{" "}
										<span className="text-dark fw-normal">
											{requisition.createdAt}
										</span>
									</h5>
								</div>
							</div>

							<hr />
							<h5 className="mb-1">
								Project:{" "}
								<span className="text-dark fw-normal">
									{requisition.projectName}
								</span>
							</h5>
							<h5>
								Client:{" "}
								<span className="text-dark fw-normal">
									{requisition.clientName}
								</span>
							</h5>
						</div>

						<div className="table-responsive-sm">
							<table className="table bg-white">
								<thead className="border-bottom">
									<tr>
										<th>No</th>
										<th>BOQ Ref</th>
										<th>Description</th>
										<th>Unit</th>
										<th>BOQ Price / PC</th>
										<th>Purchase Price / PC</th>
										<th>Total</th>
										<th>Transport</th>
										<th>Approval</th>
									</tr>
								</thead>
								<tbody>
									{requisition.boqGoods?.map((boqGood, key) => (
										<tr key={key}>
											<td>{key + 1}</td>
											<td>{boqGood.boqCode}</td>
											<td>{boqGood.description}</td>
											<td>{boqGood.unit}</td>
											<td>{boqGood.price}</td>
											<td>{boqGood.price}</td>
											<td>{boqGood.total}</td>
											<td>{boqGood.transport}</td>
											<td>{boqGood.approval}</td>
											<td></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* First Footer Start */}
						<div className="card-footer d-flex justify-content-between bg-white border-0">
							<div className="text-start">
								<h6>Ordered By (Tradesman): {requisition.createdByName}</h6>
								<h6>Checked By (Foreman): {requisition.checkedByName}</h6>
								<h6>
									Approved By (Project Manager): {requisition.approvedByName}
								</h6>
							</div>
						</div>
						{/* First Footer End */}

						{/* Footer Start */}
						<div className="card-footer d-flex justify-content-between border-0">
							<div className="text-start">
								<h6 className="mb-1">
									Total Amount
									<span className="fw-normal">{requisition.totalAmount}</span>
								</h6>
								<h6 className="mb-1">
									Paid By
									<span className="fw-normal">{requisition.paidBy}</span>
								</h6>
							</div>
							<div className="text-start">
								<h6 className="mb-1">
									VAT
									<span className="fw-normal">{requisition.vat}</span>
								</h6>
								<h6 className="mb-1">
									Date
									<span className="fw-normal">{requisition.createdAt}</span>
								</h6>
							</div>
						</div>
						{/* Footer End */}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default form
