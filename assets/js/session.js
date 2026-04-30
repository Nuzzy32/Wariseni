(function (global) {
  'use strict';

  var KEY = 'kl_session';

  var USERS = [
    { email: 'customer@gmail.com', password: 'customer123', role: 'customer', name: 'Budi Santoso',  avatar: null },
    { email: 'seller@gmail.com',   password: 'seller123',   role: 'seller',   name: 'Toko Tony', avatar: '../assets/images/0a786b17ad9c47ca2d8136bacb46d840c330f804.png' }
  ];

  function getSession() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; }
    catch (e) { return null; }
  }

  function login(email, password) {
    for (var i = 0; i < USERS.length; i++) {
      var u = USERS[i];
      if (u.email === email.trim().toLowerCase() && u.password === password) {
        var s = { email: u.email, role: u.role, name: u.name, avatar: u.avatar };
        localStorage.setItem(KEY, JSON.stringify(s));
        return s;
      }
    }
    return null;
  }

  function loginPath() {
    var path = window.location.pathname;
    var idx = path.indexOf('/pages/');
    if (idx === -1) return 'pages/auth/login.html';
    var depth = path.substring(idx + 7).split('/').length - 1;
    return depth > 0 ? '../auth/login.html' : 'auth/login.html';
  }

  function rootPath() {
    var path = window.location.pathname;
    var idx = path.indexOf('/pages/');
    if (idx === -1) return 'index.html';
    var depth = path.substring(idx + 7).split('/').length - 1;
    return depth > 0 ? '../../index.html' : '../index.html';
  }

  function logout() {
    localStorage.removeItem(KEY);
    window.location.replace(loginPath());
  }

  /* ---- Guards (call at top of protected pages) ---- */
  function requireLogin() {
    if (getSession()) return true;
    window.location.replace(loginPath());
    return false;
  }

  function requireSeller() {
    var s = getSession();
    if (!s) { window.location.replace(loginPath()); return false; }
    if (s.role !== 'seller') { window.location.replace(rootPath()); return false; }
    return true;
  }

  global.KL = { getSession: getSession, login: login, logout: logout, requireLogin: requireLogin, requireSeller: requireSeller };

}(window));
