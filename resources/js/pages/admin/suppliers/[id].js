import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import InventoryList from "@/components/Inventories/InventoryList"
import WorkPlanList from "@/components/WorkPlan/WorkPlanList"

const show = (props) => {
	var { id } = useParams()

	const [project, setProject] = useState({})
	const [workPlans, setWorkPlans] = useState([])
	const [inventories, setInventories] = useState([])

	const [nameQuery, setNameQuery] = useState("")

	const [tab, setTab] = useState("work-plan")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Project", path: ["projects", "view"] })
		props.get(`projects/${id}`, setProject)
		props.getPaginated(`work-plans?projectId=${id}`, setWorkPlans)
		props.getPaginated(`inventories?projectId=${id}`, setInventories)
	}, [id])

	useEffect(() => {
		props.getPaginated(
			`inventories?projectId=${id}&
				name=${nameQuery}`,
			setInventories
		)
	}, [nameQuery])

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
					<h4>{project.name}</h4>
					<h6>{project.type}</h6>
					<h6>{project.description}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"work-plan"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("work-plan")}>
						Work Plan
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"inventories"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("inventories")}>
						Inventory
					</div>
				</div>
				{/* Tabs End */}

				{/* Work Plans Tab */}
				<WorkPlanList
					{...props}
					activeTab={activeTab("work-plan")}
					workPlans={workPlans}
					setWorkPlans={setWorkPlans}
					totalWorkPlans={project.workPlanCount}
					projectId={id}
					setProject={setProject}
				/>
				{/* Work Plans Tab End */}

				{/* Inventories Tab */}
				<InventoryList
					{...props}
					activeTab={activeTab("inventories")}
					inventories={inventories}
					setInventories={setInventories}
					totalInventory={project.inventoryCount}
					projectId={id}
					setProject={setProject}
					setNameQuery={setNameQuery}
				/>
				{/* Inventories Tab End */}
			</div>
		</div>
	)
}

export default show