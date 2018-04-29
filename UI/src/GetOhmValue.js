export async function GetOhmValue (firstBand, secondBand, thirdBand, fourthBand){
    return await fetch("http://localhost:54654/api/resistance/" + firstBand + "/" + secondBand + "/" + thirdBand + "/" + fourthBand + "/")
    .then(results =>{
        return results.json();
    });
}
export default { GetOhmValue }