import { NavLink } from "react-router-dom"


const NotFound = () => {


    return (
        <>
            <div className="my-5 page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found.</div>
                            <NavLink to="/" className="btn btn-link">Back to Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound