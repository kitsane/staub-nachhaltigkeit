xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc("#{ root_url }/")
  end
  sitemap.resources.each do |resource|
    xml.url do
      xml.loc "#{ root_url }#{ resource.url }"
    end if resource.url.end_with?('html')
  end
end
