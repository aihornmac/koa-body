return async function (ctx, next){
    var body = {};
    // so don't parse the body in strict mode
    if (!opts.strict || ["GET", "HEAD", "DELETE"].indexOf(ctx.method.toUpperCase()) === -1) {
      if (ctx.is('json'))  {
        body = await buddy.json(ctx, {encoding: opts.encoding, limit: opts.jsonLimit});
      }
      else if (ctx.is('urlencoded')) {
        body = await buddy.form(ctx, {encoding: opts.encoding, limit: opts.formLimit});
      }
      else if (ctx.is('text')) {
        body = await buddy.text(ctx, {encoding: opts.encoding, limit: opts.textLimit});
      }
      else if (opts.multipart && ctx.is('multipart')) {
        body = await formy(ctx, opts.formidable);
      }
    }

    if (opts.patchNode) {
      ctx.req.body = body;
    }
    if (opts.patchKoa) {
      ctx.request.body = body;
    }
    await next();
  };
