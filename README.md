# Staub Nachhaltigkeit

## Environment

Windows

git: https://git-scm.com/download/win
ruby: https://rubyinstaller.org/

Following steps are done in the shell

```sh
git clone https://github.com/kitsane/staub-nachhaltigkeit.git
cd staub-nachhaltigkeit
bundle

# run the server
bundle exec middleman
# visit http://172.20.10.4:4567/ in the browser
```

All pages live under the `source` folder and `index.html.erb` as home page

## Deployment

```sh
bundle exec middleman build --no-parallel
git checkout gh-pages
mv build/* .
```
