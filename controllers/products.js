const Products = require('../models/products');

//TO HANDLE MULTIPLE USERS IN CART RUN A FOR EACH CARTITEM MAKE A STRIPE API CALL FRO
//CARTITEM.STRIPID
exports.getProducts = async (req, res) => {
    try {
        const productData = await Products.products();
        if (productData.length == 0) {
            res.status(404).json({message: `You haven't added any products yet.`})
        } else {
            res.status(200).json(productData);
        }
    } catch (err) {
        res.status(500).json(`No products found`);
        console.log(err)
    }
};

// exports.getProductById = async (req, res) => {
//     try {
//         const {id} = req.params
//         const productData = await Products.productById(id)
//         if(!productData) {
//             res.status(404).json(`That product cannot be found`)
//         } else {
//             res.status(200).json(productData);
//         }
//     } catch (err) {
//         res.status(500).json(`That product cannot be found`);
//         console.log(err, 'error from product by id')
//     }
// };

exports.filterBy = async (req, res) => {
    try {
        const {col, filter} = req.query
        console.log(req.query, "query params")
        const product = await Products.filterBy(col, filter)
        res.status(200).json(product)
        //products?col=catergory?&filter=rings
        //req.query.filter
    } catch (err) {
        res.status(500).json(err)
        console.log(err, "error from filter by")
    }
// exports.editProduct = async (req, res, next) => {
//     const {id}  = req.params;
//     console.log(id, "id")
//     const updatedProduct = req.body;
//     try {
//         // const productData = await Products.productById(id)
//         // if(!productData) {
//         //     //TODO: BETTER ERROR HANDLING NOT THROWING ERROR HERE
//         //     res.status(404).json({message: "That product was not found"})
//         // } else {
//             const newProduct = await Products.editProduct(id, updatedProduct);
//             res.status(200).json(`Your product was edited`)
//         //}
//     } catch (err) {
//         if(err == "Undefined binding")
//         res.status(500).json(err)
//         console.log(err, 'error from edit');
//     }
// };
}


