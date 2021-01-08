import { graphqlHTTP } from 'express-graphql'
import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType
} from 'graphql'

import pool from './database.js'

let products = []

//Simple select from database
const select_query = "SELECT * FROM products LIMIT 30"
products = pool.query(select_query)
    .then((result) => result.rows)

const getProductsRows = async () => await products

//GraphQL custom product type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: "This is a single product",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        p_name: { type: GraphQLNonNull(GraphQLString) },
        p_code: { type: GraphQLNonNull(GraphQLString) },
        p_sku: { type: GraphQLNonNull(GraphQLString) },
        p_description: { type: GraphQLNonNull(GraphQLString) }
    })
})

//All queries go here
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: "Root Query",
    fields: () => ({
        product: {
            type: ProductType,
            description: "Single product",
            args: {
                id: { type: GraphQLInt },
                p_name: { type: GraphQLString },
                p_code: { type: GraphQLString },
                p_sku: { type: GraphQLString },
                p_description: { type: GraphQLString }
            },
            resolve: async (parent, args) => {

                const { id, p_name, p_code, p_sku, p_description } = args
                const products = await getProductsRows()

                if(id)
                    return products.find(product => product.id === args.id.toString())
                else if(p_name)
                    return products.find(product => product.p_name === args.p_name)
                else if(p_code)
                    return products.find(product => product.p_code === args.p_code)
                else if(p_sku)
                    return products.find(product => product.p_sku === args.p_sku)
                else if(p_description)
                    return products.find(product => product.p_description === args.p_description)
                else
                    return null

            }
        },
        products: {
            type: new GraphQLList(ProductType),
            description: "List of products",
            resolve: async () => await getProductsRows()
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

export default graphqlHTTP({
    schema: schema,
    graphiql: true,
})