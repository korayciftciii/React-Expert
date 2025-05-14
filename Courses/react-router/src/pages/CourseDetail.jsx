import { useParams, useRouteLoaderData } from "react-router"

export default function CoursesPage() {
    const course = useRouteLoaderData('course-details');
    const { courseId } = useParams();
    return (
        <>
            <div className="course-details">
                <h1>{course.title}</h1>
                <div className="course-description">
                    <img src={`http://localhost:5000/images/${course.image}`} alt={course.title} />
                    <div>
                        <div>{course.description}</div>
                        <div className="icons">
                            <span>
                                <i className="fa-regular fa-user"></i>  {course.users}
                            </span>
                            <span>
                                <i className="fa-regular fa-thumbs-up"></i>  {course.likes}
                            </span>
                            <span>
                                <i className="fa-regular fa-comment"></i>  {course.comments}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export async function courseDetailsLoader({ params }) {
    const { courseId } = params
    var response = await fetch(`http://localhost:5000/courses/${courseId}`)
    if (!response.ok) {
        throw new Response(`The course you search id of ${courseId} is not found`, { status: 404 });
    }
    return response.json()
}
