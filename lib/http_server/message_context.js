module.exports = class MessageExtensions {
  constructor(ctx) {
    this.koaCtx = ctx
    this.envelope = ctx.request.body
    this.message = this.envelope.content
  }

  success(message, code) {
    if (message) this.koaCtx.message = message
    this.koaCtx.status = code || 200
  }

  failure(err, code) {
    if (err) {
      if (err instanceof Error) {
        this.koaCtx.body = err.message
      } else this.koaCtx.body = err
    }
    this.koaCtx.status = code || 500
  }

  retryAfterSec(seconds, message, code) {
    this.koaCtx.set('retry-after', seconds || 60)
    if (message) this.koaCtx.message = message
    this.koaCtx.status = code || 307
  }
}
