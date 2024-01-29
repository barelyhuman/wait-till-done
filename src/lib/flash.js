import { format } from "util";

export function flashMiddleware() {
  return async (ctx, next) => {
    if (ctx.flash) await next();
    ctx.flash = flash(ctx);
    await next();
  };
}

function flash(ctx) {
  return (type, msg, ...args) => {
    if (ctx.session === undefined) throw Error("flash() requires sessions");
    var msgs = (ctx.session.flash = ctx.session.flash || {});
    if (type && msg) {
      // util.format is available in Node.js 0.6+
      if (arguments.length > 2 && format) {
        const _args = Array.prototype.slice.call(args, 1);
        msg = format.apply(undefined, _args);
      } else if (Array.isArray(msg)) {
        msg.forEach(function (val) {
          (msgs[type] = msgs[type] || []).push(val);
        });
        return msgs[type].length;
      }
      return (msgs[type] = msgs[type] || []).push(msg);
    } else if (type) {
      var arr = msgs[type];
      delete msgs[type];
      return arr || [];
    } else {
      ctx.session.flash = {};
      return msgs;
    }
  };
}
