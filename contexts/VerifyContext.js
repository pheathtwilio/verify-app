import React, { createContext, Component } from 'react'

export const VerifyContext = createContext()

class VerifyContextProvider extends Component {
    state = {
        channels: [],
        templates: [],
        filteredTemplates: [],
        languages: [],
        selectedChannel: '',
        selectedLanguage: '',
        selectedTemplate: {text: ''}
    }
    setSelectedChannel = (channel) => {
        this.setState({selectedChannel: channel.target.value})
    }
    setLanguage = (language) => {
        this.setState({selectedLanguage: language})
    }
    // TODO: This only works with one Template set right now
    setTemplate = (language, templates) => {
        this.setLanguage(language)
        if(templates[0].translations.hasOwnProperty(language.target.value)){
            this.setState({selectedTemplate: {text: templates[0].translations[language.target.value].text}})
        }
    }
    setSelectedTemplateSet = (event) => {
        // get Template Set by name
        // set Template Set by SID
    }
    
    render() {
        return ( 
            <VerifyContext.Provider value={
                {
                    ...this.state, 
                    setSelectedChannel: this.setSelectedChannel, 
                    setTemplate: this.setTemplate, 
                    setSelectedTemplateSet: this.setSelectedTemplateSet
                }}>
                {this.props.children}
            </VerifyContext.Provider>
        )
    }
}

export default VerifyContextProvider