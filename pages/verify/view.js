import VerifyContextProvider from '../../contexts/VerifyContext'
import { getFilteredTemplates, getLanguages, getTemplateBySidandLanguage, getTemplates } from '../../services/verifyService'
import ListChannels from '../channels/list'
import InputChannels from '../channels/input'
import SubmitButton from '../submit/submit'
import ListLanguages from '../languages/list'
import ListTemplates from '../templates/list'
import ViewTemplate from '../templates/view'
import { z } from 'zod'
import validator from 'validator'

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

    const telephoneSchema = z.object({
        number: z.string().refine(validator.isMobilePhone)
    })

    const emailSchema = z.object({
        email: z.string().min(1).email("This is not a valid email"),
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)

        let language = e.target[0].value
        let templateSetSID = e.target[1].value
        let templateSID = e.target[2].value
        let channelType = e.target[3].value
        let target = e.target[4].value

        let errors = []

        if(channelType == 'sms' || channelType == 'voice'){
            if(!validator.isMobilePhone(target, 'en-US')){
                errors.push("The number is not a valid US phone number")
            }
        }
        if(channelType == 'email'){

            let validEmail = ''

            try{
                validEmail = emailSchema.safeParse({email: target})

                if(!validEmail.success){
                    errors.push(JSON.parse(validEmail.error.message)[1].message)
                }

            }catch(error){
                console.error(error)
            }

        }
        
        if(errors.length < 1){

            const res = await fetch("/api/submitVerification", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify( ({
                    language: language,
                    templateSetSID: templateSetSID,
                    templateSID: templateSID,
                    channelType: channelType,
                    target: target
                }))
            })

            const data = await res.json()

            router.push({
                pathname: '/verify/otp',
                query: { target: target}
            })
        }else{
            // otherwise display errors

            
        }

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