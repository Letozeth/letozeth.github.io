# Ashen Light devlog

The files behind the Ashen Light devlog, hosted free on GitHub Pages at
**https://letozeth.github.io**.

---

## Putting the site online (one time)

1. On github.com, click **+** (top right) → **New repository**.
2. Name it exactly **`letozeth.github.io`**, set it to **Public**, and leave
   "Add a README" unticked. Click **Create repository**.
3. On the new, empty repository page, click the link **uploading an existing file**.
4. Unzip the site folder on your computer, open it, select **everything inside it**
   (not the folder itself), and drag it all into the browser window.
5. Scroll down and click **Commit changes**.
6. Go to **Settings → Pages**. Under "Build and deployment", make sure the source
   is **Deploy from a branch**, with branch **main** and folder **/ (root)**.
   Click **Save** if you changed anything.
7. Wait a minute or two. The **Actions** tab shows a yellow dot while the site
   builds and a green tick when it's done. Then open **https://letozeth.github.io**.

---

## Writing a new post

Everything can be done on the GitHub website. No software needed.

1. Open the file `_templates/new-post.md` and copy its text.
2. Go into the `_posts` folder and click **Add file → Create new file**.
3. Name the file with the date and a short title, joined by dashes:
   `2026-11-02-new-combat-skills.md`
4. Paste the template, fill in the title and lede at the top, and write your post.
5. Click **Commit changes**. The post appears on the site about a minute later.

A post dated in the future won't appear until that date arrives, which is handy
for scheduling.

### Adding a YouTube video

```
{% include youtube.html id="dQw4w9WgXcQ" caption="Optional caption" %}
```

The `id` is the part after `watch?v=` in the video's address
(or after `youtu.be/` in a share link).

### Adding screenshots

1. Shrink them first at **https://letozeth.github.io/tools/shrink/**.
   Drop in screenshots straight from the game and download the small JPGs.
   It runs in your browser; nothing is uploaded anywhere.
2. Go into `assets/images/posts`, click **Add file → Upload files**, drop them in
   and commit.
3. Put them in a post:

```
{% include image.html src="/assets/images/posts/my-shot.jpg" alt="What it shows" caption="Optional caption" %}
```

Two side by side (for before and after):

```
{% include pair.html left="/assets/images/posts/before.jpg" left_alt="Before" right="/assets/images/posts/after.jpg" right_alt="After" caption="Before and after" %}
```

### Patch notes

Lines starting with `>` become a framed box:

```
> **Changes in build 0.4.0**
>
> - New dodge animation
> - Fixed the Catacombs door not opening
```

### Text formatting

| You write                 | You get               |
|---------------------------|-----------------------|
| `**bold**`                | **bold**              |
| `*italic*`                | *italic*              |
| `[a link](https://…)`     | a link                |
| `## Heading`              | a section heading     |
| `- item`                  | a bullet point        |

---

## Editing with the site builder

Everything here can also be edited in the site builder on claude.ai, which exports a fresh copy of this folder as a zip. Upload its contents the same way to update the site.

## Changing site settings

Open `_config.yml` and edit the first block: the tagline, the status shown in the
sidebar, and the links to your Steam page, YouTube channel and Discord. A link left
empty (`""`) simply doesn't show. When your Steam page goes live, paste its address
into `steam_url` and a **Wishlist on Steam** button appears in the menu and sidebar.

## Comments

Posts can have a comment section at the bottom. Visitors write a message and
can add a name; without one, the comment shows as "Anonymous". Comments are
stored free in Google Firebase, because GitHub Pages can't store anything itself.

### Turning comments on (one time)

1. Go to https://console.firebase.google.com and sign in with a Google account.
2. Click **Create a project**, name it (for example `ashen-light-devlog`), and
   finish the steps. Google Analytics isn't needed, so you can switch it off.
3. In the left menu, open **Build → Firestore Database** and click
   **Create database**. Pick a location close to your readers (for example
   `europe-west3`, Frankfurt), then choose **Start in production mode**.
4. Open the **Rules** tab, replace everything there with the rules below,
   and click **Publish**.
5. Click the gear icon → **Project settings** and copy the **Project ID**.
6. Paste it into `comments_project_id` in `_config.yml` (or in the site builder
   under Site & look → Comments) and upload as usual.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{post}/comments/{comment} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name', 'text', 'created'])
        && request.resource.data.keys().hasAll(['name', 'text', 'created'])
        && request.resource.data.name is string
        && request.resource.data.name.size() <= 40
        && request.resource.data.text is string
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() <= 2000
        && request.resource.data.created == request.time;
      allow update, delete: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

These rules let anyone read comments and add new ones, but nobody can edit or
delete them from the site. Only you can, from the Firebase console.

### Removing a comment

In the Firebase console, open **Firestore Database → Data**, then
`posts` → the post (named after its address, like
`devlog-2026-10-new-weapons-sets`) → `comments`. Click the comment and choose
**Delete document**.

The free plan allows 50,000 comment loads and 20,000 new comments a day,
far more than a devlog needs, and never asks for a card.

## Using your own domain later

If you buy a domain (like ashenlightgame.com), add it under
**Settings → Pages → Custom domain**, then change `url` in `_config.yml` to match.
GitHub's guide walks through the domain settings:
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

---

Fonts: Cormorant SC, Alegreya and IBM Plex Mono, all under the SIL Open Font
License (included in `assets/fonts`). They're hosted with the site, so visitors'
browsers never contact Google Fonts.
