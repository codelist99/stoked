# STOKED Check-In

A private, dependency-free web app based on the feeling indicators in the **S.T.O.K.E.D. Awareness Path**. The reflection questions from the source document are intentionally excluded.

## Run it

Open `index.html` in a browser. No install or build step is required.

For a local development server, you can also run:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Result logic

The primary result is the furthest stage in the path where the user checked at least one feeling. The result also shows counts for all six stages so the user can see their complete pattern. Selections are held in memory only and are cleared when the page is reloaded or the check-in is restarted.
