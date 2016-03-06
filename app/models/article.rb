class Article
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title
  field :subtitle
  field :text
  field :preview_text
  field :category
  field :city
  field :music_link
  field :image_link

  embeds_many :visits
end
