const url = `https://api.cloudinary.com/v1_1/dsq2j3fxm/image/upload`

const uploadImage = async(image)=>{
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'qurcee')
    const dataResponse = await fetch(url,{
        method: 'POST',
        body: formData
    })
    

    return dataResponse.json()

}

export default uploadImage