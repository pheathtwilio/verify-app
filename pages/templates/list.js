import { VerifyContext } from '../../contexts/VerifyContext'
import { getFilteredTemplates } from '../../services/verifyService'

import { useState } from 'react'

export async function getStaticProps() {

    let filteredTemplates = await getFilteredTemplates()
    
    return {
        props: {
            filteredTemplates
        }
    }
}

export default function ListTemplates({ filteredTemplates }) {

    return (
        <VerifyContext.Consumer>{(context) => {
            const { setSelectedTemplateSet } = context
            return (
                <div>
                    <span className="input-group-text">Templates</span>
                    <select className="form-select" onChange={(event) => {setSelectedTemplateSet(event)}}>
                        {filteredTemplates.map(template =>(
                            <option key={template.sid} value={template.friendlyName}>
                            {template.friendlyName || ''}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }}
        </VerifyContext.Consumer>
    )
}