import { VerifyContext } from '../../contexts/VerifyContext'

export default function SubmitButton (isLoading) {

    return (
        <VerifyContext.Consumer>{(context) => {
        
            return (
                <div>
                    {isLoading.isLoading && <button className="btn btn-primary" type="submit" disabled>Sending...</button>}
                    {!isLoading.isLoading && <button className="btn btn-primary" type="submit" >Submit</button>}
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}



