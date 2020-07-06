const Products = require('../models/products');

//TO HANDLE MULTIPLE USERS IN CART RUN A FOR EACH CARTITEM MAKE A STRIPE API CALL FRO
//CARTITEM.STRIPID
exports.getProducts = async (req, res) => {
    try {
        const productData = await Products.products();
        const dbcolors = await Products.getColors();
        const dbImages = await Products.getImages();

        console.log("db colors", dbcolors)
        const colors = dbcolors.map(item => {
            return item.name
        });
        const images = dbImages.map(item => {
            return item.image_url
        });
        console.log("images", images)
        if (productData.length == 0) {
            res.status(404).json({message: `You haven't added any products yet.`})
        } else {
            res.status(200).json({products: productData, colors: colors, images: images});
        }
    } catch (err) {
        res.status(500).json(`No products found`);
        console.log(err)
    }
};

exports.getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const productData = await Products.productById(id)
        
        console.log("product by id", productData)
        if(!productData) {
            res.status(404).json({message: `That product cannot be found`})
        } else {
            const title = productData.map(product => {
                return  product.title}
            )
            console.log("title", title[0])
            const dbColor = await Products.colorBy(title[0])
            const dbImages = await Products.imageBy(title[0])

            console.log("colors from db", dbColor)
            const colors = dbColor.map((color) => {
                return color.name
            })
            const images = dbImages.map((image) => {
                return image.image_url
            })
            console.log("mapped colors", colors)
            const product = productData
            res.status(200).json([product, colors, images]);
        }
    } catch (err) {
        res.status(500).json({message: `That product cannot be found, ${err.message}`});
        console.log(err, 'error from product by id')
    }
};

exports.filterBy = async (req, res) => {
    //products?col=catergory&filter=rings
    try {
        const {col, filter} = req.query
        console.log("col", col)
        console.log("filter", filter)

        if (!col && !filter) {
            res.status(404).json({message: "Enter a column and filter"})
        } else {
            const product = await Products.filterBy(col, filter)
            const colors = product.map(color => ({
                colors: color.colors
            }))
            const images = product.map(color => ({
                colors: color.colors
            }))
            console.log("product", product)
            res.status(200).json([product[0], colors])
        }        
    } catch (err) {
        res.status(500).json(err)
        console.log(err, "error from filter by")
    }
};


