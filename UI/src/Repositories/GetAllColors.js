import { GetColors } from './Urls'

export async function GetAllColors(){
    var response = await fetch(GetColors())
        .then(data => data.json())
        .then(data => JSON.parse(data))
        .catch(error => console.error('Error:', error));
    return response;
}
export default { GetAllColors }