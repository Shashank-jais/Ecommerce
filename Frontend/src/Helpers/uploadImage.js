const url =`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY }/image/upload`
const uploadImage =async(image)=>{
    const formdata=new FormData()
    formdata.append("file",image)
    formdata.append("upload_preset","Ecommerce")
    const dataResponse = await fetch(url,{
        method: 'POST',
        body:formdata
    })

    return dataResponse.json()

}

export default uploadImage