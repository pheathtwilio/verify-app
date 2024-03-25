import { VerifyContext } from "../../contexts/VerifyContext"

export default function ViewTemplate({ template }) {
    return (
        <VerifyContext.Consumer>{(context) => {
            let {selectedTemplate} = context

            if(selectedTemplate.text == ""){
                selectedTemplate.text = template.text
            }
            return(
                <div className="input-group">
                    <span className="input-group-text">Template</span>
                    <textarea className="form-control" value={selectedTemplate.text} readOnly />
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}


