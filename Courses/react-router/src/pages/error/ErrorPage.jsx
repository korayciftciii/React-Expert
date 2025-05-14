import { Link, useRouteError } from "react-router";

export default function NotFoundPage() {
    const error = useRouteError();

    // Varsayılan değerler
    const status = error?.status || 500;
    const title = error?.statusText || "Unexpected Error";
    const message =
        error?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again later.";

    return (
        <div id="error-page" style={{ textAlign: "center", padding: "40px" }}>
            <h1>{status} - {title}</h1>
            <p>{message}</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
                <Link to="/">Home</Link>
                <Link to="/help/contact">Contact</Link>
                <Link to="/help">Help</Link>
            </div>
        </div>
    );
}