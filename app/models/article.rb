class Article
  include Mongoid::Document
  include Mongoid::Paperclip
  include Mongoid::Timestamps

  field :title
  field :subtitle
  field :text
  field :preview_text
  field :category
  field :city

  has_mongoid_attached_file :image,
                            :styles => {
                                :original => ['840x340', :jpg]
                            }
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  validates_attachment_size :image, :less_than => 10.megabytes

end
