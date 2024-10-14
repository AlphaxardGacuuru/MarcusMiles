import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import InventorySVG from "@/svgs/InventorySVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"

const InventoryList = (props) => {
	const location = useLocation()

	/*
	 * Delete Inventory
	 */
	const onDeleteInventory = (inventoryId) => {
		Axios.delete(`/api/inventories/${inventoryId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setInventories({
					meta: props.inventories.meta,
					links: props.inventories.links,
					data: props.inventories.data.filter(
						(inventory) => inventory.id != inventoryId
					),
				})
				// Update Project
				props.get(`projects/${props.projectId}`, props.setProject)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<HeroHeading
							heading="Total Inventory"
							data={props.inventories.data?.length}
						/>
						<HeroIcon>
							<InventorySVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm p-4">
				<div className="d-flex flex-wrap">
					{/* Name */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							id=""
							type="text"
							name="name"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/view") && (
							<tr>
								<th colSpan="5"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/erp/inventory/${props.projectId}/create`}
										icon={<PlusSVG />}
										text="add inventory"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Project</th>
							<th>Supplier</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.inventories.data?.map((inventory, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.inventories)}</td>
								<td>{inventory.goodName}</td>
								<td>{inventory.quantity}</td>
								<td>{inventory.projectName}</td>
								<td>{inventory.supplierName}</td>
								<td>
									{location.pathname.match("/view") && (
										<div className="d-flex justify-content-end">
											<React.Fragment>
												<MyLink
													linkTo={`/erp/inventory/${inventory.id}/edit`}
													icon={<EditSVG />}
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`inventory${key}`}
														model={inventory}
														modelName="Inventory"
														onDelete={onDeleteInventory}
													/>
												</div>
											</React.Fragment>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.inventories}
					getPaginated={props.getPaginated}
					setState={props.setInventories}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default InventoryList
