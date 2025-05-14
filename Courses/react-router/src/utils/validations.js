export function isRequiredCheck(value) {
    return value && value.trim().lenght > 0;
}
export function isValidImage(value) {
    return (
        value && value.endsWith('.jpg') | value.endsWith('.jpeg') | value.endsWith('.png')
    )
}