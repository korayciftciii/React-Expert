import { Link, redirect, useLoaderData, useSubmit } from "react-router"


export default function CoursesPage() {
    const courses = useLoaderData();
    const submit = useSubmit();
    function handleDelete(id) {
        const checkConfirmation = window.confirm("Are you sure !!!");
        if (checkConfirmation) {
            submit(null, {
                method: 'DELETE',
                action: '/courses/' + id + '/delete',
            }
            )
        }
    }
    return (
        <>
            <h1>All Courses</h1>
            <div id="courses">
                {
                    courses.map((item) => (
                        <div className="card" key={item.id}>
                            <img src={`http://localhost:5000/images/${item.image}`} alt={item.title} />
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <Link to={item.id}>More Details</Link>
                                <Link to={`${item.id}/editCourse`}>Edit</Link>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id="navigation-link">
                <Link to='/courses/newCourse'>New Course</Link>
            </div>
        </>
    )
}
export async function coursesLoader() {
    var res = await fetch('http://localhost:5000/courses')
    return res.json()
}
export async function courseDeleteAction({ params, request }) {
    const { courseId } = params;
    var res = await fetch(`http://localhost:5000/courses/${courseId}`,
        {
            method: request.method,

        });
    if (res.ok) {
        return redirect('/courses');
    }

}