import mongoose from "mongoose";

// creating and saving 
// create an schema for the books library - schema - structural design of a document withing collection
const bookschema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishYear: { type: Number, required: true, default: 1999 }
    },
    {
        timestamps: true, // creates two default variable created at and updated at
    }
);

export const Book= mongoose.model('Book', bookschema); // this is used to create documents( rows ) in a collection (table) books which has different methods to interact with the schema bookchema , like save, find, delete , etc etc
// imagine this as creating a class BOOk which is used to ineract with document of type schema and it has methods save, find, delete




// Note on mongodb
/*### ✅ **MongoDB Terms - Detailed Notes**  

- **Schema:**  
  - Blueprint for documents in a collection.  
  - Defines structure, data types, validation rules, and constraints.  
  - Example: `{ title: String, author: String, publishedYear: Number }`  
  - Mongoose Schema Options:  
    - `type`: Specifies data type (String, Number, Boolean, Array, Object).  
    - `required`: Ensures the field is mandatory.  
    - `default`: Sets a default value if not provided.  
    - `timestamps: true`: Automatically adds `createdAt` and `updatedAt` fields.  
    - `unique`: Ensures field values are unique in the collection.  

- **Model:**  
  - Wrapper around the schema for interacting with MongoDB.  
  - Provides CRUD methods:  
    - `.create()`, `.find()`, `.findById()`, `.updateOne()`, `.deleteOne()`  
  - Automatically maps to a collection name (lowercase, pluralized).  

- **Collection:**  
  - Stores multiple documents with flexible structures.  
  - Created automatically when first document is inserted.  
  - Best practice: Keep consistent document structure.  

- **Document:**  
  - Single JSON-like object in a collection.  
  - BSON format (Binary JSON) internally in MongoDB.  
  - Each document has a unique `_id` field, automatically generated if not provided.  
  - Supports nested objects and arrays.  

- **Relationships in MongoDB:**  
  - **Embedded Documents:** Store related data within the same document.  
  - **References (Normalization):** Store references using ObjectIDs for efficient storage.  

- **Advantages of Mongoose:**  
  - Schema-based validation and data consistency.  
  - Middleware support for pre/post-processing.  
  - In-built query handling and chaining methods.  

- **CRUD Operations:**  
  - Create: `model.create()` or `new model().save()`  
  - Read: `model.find()`, `model.findOne()`  
  - Update: `model.updateOne()`, `model.findByIdAndUpdate()`  
  - Delete: `model.deleteOne()`, `model.findByIdAndDelete()`  

- **Aggregation Framework:**  
  - Performs complex data analysis and transformation.  
  - Supports filtering, grouping, sorting, and projections.  

- **Indexes in MongoDB:**  
  - Optimize query performance by indexing fields.  
  - Supports single-field, compound, and text indexes.  

This should give you a comprehensive understanding of MongoDB terms! Let me know if you'd like more details on any topic! */