import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const index = (props) => {
	var { id } = useParams()

	const [configuration, setConfiguration] = useState({})

	const [projectType, setProjectType] = useState("")
	const [loading, setLoading] = useState()

	// Get Configuration
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Configurations",
			path: ["configurations"],
		})

		// Fetch Configuration
		props.get(`configurations`, setConfiguration)
	}, [])

	/*
	 * Remove Project Type
	 */
	const removeProjectType = (projectTypeId) => {
		Axios.put(`/api/configurations/1`, {
			projectTypeToRemove: projectTypeId,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Fetch Configuration
				props.get(`configurations`, setConfiguration)
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/configurations/1`, {
			projectType: { id: projectType.toLowerCase(), name: projectType },
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Fetch Configuration
				props.get(`configurations`, setConfiguration)
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
					{/* Project Types Start */}
					<label htmlFor="">Project Types</label>
					<div className="d-flex">
						<input
							name="projectType"
							placeholder="Bungalow etc"
							className="form-control mb-3 me-2"
							onChange={(e) => setProjectType(e.target.value)}
						/>
					</div>

					{configuration.projectTypes?.map((projectType, key) => (
						<div
							className="d-flex"
							key={key}>
							<input
								name="projectType"
								placeholder="Bungalow etc"
								defaultValue={projectType.name}
								className="form-control mb-3 me-2"
								onChange={(e) => setProjectType(e.target.value)}
								disabled={true}
							/>
							{/* Close Icon */}
							<span
								className="text-primary"
								style={{ cursor: "pointer" }}
								onClick={() => removeProjectType(projectType.id)}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>
					))}
					{/* Project Types End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update configuration"
							loading={loading}
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default index
