import { useContext } from "react"
import { Alert } from "react-bootstrap"
import { UserContext } from "../context/UserContext"
import Container from 'react-bootstrap/Container';

const PrivateRoutes = (props) => {

  const { user } = useContext(UserContext)

    if(user && !user.auth){
        return <>
        <Container>
            <Alert variant="danger" className="my-5">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permission to access this page
                </p>
            </Alert>
        </Container>
        </>
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes