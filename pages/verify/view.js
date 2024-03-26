import VerifyContextProvider from '../../contexts/VerifyContext'
import { getFilteredTemplates, getLanguages, getTemplateBySidandLanguage, getTemplates } from '../../services/verifyService'
import ListChannels from '../channels/list'
import InputChannels from '../channels/input'
import SubmitButton from '../submit/submit'
import ListLanguages from '../languages/list'
import ListTemplates from '../templates/list'
import ViewTemplate from '../templates/view'

import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
// import redirect from 'next/navigation'
import { useRouter } from "next/navigation"

import { useState } from 'react'
 
export async function getStaticProps() {

    let templates = await getTemplates()

    let filteredTemplates = getFilteredTemplates(templates)

    let languages = getLanguages(templates)

    let template = getTemplateBySidandLanguage(filteredTemplates[0].sid, 'en', templates)

    let channels = ['sms', 'voice', 'email']

    return {
        props: {
            channels,
            filteredTemplates,
            languages,
            template,
        },
    }

}

export default function ViewVerify ({ channels, filteredTemplates, languages, template }) {

    const [theseChannels, setChannels] = useState(channels)
    const [theseLanguages, setLanguages] = useState(languages)
    const [theseTemplates, setTemplates] = useState(filteredTemplates)
    const [selectedTemplate, setSelectedTemplate] = useState(template)

    const [isLoading, setIsloading] = useState(false)

    const router = useRouter()

    async function onSubmit(event){
        event.preventDefault()
        setIsloading(true)

        console.log(selectedTemplate)

        // get form details

        // validate form data

        router.push('/')
        
    }

    return (
        <div>
            <VerifyContextProvider>
                <form onSubmit={onSubmit}>
                    <ListLanguages languages={theseLanguages} templates={filteredTemplates}/>
                    <ListTemplates filteredTemplates={theseTemplates}/>
                    <ViewTemplate template={selectedTemplate}/>
                    <ListChannels channels={theseChannels}/>
                    <InputChannels/>
                    <SubmitButton isLoading={isLoading}/>
                </form>
            </VerifyContextProvider>
        </div>
    )
}