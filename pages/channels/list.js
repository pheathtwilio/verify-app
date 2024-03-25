import { VerifyContext } from "../../contexts/VerifyContext";


export default function ListChannels ({ channels }) {
    return (
        <VerifyContext.Consumer>{(context) => {
            const { setSelectedChannel } = context
            return (
                <div>
                    <span name="input-group-text">Choose Channel</span>
                    <select className="form-select" onChange={(event) => {setSelectedChannel(event)}}>
                        {channels.map(channel =>(
                            <option key={channel} value={channel}>
                            {channel || ''}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}