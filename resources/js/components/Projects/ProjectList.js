import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import ProjectSVG from "@/svgs/ProjectSVG"

const ProjectList = (props) => {
	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (projectId) => {
		var exists = deleteIds.includes(projectId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != projectId)
			: [...deleteIds, projectId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete Project
	 */
	const onDeleteProject = (projectId) => {
		setLoading(true)
		var projectIds = Array.isArray(projectId) ? projectId.join(",") : projectId

		Axios.delete(`/api/projects/${projectIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				props.setProjects({
					meta: props.projects.meta,
					links: props.projects.links,
					data: props.projects.data.filter((project) => {
						if (Array.isArray(projectId)) {
							return !projectIds.includes(project.id)
						} else {
							return project.id != projectId
						}
					}),
				})
				// Clear DeleteIds
				setDeleteIds([])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
				// Clear DeleteIds
				setDeleteIds([])
			})
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-4">
						{/* Total */}
						<HeroHeading
							heading="Total"
							data={props.projects.meta?.total}
						/>
						<HeroIcon>
							<ProjectSVG />
						</HeroIcon>
						{/* Total End */}
					</div>
				</div>
				{/* Total End */}
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm py-2 px-4">
				<div className="d-flex justify-content-end flex-wrap">
					{/* Name */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="">Name</label>
						<input
							type="text"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => props.setName(e.target.value)}
						/>
					</div>
					{/* Name End */}
					<div className="d-flex flex-grow-1">
						{/* Start Date */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Start At</label>
							{/* Start Month */}
							<select
								className="form-control"
								onChange={(e) => props.setStartMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}
										selected={key == props.previousMonth}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* Start Month End */}
						{/* Start Year */}
						<div className="me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								Start At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setStartYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}
										selected={key == props.currentYear}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* Start Year End */}
					</div>
					{/* Start Date End */}
					{/* End Date */}
					<div className="d-flex flex-grow-1">
						{/* End Month */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">End At</label>
							<select
								className="form-control"
								onChange={(e) => props.setEndMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}
										selected={key == props.previousMonth}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* End Month End */}
						{/* End Year */}
						<div className="me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								End At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setEndYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}
										selected={key == props.currentYear}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* End Year End */}
					</div>
					{/* End Date End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="6"></th>
							<th className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeleteProject(deleteIds)}
											loading={loading}
										/>
									)}

									<MyLink
										linkTo={`/erp/projects/create`}
										icon={<PlusSVG />}
										text="add project"
									/>
								</div>
							</th>
						</tr>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={
										deleteIds.length == props.projects.data?.length &&
										deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == props.projects.data.length
												? []
												: props.projects.data.map((project) => project.id)
										)
									}
								/>
							</th>
							<th>Name</th>
							<th>Type</th>
							<th>Description</th>
							<th>Created By</th>
							<th>Created At</th>
							<th className="text-center">Action</th>
						</tr>
						{props.projects.data?.map((project, key) => (
							<tr key={key}>
								<td>
									<input
										type="checkbox"
										checked={deleteIds.includes(project.id)}
										onClick={() => handleSetDeleteIds(project.id)}
									/>
								</td>
								<td>{project.name}</td>
								<td>{project.type}</td>
								<td>{project.description}</td>
								<td>{project.createdBy}</td>
								<td>{project.createdAt}</td>
								<td>
									<div className="d-flex justify-content-end">
										<MyLink
											linkTo={`/erp/projects/${project.id}/view`}
											className="me-1"
											icon={<ViewSVG />}
										/>

										<MyLink
											linkTo={`/erp/projects/${project.id}/edit`}
											icon={<EditSVG />}
										/>

										<div className="mx-1">
											<DeleteModal
												index={`project${key}`}
												model={project}
												modelName="Project"
												onDelete={onDeleteProject}
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
					list={props.projects}
					getPaginated={props.getPaginated}
					setState={props.setProjects}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default ProjectList
