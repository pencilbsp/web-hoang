const fs = require('fs')


const codeFile = './src/code.txt'
if (!fs.existsSync(codeFile)) fs.writeFileSync(codeFile, '')

const chageCode = async (req, res) => {
    try {
      const code = req.query.code
      if (!code || code === '') return res.json({ success: false, message: 'Mã đăng nhập không hợp lệ' })

      const oldCode = fs.readFileSync(codeFile, 'utf8')

      if (oldCode === code) return res.json({ success: false, message: 'Mã đăng nhập mới phải khác mã cũ' })

      fs.writeFileSync(codeFile, code)
  
      return res.json({ success: true, message: `Mã đã thay đổi thành công thành ${code}` })
    } catch (error) {
      return res.json({ success: false, path, message: message || 'Đã xảy ra lỗi khi thay đổi mã đăng nhập' })
    }
  }
  
  module.exports = chageCode