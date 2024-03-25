import { VerifyContext } from '../../contexts/VerifyContext'

export default function SubmitButton () {
    return (
        <VerifyContext.Consumer>{(context) => {
         
            let isValid = true
            let button
            if(isValid){
                button = <button className="btn btn-primary" type="submit">Submit</button>
            }else{
                button = <button className="btn btn-primary" type="submit" disabled>Submit</button>
            }
            return (
                <div>
                    {button}
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}



