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
					className={`nav-link ${active("/admin/dashboard")}`}>
					<div className="nav-link-icon">
						<HomeSVG />
					</div>
					<div className="nav-link-text">Dashboard</div>
				</Link>
			</li>
			{/* Dashboard Link End */}
			{/* Invoices Link */}
			{/* <li className="nav-item">
				<Link
					to={`/admin/invoices`}
					className={`nav-link ${active("/admin/invoices")}`}>
					<div className="nav-link-icon">
						<InvoiceSVG />
					</div>
					<div className="nav-link-text">Invoices</div>
				</Link>
			</li> */}
			{/* Invoices Link End */}
			{/* Payments Link */}
			{/* <li className="nav-item">
				<Link
					to={`/admin/payments`}
					className={`nav-link ${active("/admin/payments")}`}>
					<div className="nav-link-icon">
						<PaymentSVG />
					</div>
					<div className="nav-link-text">Payments</div>
				</Link>
			</li> */}
			{/* Payments Link End */}
			{/* Credit Notes Link */}
			{/* <li className="nav-item">
				<Link
					to={`/admin/credit-notes`}
					className={`nav-link ${active("/admin/credit-notes")}`}>
					<div className="nav-link-icon">
						<CreditNoteSVG />
					</div>
					<div className="nav-link-text">Credit Notes</div>
				</Link>
			</li> */}
			{/* Credit Notes Link End */}
			{/* Wallet */}
			{/* <li className="nav-item">
				<Link
					to={`/admin/wallet`}
					className={`nav-link ${active("/admin/wallet")}`}>
					<div className="nav-link-icon">
						<WalletSVG />
					</div>
					<div className="nav-link-text">Wallet</div>
				</Link>
			</li> */}
			{/* Wallet End */}
			{/* Roles Links */}
			{/* <li className="nav-item">
				<Link
					to={`/admin/roles`}
					className={`nav-link ${active("/admin/roles")}`}>
					<div className="nav-link-icon">
						<PersonGearSVG />
					</div>
					<div className="nav-link-text">Roles</div>
				</Link>
			</li> */}
			{/* Roles Link End */}
		</React.Fragment>
	)
}

export default AdminNavLinks
