import { useLoaderData } from "react-router"

export default function CoursesPage() {
    const courses = useLoaderData();
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
                                <a href="#">More Details</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export async function coursesLoader() {
    var res = await fetch('http://localhost:5000/courses')
    return res.json()
}