

import SubmitButton from '../submit/submit'

import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation'

export default function otp () {

    const searchParams = useSearchParams()
    const target = searchParams.get('target')
        
    const onSubmit = async (e) => {

        e.preventDefault()

        let code = ""

        for(var i=0; i<(e.target.length - 1); i++){
            code += e.target[i].value
        }
        

    }


    return (
        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2"> 
            <form onSubmit={onSubmit}>
                <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength="1" /> 
                <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1" />
                <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1" /> 
                <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1" /> 
                <input className="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="1" /> 
                <input className="m-2 text-center form-control rounded" type="text" id="sixth" maxLength="1" /> 
                <SubmitButton isLoading={false}/>
            </form>
        </div>
    )


}

