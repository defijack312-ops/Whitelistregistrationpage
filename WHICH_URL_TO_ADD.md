# 🎯 Which URL Do I Add to Privy?

## ❌ WRONG URL (Don't use this):
```
https://6628b49a-38e3-4fd3-a907-5ca83c097843-v2-figmaiframepreview.figma.site
```
This is the **iframe preview** URL - it won't work!

---

## ✅ CORRECT URL (Use this):

**Look at the RED BANNER on your page** - it shows the correct URL automatically.

It should look like:
```
https://app-XXXXXXXXX.makeproxy-c.figma.site
```

Key indicators of the **correct URL**:
- ✅ Starts with `https://app-`
- ✅ Ends with `.makeproxy-c.figma.site`
- ✅ It's the URL shown in your browser's address bar

---

## 🔍 How to Find the Correct URL:

### Option 1: Look at the Red Banner
The big red alert at the top of your page shows the **exact URL** to add.

### Option 2: Check Browser Address Bar
Copy the full URL from your browser's address bar (where you see the page URL).

### Option 3: Check Console
Open browser DevTools (F12) and look for the message:
```
🚨 PRIVY OAUTH SETUP REQUIRED:
Add this URL to Privy Dashboard → Settings → Allowed origins:
👉 [YOUR CORRECT URL HERE]
```

---

## 📋 What Should Be in Privy Allowed Origins:

You should have **both** of these URLs:

1. **Your current makeproxy URL** (the one with `app-XXXX.makeproxy-c.figma.site`)
2. Any production domains you'll use later

Example allowed origins list:
```
https://app-omjy2uix4nmjlhwkop25rnlpc6quforlm32tvvbyfp6bw24cw6aa.makeproxy-c.figma.site
https://figma.com
https://www.figma.com
```

---

## ✅ After Adding the Correct URL:

1. **Save** in Privy Dashboard
2. **Refresh** your page
3. Try **Twitter or Google login**
4. Should work! 🎉

---

## 🚨 Still Seeing the Error?

If you added a URL and still see "Origin not allowed":

1. **Double-check** - Is the URL in the banner the same as what you added?
2. **Try hard refresh** - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Clear Privy cache** - Use the diagnostic tool on the page
4. **Verify in Privy** - Make sure you clicked "Save" in the dashboard

---

**TL;DR: Copy the URL from the RED BANNER on your page, paste it in Privy → Settings → Allowed origins, save, refresh. Done!** ✅
