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
					data: props.workPlans.data.filter(
						(workPlan) => workPlan.id != workPlanId
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
							<th colSpan="5"></th>
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
							<th>Project Code</th>
							<th>Name</th>
							<th>Starts At</th>
							<th>Ends At</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{props.workPlans.data?.map((workPlan, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.workPlans)}</td>
								<td>{workPlan.projectCode}</td>
								<td>{workPlan.name}</td>
								<td className="text-capitalize">{workPlan.startsAt}</td>
								<td className="text-capitalize">{workPlan.endsAt}</td>
								<td>
									<div className="d-flex justify-content-end">
										<MyLink
											linkTo={`/erp/work-plan/${props.projectId}/create`}
											icon={<PlusSVG />}
											text="add substep"
										/>

										<MyLink
											linkTo={`/erp/work-plan/${workPlan.id}/edit`}
											icon={<EditSVG />}
											className="ms-1"
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
						<div
							class="accordion"
							id="accordionExample">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button
										class="accordion-button"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseOne"
										aria-expanded="true"
										aria-controls="collapseOne">
										Accordion Item #1
									</button>
								</h2>
								<div
									id="collapseOne"
									class="accordion-collapse collapse show"
									data-bs-parent="#accordionExample">
									<div class="accordion-body">
										<strong>This is the first item's accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It's also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button
										class="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseTwo"
										aria-expanded="false"
										aria-controls="collapseTwo">
										Accordion Item #2
									</button>
								</h2>
								<div
									id="collapseTwo"
									class="accordion-collapse collapse"
									data-bs-parent="#accordionExample">
									<div class="accordion-body">
										<strong>This is the second item's accordion body.</strong>{" "}
										It is hidden by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It's also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button
										class="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseThree"
										aria-expanded="false"
										aria-controls="collapseThree">
										Accordion Item #3
									</button>
								</h2>
								<div
									id="collapseThree"
									class="accordion-collapse collapse"
									data-bs-parent="#accordionExample">
									<div class="accordion-body">
										<strong>This is the third item's accordion body.</strong> It
										is hidden by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It's also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</div>
								</div>
							</div>
						</div>
					</tbody>
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
