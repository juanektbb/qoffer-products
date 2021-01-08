# Qoffer-products
Run project with: `npm run dev`

File `.env` is required for database as per this body: <br> 
```
HOST=str
USERNAME=str
PASSWORD=str
DBNAME=str
DBPORT=int
```

#### Description:
Create product import via csv files with Nodejs and Postgres on backend, and React.js on frontend. The required fields are product title, product code, sku and description. The csv file structure is unknown, so should have field mapping.

#### Requirements:
* Entire setup for client and server is raw, own code
* Webpack configuration is also raw and written by developer
* Database connection, used postgres in Amazon RDS
* GraphQL server configuration
* No frontend libraries, neither react-scripts

## Graphql access
In route `/graphql`, you can only query from a custom object type named `product`.

Example to get all data: 
```
{
  products {
    id
    p_name
    p_sku
    p_code
    p_sku
    p_description
  }
}
```

Example to get an individual product (all previous fields are available for query):
```
{
  product(p_name: "shorts") {
    id
    p_name
    p_sku
    p_code
    p_sku
    p_description
  }
}
```
