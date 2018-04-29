import { GetColors } from './Urls'

export async function GetAllColors(){
    var response = await fetch(GetColors());
    var json = await response.json();
    return JSON.parse(json);
}
export default { GetAllColors }