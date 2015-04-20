These layouts are waiting on deconst features to be ported over properly:

 * `_layouts/category_index.html`
 * `_layouts/monthy_index.html`
 * `_layouts/post.html`

New handlebars context fields that I'll need to add.

 * `presented_url`
 * `envelope.tags`
 * `envelope.author`
 * `envelope.publish_date`
 * `envelope.bio`
 * `envelope.disqus.include`
 * `envelope.disqus.short_name`
 * `envelope.disqus.embed`
 * `has_next_or_previous`
 * `previous.url`
 * `previous.title`
 * `next.url`
 * `next.title`
 * `included[].date`
 * `included[].title`
 * `included[].url`
 * `included[].tags`

And I'll need to reproduce these Liquid filters as handlebars filters:

 * `{{ | date: "%b %-d %Y" }}`
 * `{{ | date_to_html_string }}`
 * `{{ | category_links }}`
