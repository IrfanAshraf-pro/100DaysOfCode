const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  let search = 'a'
  const products = await Product.find({}).sort('-name')
  res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query
  let querryObject = {}
  if (featured) {
    querryObject.featured = featured ? true : false
  }
  if (company) {
    querryObject.company = company
  }
  if (name) {
    querryObject.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b{<|>|>=|<=|=}/
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        querryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  console.log(querryObject)
  let result = Product.find(querryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  if (fields) {
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  let products = await result
  res.status(200).json({ products, nbHits: products.length })
}

// const

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
