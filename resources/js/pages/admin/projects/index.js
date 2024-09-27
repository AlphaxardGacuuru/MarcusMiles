import React, { useEffect, useState } from "react"

import ProjectList from "@/components/Projects/ProjectList"

const index = (props) => {
	const [projects, setProjects] = useState([])

	const [name, setName] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
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
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setProjects
		)
	}, [name, startMonth, endMonth, startYear, endYear])

	return (
		<ProjectList
			{...props}
			projects={projects}
			setProjects={setProjects}
			setName={setName}
			setStartMonth={setStartMonth}
			setEndMonth={setEndMonth}
			setStartYear={setStartYear}
			setEndYear={setEndYear}
		/>
	)
}

export default index
