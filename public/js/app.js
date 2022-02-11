async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

;(() => {
  const form = document.getElementById('login-form')
  const progressElm = document.getElementById('progress')
  const submitBtn = document.getElementById('submit-btn')
  const alertElm = document.getElementById('process-alert')
  const codeMessage = document.getElementById('code-invalid')
  const codeElm = document.querySelector("input[name='code']")
  const defaultCodeMessage = 'Mã phần mềm không được bỏ trống'
  const defaultAlertMessage = 'Hệ thống đang xử lý, vui lòng chờ trong ít phút...'

  form.addEventListener(
    'submit',
    async (event) => {
      try {
        event.preventDefault()
        codeElm.setCustomValidity('')
        alertElm.style.display = 'none'
        alertElm.textContent = defaultAlertMessage
        codeMessage.textContent = defaultCodeMessage
        if (!form.checkValidity()) event.stopPropagation()

        const values = form.elements
        const code = values['code'].value
        const password = values['password'].value
        const username = values['username'].value

        if (!code || !password || !username) {
          return form.classList.add('was-validated')
        } else {
          submitBtn.disabled = true
          const urlSearchParams = new URLSearchParams(window.location.search)
          const params = Object.fromEntries(urlSearchParams.entries())
          const data = await postData('/api/login', { code, password, username, appName: params.app })

          if (!data.success) {
            submitBtn.disabled = false
            codeMessage.textContent = data.message
            codeElm.setCustomValidity('code-invalid')
            form.classList.add('was-validated')
          } else {
            let percent = 0
            alertElm.style.display = 'block'
            progressElm.style.display = 'flex'
            const node = progressElm.firstElementChild
            const interval = setInterval(() => {
              percent = percent + 10
              if (percent > 100) {
                clearInterval(interval)
                submitBtn.disabled = false
                progressElm.style.display = 'none'
                alertElm.textContent = 'Tải về thành công. Vui lòng kích hoạt mã để tool hiển thị.'
                return node.classList.remove('progress-bar-animated')
              } else node.style.width = `${percent}%`
            }, 500)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    false
  )
})()
