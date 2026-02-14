# Assignment A: Inventory Search

## Search Logic
The search engine is implemented in `src/app/api/search/route.ts`. Key mechanics include:
- **Partial Matching**: Performs case-insensitive searches using lowercase normalization and `String.includes()`.
- **Compound Filtering**: Seamlessly combines product name, category (exact match), and price range (min/max) filters.
- **Industrial-Grade Logic**: Handles edge cases such as empty inputs, non-numeric price values, and inverted price ranges (Min > Max).

## Performance for Millions of Records
To handle enterprise-scale datasets, I would swap the in-memory/simple-query logic for **Inverted Indexing** via a search engine like **Elasticsearch**. This offloads full-text search density from the database and supports advanced features like fuzzy matching and relevance scoring at sub-millisecond speeds.
