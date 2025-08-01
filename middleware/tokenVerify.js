const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // جلب التوكن من الهيدر
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  // استخراج التوكن من الهيدر
  const token = authHeader.split(" ")[1];

  try {
    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // حفظ البيانات المفكوكة داخل req.user لاستخدامها لاحقًا
    req.user = decoded;

    next(); // متابعة الراوت
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;