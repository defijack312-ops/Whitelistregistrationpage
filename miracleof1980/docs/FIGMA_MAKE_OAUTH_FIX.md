# 🎯 Fixing Twitter/Google Login in Figma Make

## Your Situation

You're viewing your app at `figma.com/make` and there's no separate makeproxy URL appearing.

This is normal! Here's what to do:

---

## ✅ **Quick Fix: Add Figma URLs to Privy**

Since you're in the Figma Make editor, add these URLs to Privy:

### Step 1: Go to Privy Dashboard
1. Open https://dashboard.privy.io
2. Click **Settings** (left sidebar)
3. Click **Allowed origins**

### Step 2: Add These URLs
Click "+ Add origin" for **each** of these:

1. `https://figma.com`
2. `https://www.figma.com`

### Step 3: Save
Click **Save** button

### Step 4: Test
1. Go back to your app at `figma.com/make`
2. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
3. Try Twitter or Google login
4. Should work! ✅

---

## 🔍 **I Added a URL Detector**

When you refresh your page, the red banner now has a **URL Detector** section that shows:

- ✅ **Green** = Makeproxy URL (if it finds one - use this!)
- ⚠️ **Yellow** = Figma URL (use this if no makeproxy)
- ❌ **Red** = Can't access (skip these)

The detector will automatically find all URLs and show you which ones to use.

---

## 📋 **Your Privy Allowed Origins Should Have:**

After adding the URLs, your list should include:

```
✅ https://figma.com
✅ https://www.figma.com
```

And optionally (if the detector finds one):
```
✅ https://app-XXXXX.makeproxy-c.figma.site
```

---

## 🚀 **When You Deploy/Publish:**

When you eventually publish or share your app:
- You'll get a **makeproxy URL** 
- Add that makeproxy URL to Privy too
- Keep the figma.com URLs for when you're editing

---

## ⚡ **TL;DR:**

1. Add `https://figma.com` and `https://www.figma.com` to Privy
2. Save
3. Refresh your app
4. Try Twitter/Google login
5. Done! ✅

---

## 🐛 **Still Not Working?**

Check the **URL Detector** in the red banner:
- If it shows a **green makeproxy URL** → use that instead!
- If it shows only **yellow Figma URLs** → you added the right ones
- Make sure you clicked **Save** in Privy Dashboard
- Try a **hard refresh**: `Ctrl+Shift+R` or `Cmd+Shift+R`

---

**The URL Detector will tell you exactly what URLs are available. Just add them to Privy!** 🏒
