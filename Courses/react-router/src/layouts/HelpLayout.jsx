import { NavLink, Outlet } from "react-router";

export default function HelpLayout() {
    return (
        <>
            <div id="help-layout">
                <h1>Help</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum odio nihil voluptatem a distinctio, culpa inventore voluptas, perspiciatis animi mollitia nam nesciunt eos fugiat adipisci quibusdam at, sit incidunt hic nobis ipsum! Eligendi facilis sint molestias, numquam cum veritatis. Quis?</p>
                <nav >
                    <NavLink to='contact'>Contact</NavLink>
                    <NavLink to='faqs'>FAQS</NavLink>
                </nav>
                <Outlet />
            </div>
        </>
    )
}