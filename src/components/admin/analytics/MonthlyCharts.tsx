"use client";

import {
Bar,
Line,
} from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
Tooltip,
Legend,
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
Tooltip,
Legend
);

export default function MonthlyCharts({
monthlyLeads,
monthlyBlogs,
}:{
monthlyLeads:any[];
monthlyBlogs:any[];
}){

return(

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"1.5rem",
marginTop:"2rem"
}}
>

<div
style={{
background:"#fff",
padding:"1.5rem",
borderRadius:20,
border:"1px solid #E5E7EB",
}}
>

<h2 style={{marginBottom:"1rem"}}>
Monthly Leads
</h2>

<Bar
data={{
labels:monthlyLeads.map(x=>x.month),
datasets:[
{
label:"Leads",
data:monthlyLeads.map(x=>x.total),
backgroundColor:"#2563EB",
},
],
}}
/>

</div>

<div
style={{
background:"#fff",
padding:"1.5rem",
borderRadius:20,
border:"1px solid #E5E7EB",
}}
>

<h2 style={{marginBottom:"1rem"}}>
Monthly Blogs
</h2>

<Line
data={{
labels:monthlyBlogs.map(x=>x.month),
datasets:[
{
label:"Blogs",
data:monthlyBlogs.map(x=>x.total),
borderColor:"#10B981",
backgroundColor:"#10B981",
},
],
}}
/>

</div>

</div>

);

}