# Assignment B: Inventory Database

## Database Schema
- **Suppliers**: Master collection for merchant identity and location.
- **Inventory**: Stores surplus items with strict validation (Price > 0, Quantity >= 0).
- **Relationship**: 1:N relational structure using MongoDB references (`supplier_id`).

## Why MongoDB (NoSQL)?
I selected MongoDB for its **Schema Flexibility**. surplus stock often requires heterogeneous metadata (e.g., expiry dates for chemicals vs. dimensions for machinery) that a document store handles natively. It provides a highly developer-friendly JSON interface that aligns with modern Node.js engineering.

## Optimizations
- **Aggregation Pipeline**: The "Required Query" is implemented using a server-side aggregation pipeline, ensuring high performance by processing data grouping and value sorting directly on the database node.
- **Indexing**: Implemented a **Compound Index** `{ supplier_id: 1, price: -1 }` on the Inventory collection to optimize the supplier relationship lookup and value-ordered scans.
