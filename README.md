# HTML -> Perseus Articles

These are the scripts to convert HTML articles to Perseus articles I wrote as part of the
[Scope Porting HTML Articles](https://docs.google.com/document/d/1K1QJrWL-KU5pKBF1jaMBVc0bH0mlwH2SdEdbQYRF54k/edit#heading=h.3tkphk8upcud) project.

Run the converter with

    babel-node convert.js

Right now the script is hard coded to convert the sample articles in the `articles/`
folder. To change the articles to convert you have to manually change the `articles`
variable in `convert.js` (sorry!).

If you have the KA webapp repo locally you can grab 10 new articles into the 
`sampled_articles` folder with

    <WEBAPP_PATH>/tools/devshell.py --script get_random_articles.py


