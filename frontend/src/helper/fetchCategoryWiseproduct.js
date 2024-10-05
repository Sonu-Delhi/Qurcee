import summryApi from "../common"

const fetchCategoryWiseProduct = async(category)=>{
  const resposne = await fetch(summryApi.categorywWiseProduct.url,{
    method:summryApi.categorywWiseProduct.method,
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify({
      category:category
    })
  })
  const dataResponse = await resposne.json()
  return dataResponse
}

export default fetchCategoryWiseProduct