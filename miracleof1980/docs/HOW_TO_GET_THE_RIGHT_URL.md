# 🎯 How to Get the RIGHT URL for Privy

## The Problem

You're seeing the **red banner** but it's showing this WRONG URL:
```
❌ https://6628b49a-38e3-4fd3-a907-5ca83c097843-v2-figmaiframepreview.figma.site
```

This is the **iframe preview URL** - it won't fix your Twitter/Google login!

---

## The Solution

You need the **makeproxy URL** from your browser's address bar.

### Step 1: Look at Your Browser's Address Bar

At the **very top** of your browser window, you'll see a URL bar that looks like:

```
🔒 https://app-omjy2uix4nmjlhwkop25rnlpc6quforlm32tvvbyfp6bw24cw6aa.makeproxy-c.figma.site
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     THIS is what you need! ☝️
```

### Step 2: Copy That ENTIRE URL

**On Windows/Linux:**
1. Click in the address bar
2. Press `Ctrl + A` (select all)
3. Press `Ctrl + C` (copy)

**On Mac:**
1. Click in the address bar  
2. Press `Cmd + A` (select all)
3. Press `Cmd + C` (copy)

### Step 3: Add to Privy

1. Go to https://dashboard.privy.io
2. Click **Settings** (left sidebar)
3. Click **Allowed origins**
4. Click **"+ Add origin"**
5. Press `Ctrl + V` (or `Cmd + V`) to paste
6. Click **Save**

### Step 4: Test

1. Come back to your app
2. Press `Ctrl + Shift + R` (or `Cmd + Shift + R`) to hard refresh
3. Try Twitter or Google login
4. Should work! ✅

---

## Visual Guide

### ❌ WRONG - Don't Use This:

The red banner shows this crossed-out URL:
```
https://6628b49a-...figmaiframepreview.figma.site
                         ^^^^^^^^^^^^^^^^^^
                         This word = WRONG!
```

### ✅ RIGHT - Use This Instead:

Your browser's address bar shows:
```
https://app-XXXXXXXXX.makeproxy-c.figma.site
             ^^^^^^^^         ^^^^^^^^^^^
             These words = CORRECT!
```

---

## What the Red Banner Will Show You

When you refresh the page, the banner will now **automatically detect** if it's showing the wrong URL:

✅ **If it shows the CORRECT makeproxy URL:**
- You'll see a **YELLOW box** with a Copy button
- Just click Copy and add to Privy!

❌ **If it shows the WRONG figmaiframepreview URL:**
- You'll see a **RED box** with a crossed-out URL
- Below it, you'll see **instructions and a browser mockup**
- Follow the instructions to copy from your address bar

---

## Quick Checklist

Before adding a URL to Privy, check:

- [ ] Does it start with `https://app-`?
- [ ] Does it end with `.makeproxy-c.figma.site`?
- [ ] Does it match what's in your browser's address bar?
- [ ] Does it NOT contain `figmaiframepreview`?

If you answered **YES** to all four → ✅ **That's the right URL!**

If you answered **NO** to any → ❌ **Don't use it!**

---

## Still Confused?

### "Where is the address bar?"

It's at the **very top** of your browser window, where you see the URL. It might look like:
- Chrome: Has a lock icon 🔒 on the left
- Firefox: Has a lock icon and maybe a shield
- Safari: Has a lock icon and refresh button
- Edge: Has a lock icon and favorites star

**Click in that bar** and the URL will be highlighted. That's what you need to copy!

---

## After You Add the Right URL

1. **Save** in Privy Dashboard
2. **Hard refresh** your app page (Ctrl+Shift+R or Cmd+Shift+R)
3. The **red banner will disappear** (or you can dismiss it)
4. **Try Twitter/Google login** - should work now! 🎉

---

## Pro Tip

The banner now has a **visual browser mockup** showing exactly where to find the URL. Look for the green highlighted address bar in the mockup!

---

**Bottom line: Copy the URL from your BROWSER'S ADDRESS BAR, not from the banner!** 🎯
