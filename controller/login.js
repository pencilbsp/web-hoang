const dataType = {
  sgd: [
    '/images/login/1.jpeg',
    '/images/login/2.jpeg',
    '/images/login/3.jpeg',
    '/images/login/4.jpeg',
    '/images/login/5.jpeg',
    '/images/login/6.jpeg',
  ],
  games: [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg',
    '/images/img5.jpg',
    '/images/img6.jpg',
  ]
}

const login = async (req, res) => {
  try {
    const type = req.query.type
    if (type === 'games') return res.render('login', { data: dataType.games })

    return res.render('login', { data: dataType.sgd })
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
