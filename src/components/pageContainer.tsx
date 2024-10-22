import { Outlet } from "react-router-dom";
import "./pageContainer.css";

function PageContainer() {
	return (
		<div className="page-container">
			<section className="content">
				<Outlet />
			</section>
		</div>
	);
}

export default PageContainer;
