/* Signed-in session for the admin panel only. A small copy of the website's login helpers, without any page pop-ups. */
(function(){
  var C=window.SK_CFG||{};if(!(C.url&&C.anon))return;
  var url=C.url.replace(/\/+$/,''),KEY='sk_sess',UKEY='sk_user';
  function rd(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
  function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function api(path,o){
    o=o||{};var h={apikey:C.anon,'Content-Type':'application/json'};if(o.token)h.Authorization='Bearer '+o.token;if(o.prefer)h.Prefer=o.prefer;
    return fetch(url+path,{method:o.method||'GET',headers:h,body:o.body?JSON.stringify(o.body):undefined}).then(function(r){
      return r.text().then(function(t){var j=null;try{j=t?JSON.parse(t):null}catch(e){}
        if(!r.ok){var em=(j&&(j.msg||j.error_description||j.message))||'Request failed';throw Object.assign(new Error(em),{status:r.status,code:j&&j.code})}
        return j})},
      function(){throw new Error('Cannot reach the server. Check your connection.')});
  }
  function clear(){try{localStorage.removeItem(KEY);localStorage.removeItem(UKEY)}catch(e){}}
  function token(){
    var s=rd(KEY);if(!s)return Promise.resolve(null);
    if(Date.now()<s.exp-30000)return Promise.resolve(s.access);
    if(!s.refresh){clear();return Promise.resolve(null)}
    return api('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:s.refresh}}).then(function(j){
      s.access=j.access_token;s.refresh=j.refresh_token||s.refresh;s.exp=Date.now()+(j.expires_in||3600)*1000;wr(KEY,s);return s.access},function(){clear();return null});
  }
  function loadUser(){
    return token().then(function(t){
      if(!t)return null;
      return api('/auth/v1/user',{token:t}).then(function(u){
        return api('/rest/v1/profiles?id=eq.'+encodeURIComponent(u.id)+'&select=*',{token:t}).then(function(r){return r&&r[0]||{}},function(){return {}}).then(function(pr){
          var m=u.user_metadata||{};
          var x={id:u.id,email:u.email||'',username:pr.username||'',name:pr.display_name||m.display_name||m.full_name||(u.email||'').split('@')[0]||'Admin',role:pr.role||'member',blocked:!!pr.blocked};
          wr(UKEY,x);return x});
      },function(e){if(e.status===401||e.status===403){clear();return null}return rd(UKEY)});
    });
  }
  window.skUser={get:loadUser,token:token,api:api,signOut:function(){clear();return Promise.resolve()}};
})();
