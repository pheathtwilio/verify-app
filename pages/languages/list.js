import { getLanguages } from '../../services/verifyService'
import { VerifyContext } from '../../contexts/VerifyContext'

export async function getStaticProps() {

    let languages = await getLanguages()
    
    return {
        props: {
            languages
        }
    }
}

export default function ListLanguages({ languages, templates }) {

    return (
        <VerifyContext.Consumer>{(context) => {
            const { setTemplate } = context
            return (
            <div>
                <span name="input-group-text">Choose Language</span>
                <select className="form-select" onChange={(event) => {setTemplate(event, templates)}}>
                    {languages.map(language =>(
                        <option key={language} value={language}>
                        {language || ''}
                        </option>
                    ))}
                </select>
            </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}