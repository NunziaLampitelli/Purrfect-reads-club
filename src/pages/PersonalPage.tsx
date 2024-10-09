import { Outlet } from "react-router-dom";

function PageContainer() {
	return (
		<div>
			<h2>Welcome to the PageContainer</h2>
			<Outlet />{" "}
			{/* Qui verranno renderizzati i contenuti delle rotte figlie */}
		</div>
	);
}

export default PageContainer;
