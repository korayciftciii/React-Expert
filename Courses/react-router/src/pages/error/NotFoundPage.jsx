import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <>
            <div id="error-page">
                <h1>404 Not Found</h1>
                <p>The Page you search is not found.</p>
                <Link to={'/'}>Home</Link>
                <Link to={'/help/contact'}>Contact</Link>
                <Link to={'/help'}>Help</Link>
            </div>
        </>
    );
}