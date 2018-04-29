import { GetResistance } from './Urls'

export async function GetOhmValue (firstBand, secondBand, thirdBand, fourthBand){
    var endpoint = GetResistance(firstBand, secondBand, thirdBand, fourthBand);
    return await fetch(endpoint)
    .then(results =>{
        return results.json();
    });
}
export default { GetOhmValue }