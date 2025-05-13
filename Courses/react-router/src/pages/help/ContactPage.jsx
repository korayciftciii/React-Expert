
export default function ContactPage() {

    return (
        <>
            <div id="contact">
                <h2>Contact </h2>
                <form action="">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="content">Message:</label>
                        <textarea name="content" id="content"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}