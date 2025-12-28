# Smart Detector

A tiny joke site that "automatically detects the presence of smart" and always fails.

## Edit content

- FAQ: `content/faq.json`
- Behavior / messages: `assets/app.js`
- Styles: `assets/style.css`

## Run locally

Because the site loads `content/faq.json`, you should serve it with a tiny local web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
