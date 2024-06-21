import summaryApi from "../common"

const getcategorywiseproduct=async(category)=>{
    const response = await fetch(summaryApi.categorywiseProduct.url,{
        method: summaryApi.categorywiseProduct.method,
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })
    const datarespone = response.json()
    return datarespone
}
export default getcategorywiseproduct