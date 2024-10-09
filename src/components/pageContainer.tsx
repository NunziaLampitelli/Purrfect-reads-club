import { Outlet } from "react-router-dom";
import "./pageContainer.css";

function PageContainer() {
	return (
		<div className="page-container">
			<section className="content">
				<Outlet />{" "}
				{/* Qui viene gestito il rendering dinamico in base alla route */}
			</section>
		</div>
	);
}

export default PageContainer;
