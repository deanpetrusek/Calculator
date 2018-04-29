var rootUrl = "http://localhost:54654";

export function GetResistance(bandOne, bandTwo, bandThree, bandFour){
    return rootUrl + "/api/resistance/" + bandOne + "/" + bandTwo + "/" + bandThree + "/" + bandFour
}
export function GetColors(){
    return rootUrl + "/api/colorBands/"
}

export default {GetResistance, GetColors}