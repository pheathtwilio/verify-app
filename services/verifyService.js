require('dotenv').config()
const twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
const languages = require('./languages.json')
const locales = require('./languages.json')


const getTemplates = async () => {

    let templates = []

    try {
        templates = await twilio.verify.v2.templates.list()
    } catch (e) {
        console.error(e)
    }

    return templates

}

const getFilteredTemplates = (templates) => {

  let filteredTemplates = []

  templates.forEach((template) => {
    let templateClone = ({
      sid: template.sid,
      friendlyName: template.friendlyName,
      channel: template.channels,
      translations: template.translations
    })
    filteredTemplates.push(templateClone)
  })

  return filteredTemplates

}

const getTemplateBySidandLanguage = (sid, language, templates) => {

  let filteredTemplate = ({})

  templates.forEach((template) => {
    if(template.sid == sid && (template.translations).hasOwnProperty(language)){
      filteredTemplate = ({
        sid: sid,
        is_default_translation: template.translations[language].is_default_translation,
        status: template.translations[language].status,
        to_be_deleted: template.translations[language].to_be_deleted,
        locale: template.translations[language].locale,
        text: template.translations[language].text,
        date_updated: template.translations[language].date_updated,
        temporal_text: template.translations[language].temporal_text,
        date_created: template.translations[language].date_created
      })
    }
  })
  
  return filteredTemplate

}

const lookupLocaleName = (key) => {

  let locale = locales.filter((locale) => {
    if(locale.code == key){
      return JSON.stringify(locale)
    }
  })

  return locale[0].name + ' - ' + locale[0].native
}

const getLanguages = (templates) => {
 
  let languages = []

  if(templates.length > 0){
    for(var key of Object.keys(templates[0].translations)){
      languages.push({key: key, name: lookupLocaleName(key)})
    }
  }
  
  let filteredLanguages = languages.filter((value, index, array) => array.indexOf(value) === index)

  return filteredLanguages
}


module.exports = {getTemplates, getFilteredTemplates, getTemplateBySidandLanguage, getLanguages}