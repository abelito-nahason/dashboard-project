import axios from "axios"

type TableViewParams = {
    limit: number;
    page: number;
    univName:string;
    univCountry:string;
}

const getTableView = async ({limit, page, univName, univCountry}:TableViewParams) => {
    
    const offset = limit * (page)

    let url = `http://universities.hipolabs.com/search?limit=${limit}&offset=${offset}`

    if(univName) {
        url += `&name=${univName}`
    }

    if(univCountry){
        url += `&country=${univCountry}`
    }

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default getTableView