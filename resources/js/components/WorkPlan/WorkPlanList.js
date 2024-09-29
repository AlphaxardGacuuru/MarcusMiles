import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"
import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"

import PaginationLinks from "@/components/Core/PaginationLinks"

import WorkPlanSVG from "@/svgs/WorkPlanSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"

const WorkPlanList = (props) => {
	const location = useLocation()

	/*
	 * Delete Work Plan
	 */
	const onDeleteWorkPlan = (workPlanId) => {
		Axios.delete(`/api/work-plans/${workPlanId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setWorkPlans({
					meta: props.workPlans.meta,
					links: props.workPlans.links,
					data: props.workPlans.data.filter((workPlan) => workPlan.id != workPlanId),
				})
				// Update Project
				props.get(`projects/${props.projectId}`, props.setProject)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<HeroHeading
							heading="Total Work Plan Items"
							data={props.totalWorkPlans}
						/>
						<HeroIcon>
							<WorkPlanSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="4"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/erp/work-plan/${props.projectId}/create`}
									icon={<PlusSVG />}
									text="add work plan item"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Starts At</th>
							<th>Ends At</th>
							<th className="text-center">Action</th>
						</tr>
						{props.workPlans.data?.map((workPlan, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.workPlans)}</td>
								<td>{workPlan.name}</td>
								<td className="text-capitalize">{workPlan.startsAt}</td>
								<td className="text-capitalize">{workPlan.endsAt}</td>
								<td>
									<div className="d-flex justify-content-end">
										<MyLink
											linkTo={`/erp/work-plan/${workPlan.id}/edit`}
											icon={<EditSVG />}
										/>

										<div className="mx-1">
											<DeleteModal
												index={`workPlan${key}`}
												model={workPlan}
												modelName="Work Plan"
												onDelete={onDeleteWorkPlan}
											/>
										</div>
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.workPlans}
					getPaginated={props.getPaginated}
					setState={props.setWorkPlans}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default WorkPlanList
