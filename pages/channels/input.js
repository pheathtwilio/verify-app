import { VerifyContext } from '../../contexts/VerifyContext'

export default function InputChannels () {
    return (
        <VerifyContext.Consumer>{(context) => {
            const { selectedChannel } = context
            let inputType

            switch(selectedChannel){
                case 'sms':
                    inputType = <input className="form-control" placeholder="+1" type="tel" />
                    break;
                case 'voice':
                    inputType = <input className="form-control" placeholder="+1" type="tel" />
                    break;
                case 'email':
                    inputType = <input className="form-control" placeholder="@" type="text" />
                    break;
                default:
                    inputType = <input className="form-control" placeholder="+1" type="tel" />
                    break;
            }

            return (
                <div className="input-group mb-3">
                    {inputType}
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}

