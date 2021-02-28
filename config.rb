# Activate and configure extensions
activate :i18n, langs: [:de, :en]

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Helpers

helpers do
  def root_url
    "https://#{ data.site.url}"
  end

  def nav_active(path)
    'active' if current_page.path == path
  end

  def locale_switcher
    path = current_page.page_id.split('/').last

    current_locale = (locales - [I18n.locale]).first

    content_tag :a, href: url_for(path, locale: current_locale).to_s do
      t(".locales.#{current_locale}")
    end
  end
end

# Build-specific configuration

configure :build do
  activate :minify_css

  require "uglifier"
  activate :minify_javascript, compressor: -> { Uglifier.new(harmony: true) }

  activate :minify_html

  activate :imageoptim

  activate :asset_hash
  activate :gzip

  activate :favicon_maker do |f|
    f.template_dir = 'source/images'
    f.icons = {
      "logo.svg" => [
        { icon: "apple-touch-icon-180x180-precomposed.png" },
        { icon: "apple-touch-icon-152x152-precomposed.png" },
        { icon: "apple-touch-icon-144x144-precomposed.png" },
        { icon: "apple-touch-icon-120x120-precomposed.png" },
        { icon: "apple-touch-icon-114x114-precomposed.png" },
        { icon: "apple-touch-icon-76x76-precomposed.png" },
        { icon: "apple-touch-icon-72x72-precomposed.png" },
        { icon: "apple-touch-icon-60x60-precomposed.png" },
        { icon: "apple-touch-icon-57x57-precomposed.png" },
        { icon: "apple-touch-icon-precomposed.png", size: "57x57" },
        { icon: "apple-touch-icon.png", size: "57x57" },
        { icon: "favicon-196x196.png" },
        { icon: "favicon-160x160.png" },
        { icon: "favicon-96x96.png" },
        { icon: "favicon-32x32.png" },
        { icon: "favicon-16x16.png" },
        { icon: "favicon.png", size: "16x16" },
        { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
        { icon: "mstile-70x70.png", size: "70x70" },
        { icon: "mstile-144x144.png", size: "144x144" },
        { icon: "mstile-150x150.png", size: "150x150" },
        { icon: "mstile-310x310.png", size: "310x310" },
        { icon: "mstile-310x150.png", size: "310x150" }
      ]
    }

    activate :relative_assets
    set :relative_links, true
  end
end
