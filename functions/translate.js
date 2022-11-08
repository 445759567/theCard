// import {googleTranslate} from "../APIs/google";

export const getTranslationForDescription = async (text, language) =>{
    if(!language) return text
    // let textArray = []
    // let finalResult = [...text]
    // finalResult.map(item=>{
    //     textArray.push(item.text)
    // })
    // const result = await googleTranslate.translateAxios(textArray, language)
    // console.log(result)
    // result.data.translations.map((item, index)=>{
    //     finalResult[index].text = item.translatedText
    // })
    // // console.log(finalResult)
    // return finalResult
}
