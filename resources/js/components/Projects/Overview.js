import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"

const Overview = (props) => {
	const ctx = useRef()

	/*
	 * Colors
	 */
	// "rgba(255, 99, 132, 1)", RED
	// "rgba(255, 159, 64, 1)", ORANGE
	// "rgba(255, 205, 86, 1)", YELLOW
	// "rgba(75, 192, 192, 1)", TEAL
	// "rgba(54, 162, 235, 1)", BLUE
	// "rgba(153, 102, 255, 1)", PURPLE
	// "rgba(201, 203, 207, 1)", GREY
	// "rgba(24, 135, 84, 1)", GREEN

	const config = {
		type: "line",
		data: {
			labels: [
				"01-01-2021",
				"01-02-2021",
				"01-03-2021",
				"01-04-2021",
				"01-05-2021",
				"01-06-2021",
			],
			datasets: [
				{
					label: "Item 1",
					data: [50, 50],
					backgroundColor: "rgba(220, 53, 69, 1)",
					borderColor: "rgba(220, 53, 69, 1)",
					borderWidth: 2,
				},
				{
					label: "Item 2",
					data: [null, 40, 40],
					backgroundColor: "rgba(255, 159, 64, 1)",
					borderColor: "rgba(255, 159, 64, 1)",
					borderWidth: 2,
				},
				{
					label: "Item 3",
					data: [null, null, 30, 30],
					backgroundColor: "rgba(255, 205, 86, 1)",
					borderColor: "rgba(255, 205, 86, 1)",
					borderWidth: 2,
				},
				{
					label: "Item 4",
					data: [null, null, null, 20, 20],
					backgroundColor: "rgba(75, 192, 192, 1)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 2,
				},
				{
					label: "Item 5",
					data: [null, null, null, null, 10, 10],
					backgroundColor: "rgba(54, 162, 235, 1)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 2,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				x: {
					display: true,
					position: "top",
				},
				y: {
					display: false,
				},
			},
			plugins: {
				legend: {
					position: "left",
				},
			},
		},
	}

	useEffect(() => {
		new Chart(ctx.current, config)
	}, [])

	return (
		<div className={props.activeTab}>
			<div className="card rounded m-1 me-4 p-2">
				{/* {props.data && ( */}
				<div
					className="p-2"
					style={{ width: "100%", height: "auto" }}>
					<canvas ref={ctx}></canvas>
				</div>
				{/* )} */}
				<table className="table table-hover table-bordered mt-5">
					<thead>
						<tr>
							<th></th>
							<th style={{ backgroundColor: "rgba(220, 53, 69, 1)" }}>
								Milestone 1
							</th>
							<th style={{ backgroundColor: "rgba(255, 159, 64, 1)" }}>
								Milestone 2
							</th>
							<th style={{ backgroundColor: "rgba(255, 205, 86, 1)" }}>
								Milestone 3
							</th>
							<th style={{ backgroundColor: "rgba(75, 192, 192, 1)" }}>
								Milestone 4
							</th>
							<th style={{ backgroundColor: "rgba(54, 162, 235, 1)" }}>
								Milestone 5
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Total Cost for Milestone</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Percentage payment per milestone</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Payment per milestone</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Due Date</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

Overview.propTypes = {}

export default Overview
