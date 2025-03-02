const express = require('express');
const router = express.Router();
const db = require('../database/dataconnect');


// Get one product
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await db.execute("SELECT * FROM PRODUCT WHERE id = ?", [id]);
        const [product, info] = data;
        res.json({
            status: 'success',
            message: 'GET ONE PRODUCT SUCCESSFULLY !!!',
            data: product,
        })
    }catch(err){
        console.log(err);
        res.status(404).json(err);
    }
});

//get all products
router.get('/', async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM PRODUCT");
        res.json({
            status: 'success',
            message: 'GET ALL PRODUCT SUCCESSFULLY !!!',
            data: data[0],
        })
    }catch(err){
        res.status(404).json(err);
    }
})

// Create new product
router.post("/", async (req, res) => {
    const { productName, status, listing, tags, comments } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction(); // Bắt đầu transaction

        
        const [productResult] = await connection.execute(
            "INSERT INTO Product (productName, status) VALUES (?, ?)",
            [productName, status]
        );
        const productId = productResult.insertId; // Lấy ID vừa thêm

  
        if (listing) {
            await connection.execute(
                "INSERT INTO Listing (product_id, description, price, rate) VALUES (?, ?, ?, ?)",
                [productId, listing.description, listing.price, listing.rate]
            );
        }

    
        if (tags && tags.length > 0) {
            for (const tag of tags) {
                let [tagResult] = await connection.execute(
                    "SELECT tagId FROM Tags WHERE tagName = ?",
                    [tag.tagName]
                );

                let tagId;
                if (tagResult.length > 0) {
                    tagId = tagResult[0].tagId;
                } else {
                    const [newTag] = await connection.execute(
                        "INSERT INTO Tags (tagName) VALUES (?)",
                        [tag.tagName]
                    );
                    tagId = newTag.insertId;
                }

                await connection.execute(
                    "INSERT INTO ProductTags (product_id, tagId) VALUES (?, ?)",
                    [productId, tagId]
                );
            }
        }

        
        if (comments && comments.length > 0) {
            for (const comment of comments) {
                await connection.execute(
                    "INSERT INTO Comments (content, product_id) VALUES (?, ?)",
                    [comment.content, productId]
                );
            }
        }

        await connection.commit(); // Lưu thay đổi
        res.status(201).json({ message: "Product added successfully!", productId });

    } catch (error) {
        await connection.rollback(); // Nếu có lỗi, hoàn tác transaction
        res.status(500).json({ error: error.message });
    } finally {
        connection.release(); // Giải phóng kết nối
    }
});

// Update product
router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const { productName, status, listing, tags, comments } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction(); // Bắt đầu transaction

        // 1️⃣ Cập nhật bảng Product
        await connection.execute(
            "UPDATE Product SET productName = ?, status = ? WHERE id = ?",
            [productName, status, productId]
        );

        // 2️⃣ Cập nhật bảng Listing
        if (listing) {
            await connection.execute(
                "UPDATE Listing SET description = ?, price = ?, rate = ? WHERE product_id = ?",
                [listing.description, listing.price, listing.rate, productId]
            );
        }

        // 3️⃣ Cập nhật Tags & ProductTags
        if (tags && tags.length > 0) {
            await connection.execute("DELETE FROM ProductTags WHERE product_id = ?", [productId]); // Xóa tag cũ

            for (const tag of tags) {
                let [tagResult] = await connection.execute(
                    "SELECT tagId FROM Tags WHERE tagName = ?",
                    [tag.tagName]
                );

                let tagId;
                if (tagResult.length > 0) {
                    tagId = tagResult[0].tagId;
                } else {
                    const [newTag] = await connection.execute(
                        "INSERT INTO Tags (tagName) VALUES (?)",
                        [tag.tagName]
                    );
                    tagId = newTag.insertId;
                }

                await connection.execute(
                    "INSERT INTO ProductTags (product_id, tagId) VALUES (?, ?)",
                    [productId, tagId]
                );
            }
        }

        // 4️⃣ Cập nhật Comments
        if (comments && comments.length > 0) {
            await connection.execute("DELETE FROM Comments WHERE product_id = ?", [productId]); // Xóa comments cũ

            for (const comment of comments) {
                await connection.execute(
                    "INSERT INTO Comments (content, product_id) VALUES (?, ?)",
                    [comment.content, productId]
                );
            }
        }

        await connection.commit(); // Lưu thay đổi
        res.status(200).json({ message: "Product updated successfully!", productId });

    } catch (error) {
        await connection.rollback(); // Nếu có lỗi, hoàn tác transaction
        res.status(500).json({ error: error.message });
    } finally {
        connection.release(); // Giải phóng kết nối
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let 
    } catch(err){

    }
});

module.exports = router;