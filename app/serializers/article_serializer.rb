class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :created_at, :text, :preview_text, :category, :image, :city

  def image
    @object.image.url(:original)
  end
end
