const Yup = require('yup')

const loginSchema = Yup.object().shape({
  code: Yup.string().required('Mã phần mềm không được bỏ trống'),
  username: Yup.string().required('Tên đăng nhập không được bỏ trống'),
  password: Yup.string().required('Mật khẩu không được bỏ trống'),
})

const login = async (req, res) => {
  try {
    await loginSchema.validate(req.body)
    const { code, password, username } = req.body

    if (code !== 'TEST') {
      return res.json({
        success: false,
        path: 'code',
        message: 'Mã phần mềm không hỗ trợ trên Phone, PC này của bạn, mời bạn nâng cấp gói phần mềm khác',
      })
    }

    return res.json({ success: true })
  } catch (error) {
    let message, path

    if (error?.errors) {
      path = error.path
      message = error.errors[0]
    }
    return res.json({ success: false, path, message: message || 'Đã xảy ra lỗi trong quá trình đăng nhập' })
  }
}

module.exports = login
