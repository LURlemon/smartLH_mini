"use strict";

function t(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function e(t) {
  var e;
  return e = t.detail.y, e - t.currentTarget.offsetTop < 150 && (e = t.currentTarget.offsetTop), e < 30 && (e += 70), e - 30
}
Component({
  data: {
    ctrl: {}
  },
  properties: {
    childs: Array,
    opts: Array
  },
  options: {
    addGlobalClass: !0
  },
  attached: function () {
    this.triggerEvent("add", this, {
      bubbles: !0,
      composed: !0
    })
  },
  detached: function () {
    this.root && this.root._edit === this && (this.root._edit = void 0)
  },
  methods: {
    editStart: function (e) {
      var r = this;
      if (this.data.opts[5]) {
        var i = e.currentTarget.dataset.i;
        this.data.ctrl["e" + i] ? (this.root._mask.pop(), this.root._maskTap(), this.setData(t({}, "ctrl.e" + i, 2)), setTimeout(function () {
          r.setData(t({}, "ctrl.e" + i, 3))
        }, 50)) : (this.setData(t({}, "ctrl.e" + i, 1)), setTimeout(function () {
          r.root._mask.push(function () {
            r.setData(t({}, "ctrl.e" + i, 0))
          })
        }, 50), this.root._edit = this, this.i = i, this.cursor = this.getNode(i).text.length)
      }
    },
    editInput: function (t) {
      var e = t.target.dataset.i,
        r = t.detail.value.replace(/ {2,}/, function (t) {
          for (var e = " ", r = 1; r < t.length; r++) e += " ";
          return e
        });
      this.root._editVal("nodes[" + (this.data.opts[7] + e).replace(/_/g, "].children[") + "].text", this.getNode(e).text, r), this.cursor = t.detail.cursor
    },
    editEnd: function (e) {
      var r = e.target.dataset.i;
      this.setData(t({}, "ctrl.e" + r, 0)), this.root.setData(t({}, "nodes[" + (this.data.opts[7] + r).replace(/_/g, "].children[") + "].text", e.detail.value.replace(/ {2}/g, "  "))), void 0 !== e.detail.cursor && (this.cursor = e.detail.cursor)
    },
    insert: function (t) {
      var e = this;
      setTimeout(function () {
        var r = e.i.split("_"),
          i = parseInt(r.pop()),
          s = r.join("_"),
          o = s ? e.getNode(s).children : e.data.childs,
          a = o.slice(0);
        if (a[i])
          if (a[i].text) {
            var n = a[i].text,
              c = [];
            e.cursor && c.push({
              type: "text",
              text: n.substring(0, e.cursor)
            }), c.push(t), e.cursor < n.length && c.push({
              type: "text",
              text: n.substring(e.cursor)
            }), a.splice.apply(a, [i, 1].concat(c))
          } else a.splice(i + 1, 0, t);
        else a.push(t);
        s = e.data.opts[7] + s, "_" === s[s.length - 1] && (s = s.slice(0, -1)), e.root._editVal("nodes" + (s ? "[" + s.replace(/_/g, "].children[") + "].children" : ""), o, a, !0), e.i = r.join("_") + "_" + (i + 1)
      }, 200)
    },
    remove: function (t) {
      var e = t.split("_"),
        r = e.pop(),
        i = e.join("_"),
        s = i ? this.getNode(i).children : this.data.childs,
        o = s.slice(0),
        a = o.splice(r, 1)[0];
      if ("img" === a.name || "video" === a.name || "audio" === a.name) {
        var n = a.attrs.src;
        a.src && (n = 1 === a.src.length ? a.src[0] : a.src), this.root.triggerEvent("remove", {
          type: a.name,
          src: n
        })
      }
      this.root._edit = void 0, this.root._maskTap(), i = this.data.opts[7] + i, "_" === i[i.length - 1] && (i = i.slice(0, -1)), this.root._editVal("nodes" + (i ? "[" + i.replace(/_/g, "].children[") + "].children" : ""), s, o, !0)
    },
    nodeTap: function (r) {
      var i = this;
      if (this.data.opts[5]) {
        if (this.root._lock) return;
        this.root._lock = !0, setTimeout(function () {
          i.root._lock = !1
        }, 50);
        var s = r.currentTarget.dataset.i,
          o = this.getNode(s);
        if (3 === this.data.ctrl["e" + this.i]) return;
        this.root._maskTap(), this.root._edit = this;
        var a = s.split("_"),
          n = parseInt(a.pop()),
          c = a.join("_"),
          h = c ? this.getNode(c).children : this.data.childs;
        if (this.setData(t({}, "ctrl.e" + s, 1)), this.root._mask.push(function () {
            i.setData(t({}, "ctrl.e" + s, 0))
          }), 1 === o.children.length && "text" === o.children[0].type) {
          var l = s + "_0";
          this.data.ctrl["e" + l] || (this.setData(t({}, "ctrl.e" + l, 1)), this.root._mask.push(function () {
            i.setData(t({}, "ctrl.e" + l, 0))
          }), this.cursor = o.children[0].text.length), this.i = l
        } else(this.i || "").includes(s) || (this.i = s + "_");
        var p = this.root._getItem(o, 0 !== n, n !== h.length - 1);
        this.root._tooltip({
          top: e(r),
          items: p,
          success: function (t) {
            if ("大小" === p[t]) {
              var a = o.attrs.style || "",
                l = a.match(/;font-size:([0-9]+)px/);
              l = l ? parseInt(l[1]) : 16, i.root._slider({
                min: 10,
                max: 30,
                value: l,
                top: e(r),
                changing: function (t) {
                  Math.abs(t - l) > 2 && (i.changeStyle("font-size", s, t + "px", l + "px"), l = r.detail.value)
                },
                change: function (t) {
                  t !== l && i.changeStyle("font-size", s, t + "px", l + "px"), i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.style", a, i.getNode(s).attrs.style)
                }
              })
            } else if ("上移" === p[t] || "下移" === p[t]) {
              var d = h.slice(0),
                u = d[n];
              "上移" === p[t] ? (d[n] = d[n - 1], d[n - 1] = u) : (d[n] = d[n + 1], d[n + 1] = u), c = i.data.opts[7] + c, "_" === c[c.length - 1] && (c = c.slice(0, -1)), i.root._editVal("nodes" + (c ? "[" + c.replace(/_/g, "].children[") + "].children" : ""), h, d, !0)
            } else if ("删除" === p[t]) i.remove(s);
            else {
              var g, f, _ = o.attrs.style || "",
                v = "",
                m = p[t];
              "斜体" === m ? (g = "font-style", f = "italic") : "粗体" === m ? (g = "font-weight", f = "bold") : "下划线" === m ? (g = "text-decoration", f = "underline") : "居中" === m ? (g = "text-align", f = "center") : "缩进" === m && (g = "text-indent", f = "2em"), v = _.includes(g + ":") ? _.replace(new RegExp(g + ":[^;]+"), "") : _ + ";" + g + ":" + f, i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.style", _, v, !0)
            }
          }
        })
      }
    },
    mediaTap: function (e) {
      var r = this;
      if (this.data.opts[5]) {
        var i = e.target.dataset.i,
          s = this.getNode(i),
          o = this.root._getItem(s);
        this.root._edit = this, this.i = i, this.root._tooltip({
          top: e.target.offsetTop - 30,
          items: o,
          success: function (e) {
            switch (o[e]) {
              case "封面":
                r.root.getSrc("img", s.attrs.poster || "").then(function (t) {
                  r.root._editVal("nodes[" + (r.data.opts[7] + i).replace(/_/g, "].children[") + "].attrs.poster", s.attrs.poster, t instanceof Array ? t[0] : t, !0)
                }).catch(function () {});
                break;
              case "删除":
                r.remove(i);
                break;
              case "循环":
              case "不循环":
                r.root.setData(t({}, "nodes[" + (r.data.opts[7] + i).replace(/_/g, "].children[") + "].attrs.loop", !s.attrs.loop)), wx.showToast({
                  title: "成功"
                });
                break;
              case "自动播放":
              case "不自动播放":
                r.root.setData(t({}, "nodes[" + (r.data.opts[7] + i).replace(/_/g, "].children[") + "].attrs.autoplay", !s.attrs.autoplay)), wx.showToast({
                  title: "成功"
                })
            }
          }
        }), this.root._lock = !0, setTimeout(function () {
          r.root._lock = !1
        }, 50)
      }
    },
    changeStyle: function (e, r, i, s) {
      var o = this.getNode(r).attrs.style || "";
      o.includes(";" + e + ":" + s) ? o = o.replace(";" + e + ":" + s, ";" + e + ":" + i) : o += ";" + e + ":" + i, this.root.setData(t({}, "nodes[" + (this.data.opts[7] + r).replace(/_/g, "].children[") + "].attrs.style", o))
    },
    noop: function () {},
    getNode: function (t) {
      try {
        for (var e = t.split("_"), r = this.data.childs[e[0]], i = 1; i < e.length; i++) r = r.children[e[i]];
        return r
      } catch (t) {
        return {
          text: "",
          attrs: {},
          children: []
        }
      }
    },
    play: function (t) {
      if (this.root.triggerEvent("play"), this.root.data.pauseVideo) {
        for (var e = !1, r = t.target.id, i = this.root._videos.length; i--;) this.root._videos[i].id === r ? e = !0 : this.root._videos[i].pause();
        if (!e) {
          var s = wx.createVideoContext(r, this);
          s.id = r, this.root._videos.push(s)
        }
      }
    },
    imgTap: function (r) {
      var i = this;
      if (this.data.opts[5]) {
        var s = r.target.dataset.i,
          o = this.getNode(s),
          a = this.root._getItem(o);
        this.root._edit = this, this.i = s, this.root._maskTap(), this.setData(t({}, "ctrl.e" + s, 1)), this.root._mask.push(function () {
          i.setData(t({}, "ctrl.e" + s, 0))
        }), this.root._tooltip({
          top: e(r),
          items: a,
          success: function (n) {
            if ("换图" === a[n]) i.root.getSrc("img", o.attrs.src || "").then(function (t) {
              i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.src", o.attrs.src, t instanceof Array ? t[0] : t, !0)
            }).catch(function () {});
            else if ("宽度" === a[n]) {
              var c = o.attrs.style || "",
                h = c.match(/max-width:([0-9]+)%/);
              h = h ? parseInt(h[1]) : 100, i.root._slider({
                min: 0,
                max: 100,
                value: h,
                top: e(r),
                changing: function (t) {
                  Math.abs(t - h) > 5 && (i.changeStyle("max-width", s, t + "%", h + "%"), h = t)
                },
                change: function (t) {
                  t !== h && (i.changeStyle("max-width", s, t + "%", h + "%"), h = t), i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.style", c, i.getNode(s).attrs.style)
                }
              })
            } else "超链接" === a[n] ? i.root.getSrc("link", o.a ? o.a.href : "").then(function (t) {
              if (o.a) i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].a.href", o.a.href, t, !0);
              else {
                var e = {
                  name: "a",
                  attrs: {
                    href: t
                  },
                  children: [o]
                };
                o.a = e.attrs, i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "]", o, e, !0)
              }
              wx.showToast({
                title: "成功"
              })
            }).catch(function () {}) : "预览图" === a[n] ? i.root.getSrc("img", o.attrs["original-src"] || "").then(function (t) {
              i.root._editVal("nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.original-src", o.attrs["original-src"], t instanceof Array ? t[0] : t, !0), wx.showToast({
                title: "成功"
              })
            }).catch(function () {}) : "删除" === a[n] ? i.remove(s) : (i.root.setData(t({}, "nodes[" + (i.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.ignore", !o.attrs.ignore)), wx.showToast({
              title: "成功"
            }))
          }
        }), this.root._lock = !0, setTimeout(function () {
          i.root._lock = !1
        }, 50)
      } else {
        var n = this.getNode(r.target.dataset.i);
        if (n.a) return this.linkTap(n.a);
        if (n.attrs.ignore) return;
        if (this.root.triggerEvent("imgtap", n.attrs), this.root.data.previewImg) {
          var c = this.root.imgList[n.i];
          wx.previewImage({
            showmenu: this.root.data.showImgMenu,
            current: c,
            urls: this.root.imgList
          })
        }
      }
    },
    imgLoad: function (e) {
      var r = this;
      this.data.opts[5] && setTimeout(function () {
        var e = r.getNode(s).attrs.id || "n" + s;
        wx.createSelectorQuery().in(r).select("#" + e).boundingClientRect().exec(function (e) {
          r.setData(t({}, "ctrl.h" + s, e[0].height))
        })
      }, 50);
      var i, s = e.target.dataset.i,
        o = this.getNode(s);
      if (o.w)(this.data.opts[1] && !this.data.ctrl[s] || -1 === this.data.ctrl[s]) && (i = 1);
      else if (i = e.detail.width, this.data.opts[5]) {
        var a = {},
          n = "nodes[" + (this.data.opts[7] + s).replace(/_/g, "].children[") + "].attrs.";
        i < 150 && (a[n + "ignore"] = "T"), a[n + "width"] = i.toString(), this.root.setData(a)
      }
      i && this.setData(t({}, "ctrl." + s, i))
    },
    linkTap: function (t) {
      var r = this;
      if (this.data.opts[5]) {
        var i = t.currentTarget.dataset.i,
          s = this.getNode(i),
          o = this.root._getItem(s);
        this.root._tooltip({
          top: e(t),
          items: o,
          success: function (t) {
            "更换链接" === o[t] ? r.root.getSrc("link", s.attrs.href).then(function (t) {
              r.root._editVal("nodes[" + (r.data.opts[7] + i).replace(/_/g, "].children[") + "].attrs.href", s.attrs.href, t, !0), wx.showToast({
                title: "成功"
              })
            }).catch(function () {}) : r.remove(i)
          }
        })
      } else {
        var a = t.currentTarget ? this.getNode(t.currentTarget.dataset.i) : {},
          n = a.attrs || t,
          c = n.href;
        this.root.triggerEvent("linktap", Object.assign({
          innerText: this.root.getText(a.children || [])
        }, n)), c && ("#" === c[0] ? this.root.navigateTo(c.substring(1)).catch(function () {}) : c.split("?")[0].includes("://") ? this.root.data.copyLink && wx.setClipboardData({
          data: c,
          success: function () {
            return wx.showToast({
              title: "链接已复制"
            })
          }
        }) : wx.navigateTo({
          url: c,
          fail: function () {
            wx.switchTab({
              url: c,
              fail: function () {}
            })
          }
        }))
      }
    },
    mediaError: function (e) {
      var r = e.target.dataset.i,
        i = this.getNode(r);
      if ("video" === i.name || "audio" === i.name) {
        var s = (this.data.ctrl[r] || 0) + 1;
        if (s > i.src.length && (s = 0), s < i.src.length) return this.setData(t({}, "ctrl." + r, s))
      } else "img" === i.name && this.data.opts[2] && this.setData(t({}, "ctrl." + r, -1));
      this.root && this.root.triggerEvent("error", {
        source: i.name,
        attrs: i.attrs,
        errMsg: e.detail.errMsg
      })
    }
  }
});