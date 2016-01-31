class Visitor
  include Mongoid::Document
  field :ip

  validates_uniqueness_of :ip
end
