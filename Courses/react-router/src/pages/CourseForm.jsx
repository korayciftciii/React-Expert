import { Form, useActionData, useNavigation } from "react-router";
import { redirect } from "react-router";
import { isRequiredCheck, isValidImage } from "../utils/validations";


export default function CourseForm({ method, data }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const result = useActionData();
    return (

        <Form id="course-form" method={method}>
            <div className="courseForm">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={data ? data.title : ""}
                    />
                    {result && result.title && <p className="error-message">{result.title}</p>}
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        defaultValue={data ? data.image : ""}
                    />
                    {result && result.image && <p className="error-message">{result.image}</p>}
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        rows={5}
                        defaultValue={data ? data.description : ""}
                    ></textarea>
                    {result && result.description && <p className="error-message">{result.description}</p>}
                </div>
                <button disabled={isSubmitting} type="submit">{isSubmitting ? <span><i className="fa-solid fa-spinner"></i></span> : <span>Submit</span>}</button>

            </div>

            <div className="courseValidation">
                {
                    result && result.errors && (
                        <ul className="validationLink">
                            {
                                Object.values(result.errors).map((err, index) => (
                                    <li className="validationError" key={index}>{err}</li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>


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

    const formData = {
        title: data.get('title'),
        image: data.get('image'),
        description: data.get('description'),

    }
    const errors = {};
    // if (!isRequiredCheck(formData.title)) {
    //     errors.title = "Title is required"
    // }

    // if (!isRequiredCheck(formData.description)) {
    //     errors.description = "Description is required"
    // }

    // if (!isValidImage(formData.image)) {
    //     errors.image = 'Image format must to be one of these types(.jpg , .jpeg , .png)'
    // }
    // if (Object.keys(errors).length) {
    //     return errors;
    // }
    const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.status === 403) {
        return response;
    }
    if (response.ok) {
        return redirect('/courses');
    }



}