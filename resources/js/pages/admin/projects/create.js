import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [type, setType] = useState()
	const [description, setDescription] = useState()
	const [loading, setLoading] = useState()

	// Get Projects
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Project",
			path: ["projects", "create"],
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/projects", {
			name: name,
			type: type,
			description: description,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Redirect to Projects
				setTimeout(() => history.push(`/admin/erp/projects`), 500)
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

					{/* Type */}
					<label htmlFor="name">Type</label>
					<select
						name="type"
						placeholder="Type"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}
					>
						<option value="design">Design</option>
					</select>
					{/* Type End */}

					{/* Description */}
					<label htmlFor="name">Description</label>
					<input
						name="description"
						placeholder="Description"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}
					/>
					{/* Description End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add project"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/erp/projects`}
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
