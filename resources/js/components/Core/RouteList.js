import React from "react"
import { Route } from "react-router-dom"

import Header from "@/components/Layouts/Header"
import Index from "@/pages/index"

import AdminNav from "@/components/Layouts/AdminNav"

import AdminDashboard from "@/pages/admin/index"
import AdminProjectDashboard from "@/pages/admin/erp-dashboard"

import AdminClients from "@/pages/admin/clients/index"
import AdminClientCreate from "@/pages/admin/clients/create"
import AdminClientView from "@/pages/admin/clients/[id]"
import AdminClientEdit from "@/pages/admin/clients/edit/[id]"

import AdminProjects from "@/pages/admin/projects/index"
import AdminProjectCreate from "@/pages/admin/projects/create"
import AdminProjectView from "@/pages/admin/projects/[id]"
import AdminProjectEdit from "@/pages/admin/projects/edit/[id]"

import AdminWorkPlanCreate from "@/pages/admin/work-plan/create"
import AdminWorkPlanEdit from "@/pages/admin/work-plan/edit/[id]"

import AdminWorkPlanStepCreate from "@/pages/admin/work-plan-step/create"
import AdminWorkPlanStepEdit from "@/pages/admin/work-plan-step/edit/[id]"

import AdminInventoryCreate from "@/pages/admin/inventory/create"
import AdminInventoryEdit from "@/pages/admin/inventory/edit/[id]"

import AdminSuppliers from "@/pages/admin/suppliers/index"
import AdminSupplierCreate from "@/pages/admin/suppliers/create"
import AdminSupplierView from "@/pages/admin/suppliers/[id]"
import AdminSupplierEdit from "@/pages/admin/suppliers/edit/[id]"

import AdminIssues from "@/pages/admin/issues/index"

import AdminInvoices from "@/pages/admin/invoices/index"
import AdminInvoiceCreate from "@/pages/admin/invoices/create"
import AdminInvoiceView from "@/pages/admin/invoices/[id]"
import AdminInvoiceEdit from "@/pages/admin/invoices/edit/[id]"

import AdminPayments from "@/pages/admin/payments/index"
import AdminPaymentCreate from "@/pages/admin/payments/create"
import AdminPaymentEdit from "@/pages/admin/payments/edit/[id]"

import AdminCreditNotes from "@/pages/admin/credit-notes/index"
import AdminCreditNoteCreate from "@/pages/admin/credit-notes/create"
import AdminCreditNoteEdit from "@/pages/admin/credit-notes/edit/[id]"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/edit/[id]"

import AdminRoleIndex from "@/pages/admin/role"
import AdminRoleCreate from "@/pages/admin/role/create"
import AdminRoleEdit from "@/pages/admin/role/edit/[id]"

const RouteList = ({ GLOBAL_STATE }) => {
	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
	]

	// Admin Routes
	const adminRoutes = [
		{
			path: "/admin/dashboard",
			component: <AdminDashboard {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/dashboard",
			component: <AdminProjectDashboard {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/clients",
			component: <AdminClients {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/clients/create",
			component: <AdminClientCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/clients/:id/view",
			component: <AdminClientView {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/clients/:id/edit",
			component: <AdminClientEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/projects",
			component: <AdminProjects {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/projects/create",
			component: <AdminProjectCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/projects/:id/view",
			component: <AdminProjectView {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/projects/:id/edit",
			component: <AdminProjectEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/work-plan/:id/create",
			component: <AdminWorkPlanCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/work-plan/:id/edit",
			component: <AdminWorkPlanEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/work-plan-step/:id/create",
			component: <AdminWorkPlanStepCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/work-plan-step/:id/edit",
			component: <AdminWorkPlanStepEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/inventory/:id/create",
			component: <AdminInventoryCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/inventory/:id/edit",
			component: <AdminInventoryEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/suppliers",
			component: <AdminSuppliers {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/suppliers/create",
			component: <AdminSupplierCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/suppliers/:id/view",
			component: <AdminSupplierView {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/suppliers/:id/edit",
			component: <AdminSupplierEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/erp/issues",
			component: <AdminIssues {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices",
			component: <AdminInvoices {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/create",
			component: <AdminInvoiceCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/:id/view",
			component: <AdminInvoiceView {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/:id/edit",
			component: <AdminInvoiceEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments",
			component: <AdminPayments {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments/:id/create",
			component: <AdminPaymentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments/:id/edit",
			component: <AdminPaymentEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes",
			component: <AdminCreditNotes {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes/:id/create",
			component: <AdminCreditNoteCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes/:id/edit",
			component: <AdminCreditNoteEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff",
			component: <AdminStaff {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/:id/create",
			component: <AdminStaffCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/:id/edit",
			component: <AdminStaffEdit {...GLOBAL_STATE} />,
		},
		{ path: "/admin/roles", component: <AdminRoleIndex {...GLOBAL_STATE} /> },
		{
			path: "/admin/roles/create",
			component: <AdminRoleCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/roles/:id/edit",
			component: <AdminRoleEdit {...GLOBAL_STATE} />,
		},
	]

	return (
		<React.Fragment>
			<Header {...GLOBAL_STATE}>
				{/* Landing Page routes */}
				{routes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
				{/* Landing Page routes End */}
			</Header>

			<AdminNav {...GLOBAL_STATE}>
				{/* Admin Routes */}
				{adminRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
				{/* Admin Routes End */}
			</AdminNav>
		</React.Fragment>
	)
}

export default RouteList
