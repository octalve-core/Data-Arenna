import React from "react";
import {
	AreaChart,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	ResponsiveContainer,
	Line,
	LineChart,
} from "recharts";

const Charts = ({
	dKey,
	dColor,
	dKey2 = false,
	dColor2,
	dKey3 = false,
	dColor3,
	state,
	xaxis,
	css,
}) => {
	if (!state) return <></>;

	return (
		<div className={css}>
			<div className="rounded p-1 bg-white">
				<ResponsiveContainer width="100%" height={400}>
					<AreaChart
						data={state}
						margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<CartesianGrid
							stroke="#2e4a66"
							vertical={false}
							strokeDasharray={"1"}
						/>
						<XAxis dataKey={xaxis} axisLine={false} />
						<YAxis axisLine={false} />
						<Tooltip cursor={{ fill: "transparent" }} />
						<Area
							type={"monotone"}
							dataKey={dKey}
							stroke={dColor}
							fill={dColor}
						/>
						{dKey2 && (
							<Area
								type={"monotone"}
								dataKey={dKey2}
								stroke={dColor2}
								fill={dColor2}
							/>
						)}
						{dKey3 && (
							<Area
								type={"monotone"}
								dataKey={dKey3}
								stroke={dColor3}
								fill={dColor3}
							/>
						)}
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Charts;

export const RoundCharts = ({ dColor, state, css, noLegend, bg }) => {
	if (!state) return <></>;

	return (
		<div className={css}>
			<div
				className={`rounded p-1 ${
					bg ? bg : "bg-transparent"
				} d-flex justify-content-center`}>
				<ResponsiveContainer width="100%" height={400}>
					<PieChart margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<Tooltip cursor={{ fill: "transparent" }} />
						{!noLegend && <Legend />}
						<Pie
							data={state}
							dataKey="value"
							nameKey={"name"}
							cx={"50%"}
							cy="50%"
							fill={dColor}
							// label
							innerRadius={"65%"}>
							{state.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry?.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export const MixedBarChart = ({
	dKey,
	dColor,
	dKey2,
	dColor2,
	state,
	xaxis,
	css,
}) => {
	if (!state) return <></>;

	return (
		<div className={css}>
			<div className="rounded p-1 bg-white overflow-auto">
				<ResponsiveContainer width="100%" height={400}>
					<BarChart
						data={state}
						margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<Tooltip cursor={{ fill: "transparent" }} />
						<XAxis dataKey={xaxis} axisLine={false} />
						<YAxis axisLine={false} />
						<CartesianGrid
							stroke="#2e4a66"
							vertical={false}
							strokeDasharray={"1"}
						/>
						<Bar dataKey={dKey} fill={dColor} radius={[15, 15, 0, 0]} />
						<Bar dataKey={dKey2} fill={dColor2} radius={[15, 15, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export const LineMixedCharts = ({
	dKey,
	dColor,
	dKey2 = false,
	dColor2,
	dKey3 = false,
	dColor3,
	state,
	xaxis,
	css,
}) => {
	if (!state) return <></>;

	return (
		<div className={css}>
			<div className="rounded p-1 bg-white">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={state}
						margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<CartesianGrid
							stroke="#2e4a66"
							vertical={false}
							strokeDasharray={"1"}
						/>
						<XAxis dataKey={xaxis} axisLine={false} />
						<YAxis axisLine={false} />
						<Tooltip cursor={{ fill: "transparent" }} />
						<Line
							type={"monotone"}
							dataKey={dKey}
							stroke={dColor}
							fill={dColor}
						/>
						{dKey2 && (
							<Line
								type={"monotone"}
								dataKey={dKey2}
								stroke={dColor2}
								fill={dColor2}
							/>
						)}
						{dKey3 && (
							<Line
								type={"monotone"}
								dataKey={dKey3}
								stroke={dColor3}
								fill={dColor3}
							/>
						)}
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
