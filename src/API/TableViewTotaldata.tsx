import axios from "axios"

type TotalTableViewParams = {
    univName:string;
    univCountry:string;
}

const getTotalTableView = async ({univName, univCountry}:TotalTableViewParams) => {
    let url = 'http://universities.hipolabs.com/search'

    if(univName) {
        url = `http://universities.hipolabs.com/search?name=${univName}` 
    }

    if(univCountry && univName){
        url += `&country=${univCountry}`
    }

    if(univCountry && !univName) url = `http://universities.hipolabs.com/search?country=${univCountry}`  

    try {
        const response = await axios.get(url)
        return response.data.length
    } catch (error) {
        console.error(error)
    }

}

export default getTotalTableView