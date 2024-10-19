import ProjectList from "@/components/Projects/ProjectList"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const show = (props) => {
	var { id } = useParams()

	const [serviceProvider, setServiceProvider] = useState({})
	const [projects, setProjects] = useState([])

	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [location, setLocation] = useState("")
	const [clientId, setClientId] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endYear, setEndYear] = useState("")

	const [tab, setTab] = useState("goods")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View ServiceProvider", path: ["service-providers", "view"] })
		props.get(`service-providers/${id}`, setServiceProvider)
	}, [id])

	useEffect(() => {
		// Fetch Projects
		props.getPaginated(
			`projects?
			serviceProviderId=${id}&
			name=${name}&
			type=${type}&
			location=${location}&
			clientId=${clientId}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setProjects
		)
	}, [name, type, location, clientId, startMonth, endMonth, startYear, endYear])

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
					<h4>{serviceProvider.name}</h4>
					<h6>{serviceProvider.email}</h6>
					<h6>{serviceProvider.phone}</h6>
					<h6>{serviceProvider.location}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"projects"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("projects")}>
						Projects
					</div>
				</div>
				{/* Tabs End */}

		<ProjectList
			{...props}
			projects={projects}
			setProjects={setProjects}
			setName={setName}
			setType={setType}
			setLocation={setLocation}
			setClientId={setClientId}
			setStartMonth={setStartMonth}
			setEndMonth={setEndMonth}
			setStartYear={setStartYear}
			setEndYear={setEndYear}
		/>
			</div>
		</div>
	)
}

export default show
