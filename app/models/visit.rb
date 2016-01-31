class Visit
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :article
  belongs_to :visitor

  validates_uniqueness_of :visitor
end
