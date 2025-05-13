import { redirect } from "react-router";
import CourseForm from "./CourseForm";

export default function courseCreat() {
    return (
        <CourseForm method={'POST'} />
    )
}
