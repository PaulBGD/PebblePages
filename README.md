# Pebble Pages
Create configuration pages for your next Pebble project.

# How to use

Click the 'Fork' button in the top right of the project page.

Click on the 'Branch' button, and type in `gh-pages`. Then click create.

Once that's created, edit the `data.json` file. This will be used to later generate your page.

After that, you'll need Node to build the page. Go to http://nodejs.org/ to download and install it.
Clone your forked repository to your computer. Then go into your OS terminal and navigate to the directory.
Once done, just run the following:
```
git checkout -b gh-pages

node build

git add index.html
git add data.json
git commit -m 'Changes'
git push origin gh-pages
```

Then you're done! Navigate then to username.github.io/PebblePages (it may take a while for GitHub to update).