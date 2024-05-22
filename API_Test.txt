
API test


1)	To Insert Product (In response it will return Product Id) 

POST - http://localhost:5000/api/product

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "stock": 50
}

response - 
{
  "productId": "664dd46da12f971052e47314"
}

********************************************************************************************************************************
2) To Delete Product

DELETE - http://localhost:5000/api/product/664d9a984e15d37826a35e0a

response

{
  "message": "Product deleted"
}

*******************************************************************************************************************************
3)	To Update Product

PUT- http://localhost:5000/api/product/664d9a984e15d37826a35e0a

{
  "name": "Product 2",
  "description": "Product Description",
  "price": 500,
  "stock": 80
}

response

{
  "message": "Product updated"
}

*******************************************************************************************************************************
4)	To get List of Products

GET - http://localhost:5000/api/products

response 

[
  {
    "_id": "664d513896dae4c4f50fe3fd",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 50,
    "__v": 0
  },
  {
    "_id": "664d51ee9f843247c3c658c6",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 50,
    "__v": 0
  },
  {
    "_id": "664d51f09f843247c3c658c8",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 60,
    "__v": 0
  },
  {
    "_id": "664d53639f843247c3c658da",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 90,
    "__v": 0
  },
  {
    "_id": "664d75d36de8195205988831",
    "name": "Product 2",
    "description": "Product Description",
    "price": 500,
    "stock": 80,
    "__v": 0
  },
  {
    "_id": "664d9a984e15d37826a35e0a",
    "name": "Product 2",
    "description": "Product Description",
    "price": 500,
    "stock": 80,
    "__v": 0
  },
  {
    "_id": "664dd46da12f971052e47314",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 50,
    "__v": 0
  }
]

*******************************************************************************************************************************

get product by id

GET - http://localhost:5000/api/product/664d51f09f843247c3c658c8

response

{
  "_id": "664d51f09f843247c3c658c8",
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "stock": 60,
  "__v": 0
}

*******************************************************************************************************************************
5)	To Insert Order (Can be multiple in array, In response it will provide purchase Id)


POST - http://localhost:5000/api/order

{
  "orders": [
    {
      "productId": "664d75d36de8195205988831",
      "quantity": 2,
      "totalCost": 200
    },
    {
      "productId": "664d53639f843247c3c658da",
      "quantity": 1,
      "totalCost": 500
    }
  ]
}

response

{
  "purchaseId": "664dd60aa12f971052e47322",
  "orders": [
    {
      "productId": "664d75d36de8195205988831",
      "quantity": 2,
      "totalCost": 200,
      "_id": "664dd60aa12f971052e47323",
      "dateOfPurchase": "2024-05-22T11:24:58.738Z",
      "__v": 0
    },
    {
      "productId": "664d53639f843247c3c658da",
      "quantity": 1,
      "totalCost": 500,
      "_id": "664dd60aa12f971052e47325",
      "dateOfPurchase": "2024-05-22T11:24:58.826Z",
      "__v": 0
    }
  ]
}

*******************************************************************************************************************************

6)	To Delete Order

DELETE - http://localhost:5000/api/order/664dd60aa12f971052e47325

response

{
  "message": "Order deleted"
}

*******************************************************************************************************************************

7)	To Update Order

PUT - http://localhost:5000/api/order/664dd60aa12f971052e47325

{
  "orders": [
    {
      "productId": "664dd60aa12f971052e47325",
      "quantity": 2,
      "totalCost": 202
    }
    ]
}

response

{
  "message": "Order updated"
}

*******************************************************************************************************************************
8)	To get List of Purchase-by-Purchase Id 

response


[
  {
    "_id": "664d52dd9f843247c3c658d2",
    "productId": "664d51f09f843247c3c658c8",
    "quantity": 2,
    "totalCost": 200,
    "dateOfPurchase": "2024-05-22T02:05:17.850Z",
    "__v": 0
  },
  {
    "_id": "664d772b6de8195205988841",
    "productId": "664d75d36de8195205988831",
    "quantity": 2,
    "totalCost": 200,
    "dateOfPurchase": "2024-05-22T04:40:11.905Z",
    "__v": 0
  },
  {
    "_id": "664d772c6de8195205988843",
    "productId": "664d53639f843247c3c658da",
    "quantity": 1,
    "totalCost": 500,
    "dateOfPurchase": "2024-05-22T04:40:12.010Z",
    "__v": 0
  },
  {
    "_id": "664dd60aa12f971052e47323",
    "productId": "664d75d36de8195205988831",
    "quantity": 2,
    "totalCost": 200,
    "dateOfPurchase": "2024-05-22T11:24:58.738Z",
    "__v": 0
  }
]

*******************************************************************************************************************************

order  get by id 

GET - http://localhost:5000/api/order/664dd60aa12f971052e47325

response

{
  "_id": "664d772b6de8195205988841",
  "productId": "664d75d36de8195205988831",
  "quantity": 2,
  "totalCost": 200,
  "dateOfPurchase": "2024-05-22T04:40:11.905Z",
  "__v": 0
}

*******************************************************************************************************************************

9)	To get Daily Collection

GET - http://localhost:5000/api/daily-collection

{
  "total": 1100
}


