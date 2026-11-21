SK ADMIN SITE (separate from your public website)

WHAT THIS IS
The admin panel on its own address. It loads your website's code from the public site
(address set in admin-site.js) and shows your live pages in the Content editor preview.

FILES (all in one folder, no sub-folders)
index.html, admin.js, admin.css, admin-bg.jpg, favicon.svg, config.js, admin-site.js, admin-session.js
+ YOUR OWN admin-config.js (move it here from the old repo, do not change it).

HOSTING (pick one)
A) Cloudflare Pages or Netlify, "upload a folder" (free, no GitHub needed, the code stays private). Best.
B) A second GitHub account with its own Pages repo (free, but the repo is public: anyone who knows the account can read these files).
C) Only on your computer: open index.html from the folder. Nothing is hosted anywhere. Works for one computer only.

STEPS
1. In the OLD public repo, first publish any unpublished changes (Publish > Download site-data.js, upload it to the public repo).
   Drafts do not move to the new address.
2. Put the 8 files above + your admin-config.js in a folder and host it (A, B or C).
3. Upload sk-data.js from sk-update13.zip to the PUBLIC repo (this lets the preview show your drafts).
4. Open the new admin address, log in with your admin details. On the data tabs, use "Connect your data" (email + password) once.
5. Only after it all works: delete these from the PUBLIC repo and push:
   ctl-k7q2x9m4.html, admin.js, admin.css, admin.html, admin-config.js, admin-bg.jpg, ADMIN-README.txt

LIMITS
- The preview shows your site with your draft inside the editor. "Preview site" opens the published site.
- Change admin-site.js if your public address changes.
- Keep the new address private. The real protection is still your admin login and the server checks in Supabase.
