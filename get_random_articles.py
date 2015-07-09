import random

NUM_ARTICLES = 10
a = FrozenArticle.get_all()

articles = random.sample(a, NUM_ARTICLES)

for i in range(NUM_ARTICLES):
    article = articles[i]

    topic = article.get_parent_topic()
    full_url = "https://www.khanacademy.org/%s/a/%s" % (topic.slug, article.slug)

    out_file = open('sampled_articles/%i.html' % i, 'w')
    out_file.write("<!-- %s -->" % full_url)
    out_file.write(article.html_content.encode('utf-8'))
    out_file.close()
