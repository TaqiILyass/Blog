const Post = require("../models/post");
const User = require('../models/user')

const blog_all = async(req, res) => {
    
    try {
        const locals = { title: "NodeJs Blog" }
        let perPage = 5
        // هذا يضمن أنه إذا لم يحدد العميل رقم الصفحة، فإن السلوك الافتراضي هو افتراض الصفحة الأولى
        let page = req.query.page || 1

        const data = await Post.aggregate([
            { $sort: { createdAt: -1 } },
            // تخطي عدد معين من السجلات للوصول إلى الصفحة التالية
            { $skip: (perPage * page) - perPage },
            { $limit: perPage }
        ]);

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        // مضمنة تقوم بإرجاع أصغر عدد صحيح أكبر من أو يساوي رقمًا محددًا js هذه دالة
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch(err) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Error fetching blog');
    }
}

const blog_details = async(req, res) => {

    try {
        const slug = req.params.id
        const data = await Post.findById({ _id: slug })
        const locals = { title: data.title }

        res.render('details', { locals, data });
    } catch (error) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Error fetching blog');
    }

}

const blog_search = async(req, res) => {
    try {
        const locals = { title: "search" }

        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
        
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        })

        res.render('search', { locals, data });
    } catch (error) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Error fetching blog');
    }
}

const blog_admin = async(red, res) => {
    try {
        const locals = {title: 'Admin'}  
        res.render('admin/index', { locals })  
    } catch (error) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Error fetching blog');
    }
}


module.exports = {
    blog_all, 
    blog_details,
    blog_search,
    blog_admin
}
