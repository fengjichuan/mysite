(function(a, b) {
	var c = window[b];
	c.global = {
		default_nick : "搜狐网友",
		default_face_url : "http://js2.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif",
		default_profile_url : "http://i.sohu.com",
		$ : function() {
			var b = null, c = arguments, d = c[0], e = c[1], f = c[2];
			try {
				b = typeof d == "string" ? document.getElementById(d) : d;
				if (d) {
					var g = f ? a(f)[0] : a(document.body)[0], h = [];
					a(g.getElementsByTagName("*")).each(function(b, c) {
						a(c).attr("id") == d && h.push(c)
					}), b = a(h)
				}
			} catch(b) {
			}
			return a(b)
		},
		parseuid : function(a) {
			if ( typeof a != "string")
				return "";
			return a.split("|").length > 1 ? a.split("|")[1] : a
		},
		friendmap : {},
		groupmap : {},
		getFriendGroup : function(a) {
			if ( typeof a != "string")
				return "";
			return this.groupmap[a]
		},
		listmap : function(b) {
			if (!a.isArray(b))
				return !1;
			var c = this;
			a.each(b, function(a, b) {
				c.friendmap[b.uid] = b.nick
			})
		},
		getNick : function(a) {
			if ( typeof a != "string")
				return "";
			a = this.parseuid(a);
			var b = this.friendmap[a];
			return b ? b : this.getNickByUid(a)
		},
		getNickByUid : function(a) {
			if ( typeof a != "string")
				return "";
			a = this.parseuid(a);
			return a.split("@")[0]
		},
		msgNumber : 0,
		msgCache : {},
		getMsgCache : function(a) {
			a = this.parseuid(a);
			var b = this.msgCache[a];
			return b ? b : []
		},
		setMsgCache : function(a, b) {
			a = this.parseuid(a), this.msgCache[a] || (this.msgCache[a] = []), this.msgCache[a] = this.msgCache[a].concat(b)
		},
		clearMsgCache : function(a) {
			a = this.parseuid(a), this.msgCache[a] && (this.msgCache[a] = null,
			delete this.msgCache[a])
		},
		interval_ids : {},
		scroll : function(b, c) {
			var d = !1, e = a(document).scrollTop(), d = setInterval(function() {
				var f = a(document).scrollTop();
				!d && e != f && ( d = !0, typeof b == "function" && b()), d && e == f && ( d = !1, typeof c == "function" && c()), e = f
			}, 100);
			a(window).bind("scroll", function(a) {
				d || (b(), d = !0)
			})
		},
		getScrollTop : function() {
			var a = 0;
			document.documentElement && document.documentElement.scrollTop ? a = document.documentElement.scrollTop : document.body && ( a = document.body.scrollTop);
			return a
		},
		isIE : function() {
			var b = a.browser.msie, c = a.browser.version;
			parseInt(c) > 7 && ( b = !1);
			return b
		},
		setCookie : function(a, b) {
			var c = 1, d = new Date;
			d.setTime(d.getTime() + c * 24 * 60 * 60 * 1e3), document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString()
		},
		getCookie : function(a) {
			var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
			if (b != null)
				return unescape(b[2]);
			return null
		},
		delCookie : function(a) {
			var b = new Date;
			b.setTime(b.getTime() - 1);
			var c = this.getCookie(a);
			c != null && (document.cookie = a + "=" + c + ";expires=" + b.toGMTString())
		}
	}
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
(function(a, b) {
	var c = window[b], d = {};
	c.loginClass = {
		initEls : function() {
			d.account = a("#webim_account"), d.password = a("#webim_password"), d.submit = a("#webim_submit"), d.cancel = a("#webim_cancel")
		},
		init : function() {
			this.checklogin() && this.loginDispatch(null, "0")
		},
		initEvent : function() {
			var b = this;
			a("button").bind("click", function(a) {
				b.checklogin() ? b.loginDispatch(null, 0) : (console.log("你还没登陆passport，请先登录"), window.location = "http://passport.sohu.com")
			})
		},
		checklogin : function() {
			try {
				return document.cookie.indexOf("ppinf") >= 0
			} catch(a) {
				return !1
			}
		},
		loginDispatch : function(b, d) {
			if (c.global.getCookie("imoffline") == "0")
				a(document.body).append(c.friendListClass.wrapperHTML.join(c.friendListClass.myFriendsGroup)), c.friendListClass.eventSetStatus(), c.friendListClass.eventFriendList(), c.chatClass.bindEventFunction();
			else {
				var e = this;
				c.uid = c.productPars.productid + "|" + b, a.ajax({
					url : "http://d.me.sohu.com/login",
					data : {
						productid : c.productPars.productid,
						time : (new Date).getTime()
					},
					dataType : "jsonp",
					scriptCharset : c.charSet,
					success : function(a) {
						e.loginDispatchCallback(a, d)
					}
				})
			}
		},
		loginDispatchCallback : function(a, b) {
			a.status ? (c.prefix = a.msg.prefix, c.friendListClass.loginNotification(b)) : console.log("注册dispatch失败!")
		},
		logoutEvent : function() {
		}
	}
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
(function(a, b) {
	var c = window[b], d = c.global;
	c.friendListClass = {
		cache : [],
		data : {},
		foldgroups : [],
		notifycode : 0,
		onlinenum : 0,
		wrapperHTML : ["<div class=\"sohuwebim-box\"><div class=\"sohuwebim-list-wrap\" style=\"display:none;\"><div class=\"sohuwebim-list-mod\"><div class=\"sohuwebim-title\"><div class=\"sohuwebim-status-ico sohuwebim-change-status-area\"><div class=\"sohuwebim-status-set sohuwebim-change-status-box\" style=\"display:none;\"><ul><li notify=\"1\"><a href=\"javascript:void(0);\"><span><i class=\"sohuwebim-status-online\"></i></span><span class=\"txt\">在线</span></a></li><li notify=\"2\"><a href=\"javascript:void(0);\"><span><i class=\"sohuwebim-status-busy\"></i></span><span class=\"txt\">忙碌</span></a></li><li notify=\"3\"><a href=\"javascript:void(0);\"><span><i class=\"sohuwebim-status-away\"></i></span><span class=\"txt\">离开</span></a></li><li class=\"last\" notify=\"0\"><a href=\"javascript:void(0);\"><span><i class=\"sohuwebim-status-offline\"></i></span><span class=\"txt\">离线</span></a></li></ul></div><span class=\"sohuwebim-my-status\"><span><i class=\"sohuwebim-status-offline\"></i></span><span class=\"txt\">离线</span></span><span><i class=\"sohuwebim-status-unfold\"></i></span></div><div class=\"sohuwebim-setting\"><span class=\"sohuwebim-btns\"><a href=\"javascript:void(0);\"><i class=\"unfold\"></i></a></span></div></div><div class=\"sohuwebim-list-team\"><div class=\"sohuwebim-list-offline-shadow\"></div><div class=\"sohuwebim-list-team-box\">", "</div></div></div></div><div class=\"sohuwebim-min-wrap\"><div class=\"sohuwebim-min-com sohuwebim-status\"><div class=\"sohuwebim-status-ico sohuwebim-my-status\"><i class=\"sohuwebim-status-offline\"></i></div><div class=\"sohuwebim-status-total\"><span class=\"sohuwebim-min-btns\"><a href=\"javascript:void(0);\"><i class=\"fold\"></i></a></span>在线聊天(<span class=\"sohuwebim-online-number\">0</span>)</div></div></div></div>"],
		myFriendsGroup : "<div class=\"sohuwebim-list-group \"><div class=\"sohuwebim-list-group-title\"><i groupid=\"0\" class=\"sohuwebim-group-box-area name-fold\"></i>我的好友(0)</div><ul class=\"sohuwebim-group-box-item-0\"></ul></div>",
		ranLocation : function() {
			c.location = parseInt(Math.random() * 1e7)
		},
		loginNotification : function(b) {
			var e = c.prefix + "login", f = {
				productid : c.productPars.productid,
				location : c.location
			}, g = this;
			b && (f.login_status = b), a.ajax({
				url : e,
				data : f,
				dataType : "jsonp",
				scriptCharset : c.charSet,
				success : function(a) {
					if (a.status) {
						g.loginNotificationCallback(a);
						var b = d.getCookie("imchat");
						b && a.msg.online && a.msg.online.length > 0 && g.drawChatWindow(b, a), d.listmap(a.msg.friends), d.groupmap = a.msg.groupRelation;
						var c = setTimeout(function() {
							clearTimeout(c), c = null, g.listenMessage()
						}, 2e3)
					} else
						console.log("注册notification失败！")
				}
			})
		},
		showProfile : function() {
			var b = a(".sohu-webim-friend-list-profile"), e = c.uid.split("|")[1];
			b.find(".u-name span").html(d.getNickByUid(e)), b.find(".user-uid span").html(e), this.initNotify(), this.initTitle()
		},
		rebuildList : function(b) {
			var c = b.msg.groups, d = b.msg.friends;
			if (!a.isArray(c) || !a.isArray(d))
				return !1;
			var e = 0, f = [], g = function(b) {
				if (a.isArray(b)) {
					b.sort(function(a, b) {
						return a.status >= b.status
					});
					var c = [], d = b.length;
					for (var e = 0; e < d; ) {
						if (!b[e])
							break;
						b[e].status == 0 ? c.push(b.splice(e,1)[0]) : e++
					}
					b = b.concat(c);
					return b
				}
			}, h = function(b) {
				var c = !1;
				a.each(b, function(a, b) {
					b[0] == 0 && ( c = !0)
				});
				return c
			};
			h(c) || c.unshift([0, "我的好友"]), a.each(c, function(b, c) {
				gobj = {
					gid : c[0],
					gname : c[1],
					glist : [],
					goffline : 0
				}, a.each(d, function(a, b) {
					if (!b.group || b.group < 0)
						b.group = 0;
					b.group == gobj.gid && (gobj.glist.push(b), (!b.status || b.status == 0) && gobj.goffline++)
				}), gobj.glist = g(gobj.glist), gobj.gnum = gobj.glist.length, f.push(gobj)
			});
			return f
		},
		refreshFriend : function(b) {
			var c = b.uid, d = b.nick, e = b.face_url, f = b.profile_url, g = b.status, h = b.group, i = this;
			a.inArray(c, this.data.msg.online) != -1 ? a.each(this.data.msg.friends, function(b, d) {
				if (d.uid == c) {
					if (g != 0) {
						i.data.msg.friends[b].status = g;
						return !1
					}
					i.data.msg.online.splice(a.inArray(c, i.data.msg.online), 1), i.data.msg.friends.splice(b, 1);
					return !1
				}
			}) : g != 0 && (this.data.msg.friends.push(b), this.data.msg.online.push(c))
		},
		resetData : function(b, c) {
			var d = this, e = d.data.msg;
			a.each(e.friends, function(a, d) {
				d.uid == b && (d.status = c)
			})
		},
		loginNotificationCallback : function(b) {
			b && (this.data = b), this.cache = this.rebuildList(this.data), this.drawMainPanel(this.cache);
			var c = a(".sohuwebim-box .sohuwebim-my-status"), d = b.msg.lastLoginStatus ? b.msg.lastLoginStatus : 1;
			c.find("i").removeClass().addClass("sohuwebim-status-" + this.notifylist[d].status), c.find(".txt").html(this.notifylist[d].txt), this.notifycode = d
		},
		drawMainPanel : function(b) {
			if (a(".sohuwebim-box .sohuwebim-list-team-box").length > 0) {
				a(".sohuwebim-box .sohuwebim-list-team-box").html(this.drawFriendList(b)), a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-online-number").html(this.onlinenum);
				return !1
			}
			this.eventSetStatus(), this.eventFriendList(), c.chatClass.bindEventFunction(), a(document.body).append(this.wrapperHTML.join(this.drawFriendList(b))), a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-online-number").html(this.onlinenum)
		},
		drawFriendList : function(b) {
			var e = [], f = this;
			f.onlinenum = 0, a.each(b, function(b, g) {
				var h = b != 0 && parseInt(g.gnum) === 0 ? "style=\"display: none;\"" : "", i = a.inArray(g.gid, c.friendListClass.foldgroups) >= 0 ? "name-unfold" : "name-fold", j = a.inArray(g.gid, c.friendListClass.foldgroups) >= 0 ? "style=\"display: none;\"" : "", k = "<div class=\"sohuwebim-list-group \"" + h + "><div class=\"sohuwebim-list-group-title\"><i class=\"sohuwebim-group-box-area " + i + "\" groupid=\"" + g.gid + "\"></i>" + g.gname + "(<span>" + g.gnum + "</span>)</div><ul class=\"sohuwebim-group-box-item-" + g.gid + "\" " + j + ">", l = [];
				f.onlinenum += g.gnum, a.each(g.glist, function(b, c) {
					var e = "", g = a.trim(c.face_url) ? c.face_url : d.default_face_url;
					c.status == 0 && ( e = "sohuwebim-offline-shadow"), l.push("<li id=\"sohu_webim_f_item_" + c.uid + "\" nick=\"" + c.nick + "\" status=\"" + c.status + "\" userid=\"" + c.uid + "\" title=\"" + c.nick + "\" initchat=\"0\" profile=\"" + c.profile_url + "\"><div class=\"" + e + "\"></div><div class=\"group-pic\"><div class=\"group-status-box\"><i class=\"sohuwebim-status-" + f.notifylist[c.status].status + "\"></i></div><img src=\"" + g + "\" /></div><div class=\"name\"><div style=\"overflow:hidden;\">" + c.nick + "</div></div></li>")
				}), k = k + l.join("") + "</ul></div>", e.push(k)
			});
			return e.join("")
		},
		drawChatWindow : function(b, e) {
			var f = a.inArray(b, e.msg.online);
			if (f < 0)
				d.delCookie("imchat");
			else {
				var g = {
					tuid : e.msg.friends[f].uid,
					nick : e.msg.friends[f].nick,
					status : e.msg.friends[f].status,
					imgsrc : a.trim(e.msg.friends[f].face_url) ? e.msg.friends[f].face_url : d.default_face_url,
					profile : e.msg.friends[f].profile_url,
					focus : !0
				};
				c.chatClass.showChatWindow(g, "hide"), a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-chat").show()
			}
		},
		eventSetStatus : function() {
			a(document).delegate(".sohuwebim-box .sohuwebim-change-status-area", "click", function(b) {
				b.preventDefault(), a(".sohuwebim-change-status-box").is(":hidden") ? a(".sohuwebim-change-status-box").fadeIn(100) : a(".sohuwebim-change-status-box").fadeOut(100)
			}).delegate(".sohuwebim-box .sohuwebim-setting", "click", function(b) {
				a(".sohuwebim-change-status-box").fadeOut(100)
			})
		},
		listUnfold : function() {
			a(".sohuwebim-box .sohuwebim-list-wrap").hide(), a(".sohuwebim-box .sohuwebim-status").show()
		},
		listFold : function() {
			a(".sohuwebim-box .sohuwebim-status").hide(), a(".sohuwebim-box .sohuwebim-list-wrap").show()
		},
		eventFriendList : function() {
			var b = this;
			a(document).delegate(".sohuwebim-box .sohuwebim-list-wrap .sohuwebim-setting", "click", function(c) {
				a(".sohuwebim-box .sohuwebim-change-status-box").hide(), b.listUnfold()
			}).delegate(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-status-total", "click", function(a) {
				b.listFold()
			}).delegate(".sohuwebim-box", "click", function(a) {
				a.stopPropagation()
			}).delegate("body", "click", function(d) {
				a(".sohuwebim-box .sohuwebim-change-status-box").hide(), c.chatClass.foldChatWindow(), b.listUnfold()
			}), this.initNotify(), a("body").delegate(".sohuwebim-box .sohuwebim-list-team-box li", "mouseover", function(b) {
				a(this).addClass("item-hover")
			}).delegate(".sohuwebim-box .sohuwebim-list-team-box li", "mouseout", function(b) {
				a(this).removeClass("item-hover")
			}).delegate(".sohuwebim-box .sohuwebim-list-team-box li", "click", function(b) {
				var d = a(this);
				if (d) {
					var e = {
						tuid : a(d).attr("userid"),
						nick : a(d).attr("nick"),
						status : a(d).attr("status"),
						imgsrc : a(d).find(".group-pic img").attr("src"),
						profile : a(d).attr("profile"),
						focus : !0
					};
					a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-news").remove(), c.chatClass.showChatWindow(e)
				}
				b.preventDefault()
			}), a(document).delegate(".sohuwebim-list-group", "click", function(b) {
				var d = a(b.target);
				if (d.hasClass("sohuwebim-list-group-title") || d.parent().hasClass("sohuwebim-list-group-title")) {
					var e = a(this), f = parseInt(e.find("i").attr("groupid")), g = a(".sohuwebim-group-box-item-" + f);
					g.is(":hidden") ? (g.show(), e.find(".sohuwebim-list-group-title i").removeClass("name-unfold").addClass("name-fold"), c.friendListClass.foldgroups.splice(a.inArray(f, c.friendListClass.foldgroups), 1)) : (g.hide(), e.find(".sohuwebim-list-group-title i").removeClass("name-fold").addClass("name-unfold"), c.friendListClass.foldgroups.push(f)), b.preventDefault()
				}
			}), a(document).delegate(".sohuwebim-box .sohuwebim-list-wrap .jquery-confirm .dialog-button-container", "click", function(e) {
				e.stopPropagation(), e.preventDefault();
				var f = a(e.target);
				if (f.hasClass("dialog-button-accept") || f.parent().hasClass("dialog-button-accept") || f.parent().parent().hasClass("dialog-button-accept")) {
					a(".sohuwebim-box .sohuwebim-list-wrap .jquery-dialog.jquery-confirm").remove(), b.notify_offline(), b.notifycode = 0;
					var g = {
						type : "notify",
						msg : c.uid + "|0"
					};
					b.setStatus(g, function() {
						a(".sohuwebim-box").remove(), a(document.body).append(b.wrapperHTML.join(b.myFriendsGroup)), a(".sohuwebim-box .sohuwebim-my-status").find("i").removeClass().addClass("sohuwebim-status-" + b.notifylist[0].status), a(".sohuwebim-box .sohuwebim-my-status").find(".txt").html(b.notifylist[0].txt)
					}), d.setCookie("imoffline", "0")
				} else if (f.hasClass("dialog-button-cancel") || f.parent().hasClass("dialog-button-cancel") || f.parent().parent().hasClass("dialog-button-cancel"))
					a(".sohuwebim-box .sohuwebim-list-wrap .jquery-dialog.jquery-confirm").remove(), a(".sohuwebim-list-wrap .sohuwebim-list-offline-shadow").removeClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd"), a(".sohuwebim-box .sohuwebim-change-status-box").hide()
			})
		},
		offlayer : null,
		notifyEl : null,
		notifyHtml : "<div class=\"sohu-webim-status-layer\" style=\"display:none;\"><ul><li notify=\"1\"><span class=\"sohu-webim-user-status-img sohu-webim-status-online sohu-webim-fleft\"></span><span class=\"sohu-webim-status-text\"> 在线 </span></li><li notify=\"2\"><span class=\"sohu-webim-user-status-img sohu-webim-status-busy sohu-webim-fleft\"></span><span class=\"sohu-webim-status-text\"> 忙碌 </span></li><li notify=\"3\"><span class=\"sohu-webim-user-status-img sohu-webim-status-away sohu-webim-fleft\"></span><span class=\"sohu-webim-status-text\"> 离开 </span></li><li notify=\"0\"><span class=\"sohu-webim-user-status-img sohu-webim-status-offline sohu-webim-fleft\"></span><span class=\"sohu-webim-status-text\"> 离线 </span></li></ul></div>",
		notifylist : [{
			status : "offline",
			txt : "离线"
		}, {
			status : "online",
			txt : "在线"
		}, {
			status : "busy",
			txt : "忙碌"
		}, {
			status : "away",
			txt : "离开"
		}, {
			status : "offline",
			txt : "离线"
		}],
		notifyIsInit : !1,
		initNotify : function() {
			var b = this;
			e(a(".sohuwebim-box .sohuwebim-change-status-box ul li"));
			function e(e) {
				a(document).delegate(".sohuwebim-box .sohuwebim-change-status-box ul li", "click", function(e) {
					var g = a(e.target);
					if ((g.hasClass("last") || g.parent().hasClass("last") || g.parent().parent().hasClass("last")) && b.notifycode != 0) {
						var h = {
							pnode : "list",
							massage : "您要处于“离线”状态？新消息会被自动存储到短消息内！"
						};
						a(".sohuwebim-list-wrap .sohuwebim-list-offline-shadow").addClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd"), c.chatClass.showConfirm(h)
					} else {
						var i = a(this).attr("notify"), j = {
							type : "notify",
							msg : c.uid + "|" + i
						};
						if (b.notifycode == i)
							return;
						b.notifycode == 0 && i != 0 ? (d.delCookie("imoffline"), c.loginClass.loginDispatch(null, i)) : b.setStatus(j, function() {
							i == 0 ? b.notify_offline() : f(c.uid, i), b.notifycode = i
						});
						var k = a(".sohuwebim-box .sohuwebim-my-status");
						l(k.find("i")), k.find(".txt").html(b.notifylist[i].txt), a(".sohuwebim-box .sohuwebim-change-status-box").hide(), e.stopPropagation(), e.preventDefault()
					}
					function l(a) {
						a.removeClass().addClass("sohuwebim-status-" + b.notifylist[i].status)
					}

					var k = a(".sohuwebim-box .sohuwebim-my-status")
				})
			}

			function f(b, c) {
				a(".sohuwebim-list-wrap .sohuwebim-list-offline-shadow").removeClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd")
			}

		},
		notify_offline : function() {
			c.chatClass.removeAllWindow(), this.listUnfold(), a(".sohuwebim-list-wrap .sohuwebim-list-offline-shadow").addClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd")
		},
		setStatus : function(b, e) {
			if (c.prefix) {
				var f = c.prefix + "extensions";
				b.msg.charAt(b.msg.length - 1) != "0" && d.delCookie("imoffline"), a.ajax({
					url : f,
					data : b,
					dataType : "jsonp",
					scriptCharset : c.charSet,
					success : function(a) {
						typeof e == "function" && e()
					}
				})
			}
		},
		initTitle : function() {
			a(".sohu-webim-friend-list-title").bind("click", function(c) {
				var e = a(c.target), f = this;
				e.hasClass("list-close") && (d(a(e)), c.stopPropagation()), e.hasClass("list-max") && (b(a(e)), c.stopPropagation())
			});
			function b(b) {
				c.chatClass.showArea(a(".sohu-webim-friend-list-main"), function() {
					b.removeClass("list-max").addClass("list-close")
				})
			}

			function d(b) {
				c.chatClass.hideArea(a(".sohu-webim-friend-list-main"), function() {
					b.removeClass("list-close").addClass("list-max")
				})
			}

		},
		listenFlistEvent : function() {
			function b(b) {
				var c = b.target, d = null;
				switch("li") {
					case c.tagName.toLowerCase():
						d = a(c);
						break;
					case c.parentNode.tagName.toLowerCase():
						d = a(c.parentNode);
						break;
					default:
				}
				return d
			}
			a(document).delegate(".group-arrow-open", "click", function(b) {
				a(this).removeClass("group-arrow-open").addClass("group-arrow-close").parent().next().hide()
			}).delegate(".group-arrow-close", "click", function(b) {
				a(this).removeClass("group-arrow-close").addClass("group-arrow-open").parent().next().show()
			})
		},
		pmid : "",
		longPoll : null,
		listenMessage : function() {
			var b = c.prefix + "msg", d = this, e = arguments.callee;
			a.ajax({
				url : b,
				data : {
					productid : c.productPars.productid,
					location : c.location,
					mid : d.pmid
				},
				dataType : "jsonp",
				scriptCharset : c.charSet,
				jsonpCallback : "__jsonp_" + +(new Date) + "_" + parseInt(Math.random() * 1e6),
				error : function(a, b, c) {
					b == "parsererror" && e.call(d)
				},
				success : function(a) {
					d.messageSuccessCallback(a);
					if (a.status) {
						if (d.notifycode == 0) {
							d.cache = [];
							return
						}
						var b = !0;
						if (a.msg.length > 0)
							for (var c = 0; c < a.msg.length; c++)
								a.msg[c].type == 3 && a.msg[c].msg == "end" && ( b = !1);
						if (!b) {
							d.cache = [];
							return
						}
						var f = setTimeout(function() {
							clearTimeout(f), f = null, e.call(d)
						}, 200)
					}
				}
			})
		},
		messageSuccessCallback : function(b) {
			var d = this;
			if (b.status) {
				if (!a.isArray(b.msg) || b.msg.length == 0 || b.msg.length >= 100)
					return !1;
				var e = [];
				a.each(b.msg, function(a, b) {
					b.type === 0 ? d.tipMsg(b) : b.type === 2 ? c.msgResponseClass.respondMsg(b) : b.type === 3 && c.msgResponseClass.getOffline(), b && b.mid && e.push(b.mid)
				}), d.pmid = e.join("|")
			}
		},
		checkChatFriend : function(a) {
			var b = "l_" + a, c = d.$(b);
			if (c.length == 0)
				return !1;
			return !0
		},
		hasCheckChatWindow : function() {
			var b = a(".sohuwebim-box .sohuwebim-chat-wrap");
			if (b.length != 0)
				return !0;
			return !1
		},
		checkChatWindow : function() {
			var b = a(".sohuwebim-box .sohuwebim-chat-wrap").css("display");
			if (b == "block")
				return !0;
			return !1
		},
		tipMsg : function(b) {
			var e = d.$("sohu_webim_f_item_" + b.from);
			if (e.length !== 0) {
				var f = {
					tuid : a(e).attr("userid"),
					nick : a(e).attr("nick"),
					status : a(e).attr("status"),
					imgsrc : a(e).find(".group-pic img").attr("src"),
					profile : a(e).attr("profile"),
					msg : b.msg,
					dt : b.dt
				};
				this.hasCheckChatWindow && this.checkChatWindow() ? this.checkChatFriend(b.from) ? (c.chatClass.showChatWindow(f), c.chatClass.appendMsgToChatWindow(f, !0), c.chatClass.resetValues()) : (c.chatClass.showChatWindow(f), c.chatClass.appendMsgToChatWindow(f, !0)) : (c.chatClass.showMsgPrompt(), c.chatClass.showChatWindow(f, "hide"), c.chatClass.appendMsgToChatWindow(f, !0), c.chatClass.resetValues())
			}
		}
	}, c.friendListClass.ranLocation()
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
(function(a, b) {
	var c = window[b], d = c.global;
	c.chatClass = {
		msgSendTimestamp : (new Date).getTime(),
		lastSendMassage : "",
		showChatWindow : function(b, e) {
			var f = b.tuid, g = b.nick, h = b.status, i = b.imgsrc, j = b.profile, k = b.focus, l = h == "1" ? !0 : !1, m = h == "0" ? "<div class=\"sohuwebim-offline-shadow\"></div>" : "";
			if (a(".sohuwebim-box .sohuwebim-chat-wrap").length == 0) {
				var n = "<div class=\"sohuwebim-chat-wrap\"><div class=\"sohuwebim-chat-mod\"><div class=\"sohuwebim-chat-offline-shadow\"></div><div class=\"sohuwebim-title\"><div class=\"sohuwebim-setting\"><span class=\"sohuwebim-btns\"><a href=\"javascript:void(0);\"><i title=\"最小化聊天窗口\" class=\"unfold\"></i></a><a class=\"close\" href=\"javascript:void(0);\"><i title=\"关闭聊天窗口\" class=\"close\"></i></a></span><span class=\"txt\">与<a class=\"usrnick\" href=\"" + j + "\" target=\"blank\"><b>" + g + "</b></a> 聊天中 【<em>0</em>条对话】</span></div></div><div class=\"sohuwebim-chat-list\"><button class=\"chat-up\"><a href=\"javascript:void(0);\"><i class=\"btn-up\"></i></a></button><div class=\"chat-list\"><ul><li id=\"l_" + f + "\" userid=\"" + f + "\" title=\"" + g + "\" class=\"current\" profile=\"" + j + "\"><div class=\"icon-close\"><a href=\"javascript:void(0);\"><i class=\"close\"></i></a></div>" + m + "<div class=\"group-pic\"><div class=\"group-status-box\"><i class=\"sohuwebim-status-" + h + "\"></i></div><a href=\"javascript:void(0);\"><img src=\"" + i + "\" /></a></div><div class=\"name\"><div style=\"overflow:hidden;\">" + g + "</div></div></li></ul></div><button class=\"chat-down\"><a href=\"javascript:void(0);\"><i class=\"btn-down\"></i></a></button></div><div class=\"sohuwebim-chat-commix\"><div class=\"prompt\"><span class=\"prompt-close\"><a href=\"javascript:void(0);\"><i class=\"icon-close\"></i></a></span><i class=\"icon-prompt\"></i><span class=\"txt\">对方当前不是“在线”状态，可能无法立即回复。</span></div><div class=\"sohuwebim-chat-chat\"><dl id=\"" + f + "\" class=\"current\"></dl></div><div class=\"sohuwebim-chat-face\"><div class=\"chat-history\"><a href=\"http://i.sohu.com/whisper/general.htm#pp=" + this.uidToBase64(f.split("|")[1]) + "&page=0\" target=\"_blank\">查看聊天记录</a></div></div><div class=\"sohuwebim-chat-textarea\"><div class=\"sohuwebim-chat-textareabox\"><textarea></textarea></div></div><div class=\"sohuwebim-chat-btns\"><div class=\"sohuwebim-sent-btn\"><span class=\"ui-btn\"><span>发送</span></span></div><span class=\"sohuwebim-number\">0/200</span><span class=\"sohuwebim-number-prompt\">已达到输入字数上限！</span><span class=\"sohuwebim-forbid-prompt\">发太快了哦，慢一点！</span><span class=\"sohuwebim-blank-prompt\">发送内容不能为空哦！</span><span class=\"sohuwebim-text-prompt\">相同内容发一次就好了哦！</span></div></div></div></div>", o = "<div class=\"sohuwebim-min-com sohuwebim-chat\"><div class=\"sohuwebim-chat-box\"><span class=\"sohuwebim-min-btns\"><a href=\"javascript:void(0);\"><i class=\"fold\"></i></a></span>与 <b>" + g + "</b> 聊天中</div></div>";
				a(".sohuwebim-box").prepend(n), a(".sohuwebim-box .sohuwebim-min-wrap").append(o), k != !0 && a(document.getElementById("l_" + f)).addClass("highlight"), d.setCookie("imchat", f), d.isIE() == !0 && a(".sohuwebim-chat-mod").bgiframe()
			} else if (a(document.getElementById("l_" + f)).length == 0) {
				var p = k ? "current" : "highlight", q = "<li id=\"l_" + f + "\" userid=\"" + f + "\" title=\"" + g + "\" class=\"" + p + "\" profile=\"" + j + "\"><div class=\"icon-close\"><a class=\"close\" href=\"javascript:void(0);\"><i class=\"close\"></i></a></div>" + m + "<div class=\"group-pic\"><div class=\"group-status-box\"><i class=\"sohuwebim-status-" + h + "\"></i></div><a href=\"javascript:void(0);\"><img src=\"" + i + "\" /></a></div><div class=\"name\"><div style=\"overflow:hidden;\">" + g + "</div></div></li>", r = "<dl id=\"" + f + "\" class=\"" + p + "\"></dl>";
				if (k) {
					a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul .current").removeClass("current"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul").append(q), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current").removeClass("current"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat").append(r), a(".sohuwebim-box .sohuwebim-chat-wrap").show(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus(), c.chatClass.resetNames(d.$("l_" + f)), c.global.msgNumber = 0, c.chatClass.resetValues();
					var s = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").height();
					a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(s), d.setCookie("imchat", f), d.isIE() == !0 && a(".sohuwebim-chat-mod").bgiframe()
				} else
					a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul").append(q), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat").append(r), a(".sohuwebim-box .sohuwebim-chat-wrap").show(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus()
			} else if (k) {
				a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul .current").removeClass("current"), a(document.getElementById("l_" + f)).addClass("current").removeClass("highlight"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current").removeClass("current"), a(document.getElementById(f)).addClass("current"), a(".sohuwebim-box .sohuwebim-chat-wrap").show(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus(), c.chatClass.resetNames(d.$("l_" + f)), c.global.msgNumber = 0, c.chatClass.resetValues();
				var t = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul li");
				if (t.length > 11) {
					var u = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(), v = a.inArray(document.getElementById("l_" + f), t);
					u > v * 30 ? a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(v * 30) : u < v * 30 - 300 && a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(v * 30 - 300)
				}
				d.setCookie("imchat", f), d.isIE() == !0 && a(".sohuwebim-chat-mod").bgiframe()
			} else
				a(document.getElementById("l_" + f)).hasClass("current") || a(document.getElementById("l_" + f)).addClass("highlight"), a(".sohuwebim-box .sohuwebim-chat-wrap").show();
			l ? a(".sohuwebim-box .sohuwebim-chat-commix .prompt").hide() : a(".sohuwebim-box .sohuwebim-chat-commix .prompt").show(), e == "hide" && a(".sohuwebim-box .sohuwebim-chat-wrap").hide()
		},
		showMsgPrompt : function() {
			a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-chat").hide(), c.global.msgNumber++;
			var b = c.global.msgNumber, d = a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-news");
			if (d.length == 0) {
				var e = "<div class=\"sohuwebim-min-com sohuwebim-news\"><div class=\"sohuwebim-chat-box sohuwebim-chat-hover\"><span class=\"sohuwebim-min-btns\"><a href=\"javascript:void(0);\"><i class=\"fold\"></i></a></span>你有<b>" + b + "</b>条新消息</div></div>";
				a(".sohuwebim-box .sohuwebim-min-wrap").append(e), a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-news").show()
			} else
				d.find(".sohuwebim-chat-box b").html(b)
		},
		removeAllWindow : function() {
			var b = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul li.highlight"), e = b.length;
			if (e === 0)
				a(".sohuwebim-box .sohuwebim-chat-wrap").remove(), a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-chat").remove(), a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-news").length != 0 && (c.global.msgNumber = 0, a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-news").remove()), d.delCookie("imchat");
			else {
				var f = {
					pnode : "chat",
					massage : "您有未读消息，关闭对话框后，该消息会被自动存储到短消息内。"
				};
				this.showConfirm(f)
			}
		},
		foldChatWindow : function() {
			var b = a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-news");
			if (b.length != 0)
				return !1;
			a(".sohuwebim-box .sohuwebim-chat-wrap").hide(), a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-chat").show()
		},
		uidToBase64 : function(a) {
			var b;
			try {
				b = Base64.encode(a)
			} catch(c) {
			}
			return b
		},
		bindEventFunction : function() {
			a("body").delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-title .sohuwebim-setting", "click", function(b) {
				var d = a(b.target);
				!d.hasClass("usrnick") && !d.parent().hasClass("usrnick") && (b.preventDefault(), c.chatClass.foldChatWindow())
			}).delegate(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-chat", "click", function(b) {
				b.preventDefault(), a(this).hide(), a(".sohuwebim-box .sohuwebim-chat-wrap").show()
			}).delegate(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-news", "click", function(b) {
				b.preventDefault(), a(this).remove(), c.global.msgNumber = 0, a(".sohuwebim-box .sohuwebim-chat-wrap").show(), c.chatClass.resetValues(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list ul li.current").removeClass("highlight")
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-up", "click", function(b) {
				b.preventDefault();
				var c = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop();
				a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(c - 30)
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-down", "click", function(b) {
				b.preventDefault();
				var c = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop();
				a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list").scrollTop(c + 30)
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .prompt", "click", function(b) {
				b.preventDefault();
				var c = a(b.target);
				c.hasClass("icon-close") && a(this).hide()
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-btns", "click", function(b) {
				b.preventDefault();
				var d = a(b.target);
				if (d.hasClass("close") || d.parent().hasClass("close"))
					c.chatClass.removeAllWindow(), b.stopPropagation()
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list li", "click", function(b) {
				b.preventDefault();
				var e = a(b.target), f = a.trim(a(this).attr("id").substring(2)), g = a(this).attr("profile");
				if (e.hasClass("close") && a(this).hasClass("current")) {
					if (a(this).next().length > 0) {
						a(this).next().addClass("current").removeClass("highlight");
						var h = a.trim(a(this).next().attr("id").substring(2));
						a(document.getElementById(h)).addClass("current"), c.chatClass.resetNames(a(this).next()), c.chatClass.showPrompt(a(this).next()), a(this).remove(), a(document.getElementById(f)).remove()
					} else if (a(this).prev().length > 0) {
						a(this).prev().addClass("current").removeClass("highlight");
						var h = a.trim(a(this).prev().attr("id").substring(2));
						a(document.getElementById(h)).addClass("current"), c.chatClass.resetNames(a(this).prev()), c.chatClass.showPrompt(a(this).prev()), a(this).remove(), a(document.getElementById(f)).remove()
					}
					c.chatClass.resetValues()
				} else
					e.hasClass("close") ? (a(this).remove(), a(document.getElementById(f)).remove()) : (c.chatClass.resetNames(a(this)), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list .current").removeClass("current").removeClass("highlight"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current").removeClass("current"), a(this).addClass("current").removeClass("highlight"), a(document.getElementById(f)).addClass("current"), c.chatClass.resetValues(), c.chatClass.showPrompt(this));
				d.setCookie("imchat", a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current").attr("id"))
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list li", "mouseover", function(b) {
				a(this).addClass("item-hover"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list li").length != 1 ? a(this).addClass("hover") : a(this).removeClass("hover")
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list li", "mouseout", function(b) {
				a(this).removeClass("item-hover"), a(this).removeClass("hover")
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea", "keyup", function(b) {
				var c = a.trim(a(this).val()).length;
				a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-btns .sohuwebim-number").html(c + "/200"), c > 200 ? a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-btns .sohuwebim-number-prompt").show() : a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-btns .sohuwebim-number-prompt").hide()
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea", "keydown", function(b) {
				if (b.keyCode == 13) {
					var d = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list .current").attr("userid"), e = a.trim(a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").val()), f = e.length, g = this;
					if (f > 200) {
						c.chatClass.textareaBlink(g), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
						return !1
					}
					if (e.length > 0) {
						if (d + e == c.chatClass.lastSendMassage) {
							c.chatClass.showForbidPrompt("sohuwebim-text-prompt"), c.chatClass.textareaBlink(g), b.stopPropagation(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
							return !1
						}
						if ((new Date).getTime() - c.chatClass.msgSendTimestamp < 1e3) {
							c.chatClass.showForbidPrompt("sohuwebim-forbid-prompt"), b.stopPropagation(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
							return !1
						}
						c.chatClass.lastSendMassage = d + e, a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").val(""), c.chatClass.sendTheMsg(d, e, a(document.getElementById("l_" + d)).find(".name").html()), c.chatClass.msgSendTimestamp = (new Date).getTime(), b.stopPropagation(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
						return !1
					}
					c.chatClass.textareaBlink(g), c.chatClass.showForbidPrompt("sohuwebim-blank-prompt"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
					return !1
				}
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-btns .ui-btn", "click", function(b) {
				var d = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-list .chat-list .current").attr("userid"), e = a.trim(a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").val()), f = e.length, g = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea");
				if (f > 200) {
					c.chatClass.textareaBlink(g), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
					return !1
				}
				if (e.length > 0) {
					if (d + e == c.chatClass.lastSendMassage) {
						c.chatClass.showForbidPrompt("sohuwebim-text-prompt"), c.chatClass.textareaBlink(g), b.stopPropagation(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
						return !1
					}
					if ((new Date).getTime() - c.chatClass.msgSendTimestamp < 1e3) {
						c.chatClass.showForbidPrompt("sohuwebim-forbid-prompt"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
						return !1
					}
					c.chatClass.lastSendMassage = d + e, a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").val(""), c.chatClass.sendTheMsg(d, e, a(document.getElementById("l_" + d)).find(".name").html()), c.chatClass.msgSendTimestamp = (new Date).getTime(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus(), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-btns .sohuwebim-number").html("0/200");
					return !1
				}
				c.chatClass.textareaBlink(g), c.chatClass.showForbidPrompt("sohuwebim-blank-prompt"), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus();
				return !1
			}).delegate(".sohuwebim-box .sohuwebim-chat-wrap .jquery-confirm .dialog-middle-container .dialog-button-container", "click", function(b) {
				var d = a(b.target);
				if (d.hasClass("dialog-button-accept") || d.parent().hasClass("dialog-button-accept") || d.parent().parent().hasClass("dialog-button-accept"))
					a(".sohuwebim-box .sohuwebim-chat-wrap .jquery-dialog.jquery-confirm").remove(), a(".sohuwebim-box .sohuwebim-chat-wrap").remove(), a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-chat").remove(), a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-news").length != 0 && (c.global.msgNumber = 0, a(".sohuwebim-box .sohuwebim-min-wrap > .sohuwebim-news").remove());
				else if (d.hasClass("dialog-button-cancel") || d.parent().hasClass("dialog-button-cancel") || d.parent().parent().hasClass("dialog-button-cancel"))
					a(".sohuwebim-box .sohuwebim-chat-wrap .jquery-dialog.jquery-confirm").remove(), a(".sohuwebim-chat-offline-shadow").removeClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd")
			})
		},
		showConfirm : function(b) {
			a(".sohuwebim-" + b.pnode + "-offline-shadow").addClass("sohuwebim-offline-shadow sohuwebim-offline-layer-sd");
			var c = a(".sohuwebim-box .sohuwebim-" + b.pnode + "-wrap .jquery-dialog.jquery-confirm");
			{
				if (c.length != 0)
					return;
				var d = "<div class=\"jquery-dialog dialog-outer-fixed jquery-confirm\" style=\"bottom: 200px; width: 200px;\"><div class=\"dialog-top-container\" style=\"width: 200px;\"><div class=\"dialog-top-border\" style=\"width: 200px;\"></div></div><div class=\"dialog-middle-container\" style=\"height: 103px; width: 200px;\"><div class=\"dialog-left-border\" style=\"height: 103px;\"></div><div class=\"dialog-inner-container\" style=\"width: 198px;\"><div class=\"dialog-title-container\" style=\"display: none; width: 198px;\"><div class=\"dialog-title\" style=\"width: 192px;\">false</div><div title=\"关闭\" class=\"dialog-button-close\" tabindex=\"0\"></div></div><div class=\"dialog-content-container\" style=\"width: 158px;\">" + b.massage + "</div><div class=\"dialog-button-container\" style=\"width: 198px;\"><div data-disabled=\"false\" class=\"i-button i-button-default dialog-button-accept\" tabindex=\"0\"><div class=\"i-button-left\" unselectable=\"on\"><div class=\"i-button-text\" unselectable=\"on\">确定</div></div><div class=\"i-button-right\" unselectable=\"on\"></div></div><div data-disabled=\"false\" class=\"i-button i-button-default dialog-button-cancel\" tabindex=\"0\"><div class=\"i-button-left\" unselectable=\"on\"><div class=\"i-button-text\" unselectable=\"on\">取消</div></div><div class=\"i-button-right\" unselectable=\"on\"></div></div></div></div><div class=\"dialog-right-border\" style=\"height: 103px;\"></div></div><div class=\"dialog-bottom-container\" style=\"width: 200px;\"><div class=\"dialog-bottom-border\" style=\"width: 200px;\"></div></div></div>";
				a(".sohuwebim-box .sohuwebim-" + b.pnode + "-wrap").append(d)
			}
		},
		showForbidPrompt : function(b) {
			a(".sohuwebim-box .sohuwebim-chat-btns ." + b).show();
			var c = setTimeout(function() {
				clearTimeout(c), a(".sohuwebim-box .sohuwebim-chat-btns ." + b).hide()
			}, 2500)
		},
		showPrompt : function(b) {
			a(b).find(".group-pic .group-status-box i").attr("class") == "sohuwebim-status-1" ? a(".sohuwebim-box .sohuwebim-chat-commix .prompt").hide() : a(".sohuwebim-box .sohuwebim-chat-commix .prompt").show()
		},
		resetNames : function(b) {
			var c = b.attr("title"), d = b.attr("profile"), e = b.attr("userid").split("|")[1], f = "http://i.sohu.com/whisper/general.htm#pp=" + this.uidToBase64(e) + "&page=0";
			try {
				a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-title .sohuwebim-setting b").html(c), a(".sohuwebim-box .sohuwebim-min-wrap .sohuwebim-chat b").html(c), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-title .sohuwebim-setting .txt .usrnick").attr("href", d), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-face .chat-history a").attr("href", f)
			} catch(g) {
			}
		},
		resetValues : function() {
			var b = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current dd").length;
			a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-title .sohuwebim-setting em").html(b);
			var c = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat .current").height();
			a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-chat").scrollTop(c), a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .sohuwebim-chat-textarea textarea").focus()
		},
		textareaBlink : function(b) {
			a(b).css("background-color", "#fc9");
			var c = setInterval(function() {
				a(b).css("background-color", "#fc9")
			}, 200), d = setTimeout(function() {
				a(b).css("background-color", "#fff")
			}, 210), e = setTimeout(function() {
				clearTimeout(e), clearInterval(c), clearTimeout(d), a(b).css("background-color", "#fff")
			}, 620)
		},
		sendTheMsg : function(b, d, e) {
			var f = {
				tuid : b,
				msg : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
				dt : (new Date).getTime()
			};
			this.appendMsgToChatWindow(f), this.resetValues(), a.ajax({
				url : c.prefix + "chat",
				dataType : "jsonp",
				data : {
					productid : a.trim(b.split("|")[0]),
					fnick : "",
					to : f.tuid,
					tnick : e,
					fromlocation : c.location,
					tolocation : "",
					msg : f.msg
				},
				success : function(f) {
					if (!f.status) {
						var g = "<div class=\"failedmsg\"><p>您刚刚发送给\"" + e + "\"的消息\"" + d + "\"发送失败，请稍候重试或尝试刷新页面。</p></div>";
						a(document.getElementById(b)).append(g), c.chatClass.resetValues()
					}
				}
			})
		},
		appendMsgToChatWindow : function(b, c) {
			var d = b.tuid, e = b.msg, f = b.dt, g = parseInt(f), h = c ? "replay" : "mysay", i = c ? this.timeFormatChange(g, !0) : this.timeFormatChange(g), j = "<dd class=\"" + h + "\"><div class=\"sohuwebim-chat-time\">" + i + "</div><div class=\"sohuwebim-chat-releasebox\"><i class=\"triangle\"></i>" + e + "</div></dd>";
			a(document.getElementById(d)).append(j)
		},
		timeFormatChange : function(a, b) {
			var c = new Date(a);
			b && ( c = new Date(a + (new Date).getTimezoneOffset() / 60 * -1 * 3600 * 1e3));
			var d = c.getMonth() + 1 + "-";
			d += c.getDate() + " ", d += ("00" + c.getHours()).slice(-2) + ":", d += ("00" + c.getMinutes()).slice(-2);
			return d
		}
	}
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
(function(a, b) {
	var c = window[b], d = c.global;
	a(document).ready(function() {
		c.loginClass.init(), c.global.isIE() == !0 && (a("body").delegate("a", "click", function(a) {
			try {
				this.href.toLowerCase().indexOf("javascript:void(0)") === 0 && a.preventDefault()
			} catch(b) {
			}
		}), c.global.scroll(function() {
			a(".sohuwebim-box").hide()
		}, function() {
			a(".sohuwebim-box").css("bottom", 0), a(".sohuwebim-box").show()
		}))
	})
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
(function(a, b) {
	var c = window[b], d = c.global, e = c.friendListClass;
	c.msgResponseClass = {
		respondMsg : function(b) {
			var e = {
				uid : b.from
			};
			b.msg && b.msg.notifyAct == 0 && b.msg.info && (e.nick = a.trim(b.msg.info.nick) ? b.msg.info.nick : d.default_nick, e.face_url = a.trim(b.msg.info.face_url) ? b.msg.info.face_url : d.default_face_url, e.profile_url = a.trim(b.msg.info.profile_url) ? b.msg.info.profile_url : d.default_profile_url, e.status = parseInt(b.msg.info.status), e.group = parseInt(d.getFriendGroup(e.uid)) >= 0 ? parseInt(d.getFriendGroup(e.uid)) : 0);
			var f = a(document.getElementById("sohu_webim_f_item_" + e.uid));
			if (f.length != 0) {
				f.attr("status", e.status), f.find(".group-pic .group-status-box i").removeClass().addClass("sohuwebim-status-" + c.friendListClass.notifylist[e.status].status);
				var g = f.parent();
				switch(e.status) {
					case 0:
						f.remove(), a(g).children().length == 0 && a(g).parent().hide();
						var h = parseInt(a(g).parent().find(".sohuwebim-list-group-title span").html());
						h--, a(g).parent().find(".sohuwebim-list-group-title span").html(h);
						break;
					case 1:
						f.remove(), g.prepend(f);
						break;
					case 2:
						f.remove(), g.find("li[status=\"1\"]").length > 0 ? g.find("li[status=\"1\"]:last").after(f) : g.prepend(f);
						break;
					case 3:
						f.remove(), g.append(f);
						break;
					default:
				}
			} else {
				var i = a("<li id=\"sohu_webim_f_item_" + e.uid + "\" nick=\"" + e.nick + "\" status=\"" + e.status + "\" userid=\"" + e.uid + "\" title=\"" + e.nick + "\" initchat=\"0\" profile=\"" + e.profile_url + "\"><div class=\"group-pic\"><div class=\"group-status-box\"><i class=\"sohuwebim-status-" + c.friendListClass.notifylist[e.status].status + "\"></i></div><img src=\"" + e.face_url + "\" /></div><div class=\"name\"><div style=\"overflow:hidden;\">" + e.nick + "</div></div></li>"), j = a(".sohuwebim-box .sohuwebim-group-box-item-" + e.group);
				switch(e.status) {
					case 1:
						j.prepend(i), j.parent().show();
						break;
					case 2:
						j.find("li[status=\"1\"]").length > 0 ? j.find("li[status=\"1\"]:last").after(i) : j.prepend(i), j.parent().show();
						break;
					case 3:
						j.append(i), j.parent().show();
						break;
					default:
				}
				var h = parseInt(j.parent().find(".sohuwebim-list-group-title span").html());
				h++, j.parent().find(".sohuwebim-list-group-title span").html(h)
			}
			var k = a(document.getElementById("l_" + e.uid));
			if (k.length > 0) {
				k.find(".group-pic .group-status-box").html("<i class=\"sohuwebim-status-" + e.status + "\"></i>"), e.status === 0 ? k.find(".icon-close").after("<div class=\"sohuwebim-offline-shadow\"></div>") : k.find(".sohuwebim-offline-shadow").remove();
				if (k.hasClass("current")) {
					var l = a(".sohuwebim-box .sohuwebim-chat-wrap .sohuwebim-chat-commix .prompt");
					e.status === 1 ? l.hide() : l.show()
				}
			}
			var m = a(".sohuwebim-box .sohuwebim-list-wrap .sohuwebim-list-team .sohuwebim-list-team-box li").length;
			a(".sohuwebim-box .sohuwebim-online-number").html(m)
		},
		getOffline : function() {
			e.notify_offline(), e.notifycode = 0, a(".sohuwebim-box").remove(), a(document.body).append(e.wrapperHTML.join(e.myFriendsGroup)), a(".sohuwebim-box .sohuwebim-my-status").find("i").removeClass().addClass("sohuwebim-status-" + e.notifylist[0].status), a(".sohuwebim-box .sohuwebim-my-status").find(".txt").html(e.notifylist[0].txt), d.setCookie("imoffline", "0")
		},
		refreshFriend : function(b) {
			var c = b.uid, d = b.nick, f = b.face_url, g = b.profile_url, h = b.status, i = b.group;
			a.inArray(c, e.data.msg.online) != -1 ? a.each(e.data.msg.friends, function(b, d) {
				if (d.uid == c) {
					if (h != 0) {
						e.data.msg.friends[b].status = h;
						return !1
					}
					e.data.msg.online.splice(a.inArray(c, e.data.msg.online), 1), e.data.msg.friends.splice(b, 1);
					return !1
				}
			}) : h != 0 && (e.data.msg.friends.push(b), e.data.msg.online.push(c))
		},
		refreshUI : function() {
		}
	}
})(__jquery17_4_webim || jQuery || $, "__global_webim_object");
