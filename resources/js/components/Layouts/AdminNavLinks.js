import React, { useEffect, useState } from "react"
import {
	Link,
	useLocation,
	useHistory,
} from "react-router-dom/cjs/react-router-dom.min"

import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import PropertySVG from "@/svgs/PropertySVG"
import StaffSVG from "@/svgs/StaffSVG"
import MoneySVG from "@/svgs/MoneySVG"
import WalletSVG from "@/svgs/WalletSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"
import WaterReadingSVG from "@/svgs/WaterReadingSVG"
import CreditNoteSVG from "@/svgs/CreditNoteSVG"
import ProjectSVG from "@/svgs/ProjectSVG"
import ERPSVG from "@/svgs/ERPSVG"

const AdminNavLinks = (props) => {
	const location = useLocation()
	const history = useHistory()

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded text-secondary bg-secondary-subtle mx-2"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded text-secondary bg-secondary-subtle mx-2"
		)
	}

	return (
		<React.Fragment>
			{/* Dashboard Link */}
			<li className="nav-item">
				<Link
					to={`/admin/dashboard`}
					className={`nav-link my-1 ${active("/admin/dashboard")}`}>
					<div className="nav-link-icon">
						<HomeSVG />
					</div>
					<div className="nav-link-text">Dashboard</div>
				</Link>
			</li>
			{/* Dashboard Link End */}
			{/* ERP Links */}
			<li className="nav-item">
				<a
					href="#"
					className={`nav-link accordion-button my-1 ${active("/admin/erp/")}`}
					data-bs-toggle="collapse"
					data-bs-target="#collapseERP"
					aria-expanded="false"
					aria-controls="collapseERP">
					<div className="nav-link-icon">
						<ERPSVG />
					</div>
					<div className="nav-link-text">ERP</div>
				</a>

				{/* Collapse */}
				<div
					className={!location.pathname.match("/erp/") ? "collapse" : ""}
					id="collapseERP">
					<ol className="ms-4">
						{/* Dashboard */}
						<li className="nav-item">
							<Link
								to={`/admin/erp/dashboard`}
								className={`nav-link ${activeStrict("/admin/erp/dashboard")}`}>
								<div className="nav-link-icon">
									<HomeSVG />
								</div>
								<div className="nav-link-text">Dashboard</div>
							</Link>
						</li>
						{/* Dashboard End */}
						{/* Projects */}
						<li className="nav-item">
							<Link
								to={`/admin/erp/projects`}
								className={`nav-link ${
									active("/admin/erp/projects") ||
									active("/admin/erp/work-plan") ||
									active("/admin/erp/inventory")
								}`}>
								<div className="nav-link-icon">
									<ProjectSVG />
								</div>
								<div className="nav-link-text">Projects</div>
							</Link>
						</li>
						{/* Projects End */}
					</ol>
				</div>
				{/* Collapse End */}
			</li>
			{/* ERP Links End */}
		</React.Fragment>
	)
}

export default AdminNavLinks
