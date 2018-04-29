export async function GetColorByName (name){
    return await fetch("http://localhost:54654/api/colorBands/" + name)
    .then(results =>{
        return results.json();
    })
    .then(function(data){
        return JSON.parse(data);
    });
}

export async function GetAllColors(){
    var response = await fetch("http://localhost:54654/api/colorBands/");
    var json = await response.json();
    return JSON.parse(json);
}
export default { GetAllColors, GetColorByName }