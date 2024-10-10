import React, { useEffect, useState } from "react"

import ProjectList from "@/components/Projects/ProjectList"

const index = (props) => {
	const [projects, setProjects] = useState([])

	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [location, setLocation] = useState("")
	const [clientId, setClientId] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endYear, setEndYear] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Projects", path: ["projects"] })
	}, [])

	useEffect(() => {
		// Fetch Projects
		props.getPaginated(
			`projects?
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

	return (
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
	)
}

export default index
