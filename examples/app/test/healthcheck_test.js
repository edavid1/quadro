describe('healthcheck', function() {
  let httpTest
  beforeEach(function() {
    httpTest = QT.httpTest.get('/healthcheck')
  })

  it('responds to /healthcheck', async function() {
    await QT.httpTest
      .get('/healthcheck')
      .expect(200)
  })

  describe('healthcheck dependency', function() {
    it('returns 200 if .check() returns true', async function() {
      let run = this.sinon.stub().returns(true)
      Q.container.register('healthcheck', { run })
      await httpTest.expect(200)
    })

    it('returns 500 if .check() returns false', async function() {
      let run = this.sinon.stub().returns(false)
      Q.container.register('healthcheck', { run })
      await httpTest.expect(500)
    })

    it('returns 500 and message if .check() throws', async function() {
      let run = this.sinon.stub().throws(new Q.Errors.ValidationError('hello', { a: 1 }))
      Q.container.register('healthcheck', { run })

      let error = { message: 'hello', extra: { a: 1 } }
      await httpTest.expect(500, { error })
    })
  })
})
