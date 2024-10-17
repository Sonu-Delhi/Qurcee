const backendDomain = process.env.REACT_APP_BACKEND_URL  //"http://localhost:8080" 

const summryApi = {
    signUp:{
        url : `${backendDomain}/api/signup`,
        method:"post"
    },
    signin:{
        url:`${backendDomain}/api/login`,
        method:"post"
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:"get"
    },
    logout:{
        url:`${backendDomain}/api/logout`,
        method:"get"
    },
    all_user:{
        url:`${backendDomain}/api/allusers`,
        method:"get"
    },
    update_user:{
        url:`${backendDomain}/api/updateuser`,
        method:"put"
    },
    uplaodProducts:{
        url:`${backendDomain}/api/addproduct`,
        method:"post"
    },
    allProducts:{
        url:`${backendDomain}/api/get-product`,
        method:"get"
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method:"post"
    },
    deleteProduct:{
        url:`${backendDomain}/api/delete-product`,
        method:"post"
    },
    Contact:{
        url:`${backendDomain}/api/contact`,
        method:"post"
    },
    productCategory:{
        url:`${backendDomain}/api/getcategory`,
        // url:`${backendDomain}/api/getcategory`,
        method:"get"
    },
    getProducts:{
        url:`${backendDomain}/api/get-product`,
        method:"get"
    },
    categorywWiseProduct:{
        url:`${backendDomain}/api/category-product`,
        method:'post'
        
    },
    productDetails:{
        url:`${backendDomain}/api/product-details`,
        method:'post'
        
    },
    addtoCartProduct:{
        url:`${backendDomain}/api/addtocart`,
        method:"post"
    },
    addtoCartProductCount:{
        url:`${backendDomain}/api/countAddToCartProduct`,
        method:"get"
    },
    updateAddToCartProduct:{
        url:`${backendDomain}/api/update-cart-product`,
        method:"post"
    },
    deleteAddToCartProduct:{
        url:`${backendDomain}/api/delete-cart-product`,
        method:"post"
    },
    filterProduct:{
        url:`${backendDomain}/api/filter-product`,
        method:"post"
    },
    addToCartProductView:{
        url:`${backendDomain}/api/view-cart-product`,
        method:"get"
    },
    payment:{
        url:`${backendDomain}/api/checkout`,
        method:"post"
    },
    placeOrder:{
        url:`${backendDomain}/api/order`,
        method:"post"
    }
    
    // Addproducts:{
    //     url:`${backendDomain}/api/addProduct`,
    //     method:"post"

    // }

}

export default summryApi