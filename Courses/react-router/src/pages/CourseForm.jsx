import { Form, useNavigation } from "react-router";
import { redirect } from "react-router";


export default function CourseForm({ method, data }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (

        <Form method={method}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    defaultValue={data ? data.title : ""}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    required
                    defaultValue={data ? data.image : ""}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    required
                    rows={5}
                    defaultValue={data ? data.description : ""}
                ></textarea>
            </div>
            <button disabled={isSubmitting} type="submit">{isSubmitting ? <span><i className="fa-solid fa-spinner"></i></span> : <span>Submit</span>}</button>
        </Form>
    )
}
export async function courseCreateAction({ request, params }) {
    const data = await request.formData();
    let requestUrl = 'http://localhost:5000/courses/'

    const requestMethod = request.method;
    if (requestMethod === 'PUT') {
        const courseId = params.courseId;
        requestUrl = requestUrl + courseId;
    }

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        description: data.get('description'),

    }
    const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
    });

    if (response.ok) {
        return redirect('/courses');
    }



}