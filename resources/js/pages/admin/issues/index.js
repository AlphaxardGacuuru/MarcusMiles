import React, { useEffect, useRef, useState } from "react"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Btn from "@/components/Core/Btn"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import DeleteSVG from "@/svgs/DeleteSVG"
import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import HighPrioritySVG from "@/svgs/HighPrioritySVG"
import MediumPrioritySVG from "@/svgs/MediumPrioritySVG"
import LowPrioritySVG from "@/svgs/LowPrioritySVG"
import IssueSVG from "@/svgs/IssueSVG"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const index = (props) => {
	const location = useLocation()

	const [stages, setStages] = useState([])
	const [issues, setIssues] = useState([])
	const [staff, setStaff] = useState([])
	const [projects, setProjects] = useState([])

	const [creatingStage, setCreatingStage] = useState(true)
	const [stageId, setStageId] = useState("")
	const [stageName, setStageName] = useState("")
	const [stagePosition, setStagePosition] = useState("")

	const [creatingIssue, setCreatingIssue] = useState(true)
	const [issueId, setIssueId] = useState("")
	const [issueTitle, setIssueTitle] = useState()
	const [issueDescription, setIssueDescription] = useState()
	const [issueAssignedTo, setIssueAssignedTo] = useState()
	const [issuePlannedStartDate, setIssuePlannedStartDate] = useState()
	const [issuePlannedEndDate, setIssuePlannedEndDate] = useState()
	const [issuePriority, setIssuePriority] = useState()
	const [issueProjectId, setIssueProjectId] = useState()
	const [issueStageId, setIssueStageId] = useState()
	const [loading, setLoading] = useState()

	const [titleQuery, setTitleQuery] = useState("")
	const [priorityQuery, setPriorityQuery] = useState("")
	const [projectIdQuery, setProjectIdQuery] = useState("")
	const [staffIdQuery, setStaffIdQuery] = useState("")
	const [startMonthQuery, setStartMonthQuery] = useState("")
	const [endMonthQuery, setEndMonthQuery] = useState("")
	const [startYearQuery, setStartYearQuery] = useState("")
	const [endYearQuery, setEndYearQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Issues", path: ["issues"] })
		// Fetch Issues
		props.get("issues", setIssues)
		// Fetch Staff
		props.get("staff?idAndName=true", setStaff)
		// Fetch Projects
		props.get("projects", setProjects)
	}, [])

	useEffect(() => {
		// Fetch Stages
		props.get(
			`stages?
			type=issue&
			title=${titleQuery}&
			priority=${priorityQuery}&
			projectId=${projectIdQuery}&
			staffId=${staffIdQuery}&
			startMonth=${startMonthQuery}&
			endMonth=${endMonthQuery}&
			startYear=${startYearQuery}&
			endYear=${endYearQuery}`,
			setStages
		)
	}, [
		titleQuery,
		priorityQuery,
		projectIdQuery,
		staffIdQuery,
		startMonthQuery,
		endMonthQuery,
		startYearQuery,
		endYearQuery,
	])

	const closeStageModalBtn = useRef()
	const closeIssueModalBtn = useRef()

	const openDeleteStageModalBtn = useRef()
	const openDeleteIssueModalBtn = useRef()

	const closeDeleteStageModalBtn = useRef()
	const closeDeleteIssueModalBtn = useRef()

	/*
	 * Create Stage
	 */
	const onCreateStage = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post(`api/stages`, {
			name: stageName,
			type: "issue",
			position: stagePosition,
		})
			.then((res) => {
				setLoading(false)
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Close Stage Create Modal
				closeStageModalBtn.current.click()
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Update Stage
	 */
	const onUpdateStage = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`api/stages/${stageId}`, {
			name: stageName,
			position: stagePosition,
		})
			.then((res) => {
				setLoading(false)
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Close Stage Create Modal
				closeStageModalBtn.current.click()
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Delete Stage
	 */
	const onDeleteStage = () => {
		Axios.delete(`api/stages/${stageId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Stages
				props.get("stages?type=issue", setStages)
			})
			.catch((err) => props.getErrros(err))
	}

	/*
	 * Create Issue
	 */
	const onCreateIssue = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post(`api/issues`, {
			title: issueTitle,
			description: issueDescription,
			assignedTo: issueAssignedTo,
			plannedStartDate: issuePlannedStartDate,
			plannedEndDate: issuePlannedEndDate,
			priority: issuePriority,
			projectId: issueProjectId,
			stageId: issueStageId,
		})
			.then((res) => {
				setLoading(false)
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Fetch Issues
				props.get("issues", setIssues)
				// Close Issue Create Modal
				closeIssueModalBtn.current.click()
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Update Issue
	 */
	const onUpdateIssue = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`api/issues/${issueId}`, {
			title: issueTitle,
			description: issueDescription,
			assignedTo: issueAssignedTo,
			plannedStartDate: issuePlannedStartDate,
			plannedEndDate: issuePlannedEndDate,
			priority: issuePriority,
			projectId: issueProjectId,
			stageId: issueStageId,
		})
			.then((res) => {
				setLoading(false)
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Fetch Issues
				props.get("issues", setIssues)
				// Close Issue Create Modal
				closeIssueModalBtn.current.click()
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Delete Issue
	 */
	const onDeleteIssue = () => {
		Axios.delete(`api/issues/${issueId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Fetch Issues
				props.get("issues", setIssues)
			})
			.catch((err) => props.getErrros(err))
	}

	/*
	 * Reorder Issues
	 */
	const onIssueReorder = (idsAndPositions) => {
		Axios.put(`api/issues/reorder/1`, {
			idsAndPositions: idsAndPositions,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Stages
				props.get("stages?type=issue", setStages)
			})
			.catch((err) => props.gerErrors(err))
	}

	/*
	 * Update Issue
	 */
	const onUpdateIssueStage = (id, stageId) => {
		setLoading(true)

		Axios.put(`api/issues/${id}`, {
			stageId: stageId,
		})
			.then((res) => {
				setLoading(false)
				// Fetch Stages
				props.get("stages?type=issue", setStages)
				// Fetch Issues
				props.get("issues", setIssues)
				// Close Issue Create Modal
				closeIssueModalBtn.current.click()
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	/**
	 * Moves an item from one list to another list.
	 */
	const move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source)
		const destClone = Array.from(destination)
		const [removed] = sourceClone.splice(droppableSource.index, 1)

		destClone.splice(droppableDestination.index, 0, removed)

		const result = {}
		result[droppableSource.droppableId] = sourceClone
		result[droppableDestination.droppableId] = destClone

		return result
	}

	function onDragEnd(result) {
		const { source, destination } = result

		// dropped outside the list
		if (!destination) {
			return
		}
		const soureId = +source.droppableId
		const destinationId = +destination.droppableId

		// Check if issue has changed stages
		if (soureId === destinationId) {
			const items = reorder(layout[soureId], source.index, destination.index)
			const newState = [...layout]
			newState[soureId] = items

			let issueIdsAndPositions = items.map((issue, key) => ({
				id: issue.id,
				position: key,
			}))

			onIssueReorder(issueIdsAndPositions)
			setLayout(newState)
		} else {
			const result = move(
				layout[soureId],
				layout[destinationId],
				source,
				destination
			)
			const newState = [...layout]
			newState[soureId] = result[soureId]
			newState[destinationId] = result[destinationId]

			let stageId = stages[destinationId].id
			let issueId = result[destinationId][destination.index].id

			onUpdateIssueStage(issueId, stageId)

			setLayout(newState)
		}
	}

	const [layout, setLayout] = useState([])

	useEffect(() => {
		let newLayout = []

		stages.forEach((stage) => newLayout.push(stage.issues))
		setLayout(newLayout)
	}, [stages])

	return (
		<div>
			{/* Stage Modal Start */}
			<div
				className="modal fade"
				id={`createStageModal`}
				tabIndex="-1"
				aria-labelledby="createModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<form
						onSubmit={(e) =>
							creatingStage ? onCreateStage(e) : onUpdateStage(e)
						}>
						<div className="modal-content rounded-4">
							<div className="modal-header">
								<h1
									id="createModalLabel"
									className="modal-title fs-5">
									{creatingStage ? "Create" : "Edit"} Stage
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body text-start text-wrap">
								{/* Name Start */}
								<label htmlFor="">Name</label>
								<input
									type="text"
									placeholder="Stage 1"
									className="form-control"
									defaultValue={stageName}
									onChange={(e) => setStageName(e.target.value)}
									required={true}
								/>
								{/* Name End */}
								{/* Position Start */}
								<label htmlFor="">Position</label>
								<input
									type="number"
									placeholder="1"
									defaultValue={stagePosition}
									className="form-control"
									onChange={(e) => setStagePosition(e.target.value)}
									required={true}
								/>
								{/* Position End */}
							</div>
							<div className="modal-footer justify-content-between">
								<button
									ref={closeStageModalBtn}
									type="button"
									className="mysonar-btn btn-2"
									data-bs-dismiss="modal">
									Close
								</button>

								<div className="d-flex">
									{!creatingStage && (
										<div className="mx-1">
											{/* Stage Modal Start */}
											<Btn
												icon={<DeleteSVG />}
												text="delete stage"
												className="me-1"
												onClick={(e) => {
													e.preventDefault()
													// Close Stage Create Modal
													closeStageModalBtn.current.click()
													// Open Stage Delete Modal
													openDeleteStageModalBtn.current.click()
												}}
											/>
											{/* Stage Modal End */}
										</div>
									)}

									<Btn
										text={`${creatingStage ? "create" : "edit"} stage`}
										loading={loading}
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* Stage Modal End */}

			{/* Delete Stage Modal Start */}
			{/* Confirm Delete Modal End */}
			<div
				className="modal fade"
				id={`deleteModalStage`}
				tabIndex="-1"
				aria-labelledby="deleteModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content rounded-4">
						<div className="modal-header">
							<h1
								id="deleteModalLabel"
								className="modal-title fs-5">
								Delete Stage
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start text-wrap">
							Are you sure you want to delete the stage {stageName}. All
							associated Issue tracking will be lost.
						</div>
						<div className="modal-footer justify-content-between">
							<button
								ref={closeDeleteStageModalBtn}
								type="button"
								className="mysonar-btn btn-2"
								data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-danger rounded-4"
								data-bs-dismiss="modal"
								onClick={onDeleteStage}>
								<span className="me-1">{<DeleteSVG />}</span>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Delete Modal End */}

			{/* Button trigger modal */}
			<button
				ref={openDeleteStageModalBtn}
				className="d-none"
				data-bs-toggle="modal"
				data-bs-target={`#deleteModalStage`}></button>
			{/* Button trigger modal End */}
			{/* Delete Stage Modal End */}

			{/* Issue Modal Start */}
			<div
				className="modal fade"
				id={`createIssueModal`}
				tabIndex="-1"
				aria-labelledby="createModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-xl">
					<form
						onSubmit={(e) =>
							creatingIssue ? onCreateIssue(e) : onUpdateIssue(e)
						}>
						<div className="modal-content rounded-4">
							<div className="modal-header">
								<h1
									id="createModalLabel"
									className="modal-title fs-5">
									{`${creatingIssue ? "Create" : "Update"} Issue`}
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body text-start text-wrap">
								{/* Title Start */}
								<label htmlFor="">Title</label>
								<input
									type="text"
									placeholder="Issue 1"
									defaultValue={issueTitle}
									className="form-control mb-2"
									onChange={(e) => setIssueTitle(e.target.value)}
									required={true}
								/>
								{/* Title End */}

								{/* Description Start */}
								<label htmlFor="">Description</label>
								<textarea
									type="text"
									rows="5"
									defaultValue={issueDescription}
									className="form-control mb-2"
									onChange={(e) => setIssueDescription(e.target.value)}
									required={true}></textarea>
								{/* Description End */}

								{/* Assigned To Start */}
								<label htmlFor="">Assigned To</label>
								<select
									type="text"
									className="form-control mb-2"
									onChange={(e) => setIssueAssignedTo(e.target.value)}
									required={true}>
									{[
										{
											id: "",
											name: "Select Assignee",
										},
									]
										.concat(staff)
										.map((staff, key) => (
											<option
												key={key}
												value={staff.id}
												selected={issueAssignedTo == staff.id}>
												{staff.name}
											</option>
										))}
								</select>
								{/* Assigned To End */}

								<div className="d-flex justify-content-between">
									{/* Planned Start Date Start */}
									<div>
										<label htmlFor="">Planned Start Date</label>
										<input
											type="date"
											className="form-control me-1 mb-2"
											defaultValue={issuePlannedStartDate}
											onChange={(e) => setIssuePlannedStartDate(e.target.value)}
											required={true}
										/>
									</div>
									{/* Planned Start Date End */}

									{/* Planed End Date Start */}
									<div>
										<label htmlFor="">Planned End Date</label>
										<input
											type="date"
											placeholder="Issue 1"
											className="form-control ms-1 mb-2"
											defaultValue={issuePlannedEndDate}
											onChange={(e) => setIssuePlannedEndDate(e.target.value)}
											required={true}
										/>
									</div>
									{/* Planed End Date End */}
								</div>

								{/* Priority Start */}
								<label htmlFor="">Priority</label>
								<select
									type="text"
									className="form-control text-capitalize mb-2"
									onChange={(e) => setIssuePriority(e.target.value)}
									required={true}>
									{["low", "medium", "high"].map((priority, key) => (
										<option
											key={key}
											value={priority}
											selected={issuePriority == priority}>
											{priority}
										</option>
									))}
								</select>
								{/* Priority End */}

								{/* Project ID Start */}
								<label htmlFor="">Project ID</label>
								<select
									type="text"
									className="form-control mb-2"
									onChange={(e) => setIssueProjectId(e.target.value)}
									required={true}>
									{[
										{
											id: "",
											name: "Select Project",
										},
									]
										.concat(projects)
										.map((project, key) => (
											<option
												key={key}
												value={project.id}
												selected={project.id == issueProjectId}>
												{project.name}
											</option>
										))}
								</select>
								{/* Project ID End */}
							</div>
							<div className="modal-footer justify-content-between">
								<button
									ref={closeIssueModalBtn}
									type="button"
									className="mysonar-btn btn-2"
									data-bs-dismiss="modal">
									Close
								</button>
								<div className="d-flex">
									{!creatingIssue && (
										<div className="mx-1">
											{/* Issue Modal Start */}
											<Btn
												icon={<DeleteSVG />}
												text="delete issue"
												className="me-1"
												onClick={(e) => {
													e.preventDefault()
													// Close Issue Create Modal
													closeIssueModalBtn.current.click()
													// Open Issue Delete Modal
													openDeleteIssueModalBtn.current.click()
												}}
											/>
											{/* Issue Modal End */}
										</div>
									)}

									<Btn
										text={`${creatingIssue ? "create" : "update"} issue`}
										loading={loading}
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* Issue Modal End */}

			{/* Delete Issue Modal Start */}
			{/* Confirm Delete Modal End */}
			<div
				className="modal fade"
				id={`deleteModalIssue`}
				tabIndex="-1"
				aria-labelledby="deleteModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content rounded-4">
						<div className="modal-header">
							<h1
								id="deleteModalLabel"
								className="modal-title fs-5">
								Delete Issue
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start text-wrap">
							Are you sure you want to delete the issue {issueTitle}. All
							associated Issue tracking will be lost.
						</div>
						<div className="modal-footer justify-content-between">
							<button
								ref={closeDeleteIssueModalBtn}
								type="button"
								className="mysonar-btn btn-2"
								data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-danger rounded-4"
								data-bs-dismiss="modal"
								onClick={onDeleteIssue}>
								<span className="me-1">{<DeleteSVG />}</span>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Delete Modal End */}

			{/* Button trigger modal */}
			<button
				ref={openDeleteIssueModalBtn}
				className="d-none"
				data-bs-toggle="modal"
				data-bs-target={`#deleteModalIssue`}></button>
			{/* Button trigger modal End */}
			{/* Delete Issue Modal End */}

			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-4">
						{/* Total */}
						<HeroHeading
							heading="Total"
							data={issues.length}
						/>
						<HeroIcon>
							<IssueSVG />
						</HeroIcon>
						{/* Total End */}
					</div>
				</div>
				{/* Total End */}
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			{location.pathname.match("/issues") && (
				<div className="card shadow-sm py-2 px-4">
					<div className="d-flex justify-content-end flex-wrap">
						{/* Name */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Title / Code</label>
							<input
								type="text"
								placeholder="Search by Title or Code"
								className="form-control"
								onChange={(e) => setTitleQuery(e.target.value)}
							/>
						</div>
						{/* Name End */}
						{/* Priority */}
						<div className="flex-grow-1 me-2 mb-2">
							
								<label htmlFor="">Priority</label>
								<select
									type="text"
									className="form-control text-capitalize mb-2"
									onChange={(e) => setPriorityQuery(e.target.value)}
									required={true}>
									{[{id: "", name: "Select Priority"}, {id: "low", name: "Low"}, {id: "medium", name: "Medium"}, {id: "high", name: "High"}].map((priority, key) => (
										<option
											key={key}
											value={priority.id}
											selected={priorityQuery == priority}>
											{priority.name}
										</option>
									))}
								</select>
						</div>
						{/* Priority End */}
						{/* Project */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Project</label>
							<select
								className="form-control"
								onChange={(e) => setProjectIdQuery(e.target.value)}>
								{[{ id: "", name: "Select Project" }]
									.concat(projects)
									.map((project, key) => (
										<option
											key={key}
											value={project.id}
											selected={key == project}>
											{project.name}
										</option>
									))}
							</select>
						</div>
						{/* Project End */}
						{/* Staff */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Staff</label>
							<select
								className="form-control"
								onChange={(e) => setStaffIdQuery(e.target.value)}>
								{[{ id: "", name: "Select Staff" }]
									.concat(staff)
									.map((staff, key) => (
										<option
											key={key}
											value={staff.id}
											selected={key == staff}>
											{staff.name}
										</option>
									))}
							</select>
						</div>
						{/* Staff End */}
						{/* Start Date */}
						<div className="d-flex flex-grow-1">
							{/* Start Month */}
							<div className="flex-grow-1 me-2 mb-2">
								<label htmlFor="">Start At</label>
								<select
									className="form-control"
									onChange={(e) =>
										setStartMonthQuery(
											e.target.value == "0" ? "" : e.target.value
										)
									}>
									{props.months.map((month, key) => (
										<option
											key={key}
											value={key}
											selected={key == startMonthQuery}>
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
									onChange={(e) => setStartYearQuery(e.target.value)}>
									<option value="">Select Year</option>
									{props.years.map((year, key) => (
										<option
											key={key}
											value={year}
											selected={year == startYearQuery}>
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
									onChange={(e) =>
										setEndMonthQuery(
											e.target.value == "0" ? "" : e.target.value
										)
									}>
									{props.months.map((month, key) => (
										<option
											key={key}
											value={key}
											selected={key == endMonthQuery}>
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
									onChange={(e) => setEndYearQuery(e.target.value)}>
									<option value="">Select Year</option>
									{props.years.map((year, key) => (
										<option
											key={key}
											value={year}
											selected={year == endYearQuery}>
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
			)}
			{/* Filters End */}

			<br />

			{/* Buttons Start */}
			<div className="d-flex m-1">
				{/* Stage Modal Start */}
				<Btn
					icon={<PlusSVG />}
					text="create stage"
					dataBsToggle="modal"
					dataBsTarget={`#createStageModal`}
					className="me-1"
					onClick={() => {
						setCreatingStage(true)
						setStageId("")
						setStageName("")
						setStagePosition("")
					}}
				/>
				{/* Stage Modal End */}

				{/* Trigger Modal Start */}
				{stages.length > 0 && (
					<Btn
						icon={<PlusSVG />}
						text="create issue"
						dataBsToggle="modal"
						dataBsTarget={`#createIssueModal`}
						className="me-1"
						onClick={() => {
							setCreatingIssue(true)
							setIssueId("")
							setIssueTitle("")
							setIssueDescription("")
							setIssueAssignedTo("")
							setIssuePlannedStartDate("")
							setIssuePlannedEndDate("")
							setIssuePriority("")
							setIssueProjectId("")
							setIssueStageId("")
						}}
					/>
				)}
				{/* Trigger Modal End */}
			</div>
			{/* Buttons End */}

			<div className="hidden-scroll">
				<div className="d-flex mt-2">
					<DragDropContext onDragEnd={onDragEnd}>
						{layout.map((stage, stageKey) => (
							<div
								key={stageKey}
								className="d-flex flex-column shadow mb-5 mx-1"
								style={{ border: "2px solid rgba(255, 255, 255, 0.3)" }}>
								{/* Stage Title Start */}
								<h6 className="p-2 text-center">
									{stages[stageKey]?.name}

									<div>
										{/* Stage Modal Start */}
										<Btn
											icon={<ViewSVG />}
											text="view"
											dataBsToggle="modal"
											dataBsTarget={`#createStageModal`}
											className="mysonar-sm mt-1 ms-1"
											onClick={() => {
												setCreatingStage(false)
												setStageId(stages[stageKey].id)
												setStageName(stages[stageKey].name)
												setStagePosition(stages[stageKey].position)
											}}
										/>
									</div>
									{/* Stage Modal End */}
								</h6>
								{/* Stage Title End */}
								{/* Stage Start */}
								<Droppable
									key={stageKey}
									droppableId={`${stageKey}`}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											className={`${
												snapshot.isDraggingOver ? "bg-warning-subtle" : ""
											}`}
											style={{ width: "250px", minHeight: "200px" }}
											{...provided.droppableProps}>
											{/* Issue Start */}
											{stage.map((issue, index) => (
												<Draggable
													key={issue.id}
													draggableId={issue.id.toString()}
													index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className={`d-flex justify-content-between glass shadow-sm m-2 p-2 ${
																snapshot.isDragging ? "shadow-lg" : ""
															}`}>
															<div>
																<div className="fw-normal text-primary">
																	{issue.code}
																</div>
																<div className="text-wrap">{issue.title}</div>
																<small className="bg-primary-subtle text-muted rounded-pill px-1">
																	{issue.assignedToName}
																</small>
																{/* <div>
																	<small className="text-primary">
																		ID: {issue.id}
																	</small>
																</div>
																<div>
																	<small className="text-primary">
																		Stage ID: {issue.currentStageId}
																	</small>
																</div>
																<div>
																	<small className="text-secondary">
																		New:{" "}
																		{issue.new ? (
																			<span className="text-success">True</span>
																		) : (
																			<span className="text-danger">False</span>
																		)}
																	</small>
																</div> */}
															</div>
															<div className="d-flex flex-column justify-content-between text-center">
																<Btn
																	icon={<ViewSVG />}
																	dataBsToggle="modal"
																	dataBsTarget={`#createIssueModal`}
																	className="me-1"
																	onClick={() => {
																		setCreatingIssue(false)
																		setIssueId(issue.id)
																		setIssueTitle(issue.title)
																		setIssueDescription(issue.description)
																		setIssueAssignedTo(issue.assignedToId)
																		setIssuePlannedStartDate(
																			issue.plannedStartDateRaw
																		)
																		setIssuePlannedEndDate(
																			issue.plannedEndDateRaw
																		)
																		setIssuePriority(issue.priority)
																		setIssueProjectId(issue.projectId)
																		setIssueStageId(issue.stageId)
																	}}
																/>

																<div>
																	{issue.priority == "high" ? (
																		<span className="text-danger">
																			<HighPrioritySVG />
																		</span>
																	) : issue.priority == "medium" ? (
																		<span className="text-warning">
																			<MediumPrioritySVG />
																		</span>
																	) : (
																		<span className="text-success">
																			<LowPrioritySVG />
																		</span>
																	)}
																</div>
															</div>
														</div>
													)}
												</Draggable>
											))}
											{/* Issue End */}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
								{/* Stage End */}
							</div>
						))}
					</DragDropContext>
				</div>
			</div>
		</div>
	)
}

export default index
