require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mainRouter = require('./server/routes/main');
const adminRouter = require('./server/routes/admin')

const app = express();
const PORT = 5000 || process.env.PORT;

// connect Database
const connectDb = require('./server/config/db');
connectDb();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));

// هذا يعني أنه سيتم تطبيقه على كل الطلبات الواردة إلى التطبيق Express في التطبيق middleware يستخدم هذا السطر كـ
app.use(expressLayout);
// Express يعين هذا السطر مسار التخطيط الرئيسي لتطبيق
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', mainRouter);
// admin لتي تبدأ بـ URL لجميع مسارات (./layout/admin) تُستخدم هذه الدالة لضمان استخدام ملف تخطيط مختلف
// يُسمح ذلك بإنشاء واجهة مستخدم مختلفة لمسؤولي التطبيق، مع الاحتفاظ بتصميم مختلف لبقية التطبيق
app.use('/admin', (req, res, next) => {
    res.locals.layout = './layout/admin';
    next();
});
app.use('/', adminRouter);

app.listen(PORT, () => {
    console.log(`App Listening On Port ${PORT}`);
});


