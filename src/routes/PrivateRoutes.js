import { Alert } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux'

const PrivateRoutes = (props) => {

    const user = useSelector( state => state.user.account )

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