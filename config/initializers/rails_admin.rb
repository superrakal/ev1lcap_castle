RailsAdmin.config do |config|

  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  config.actions do
    dashboard
    index
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end

  config.model Article do
    edit do
      field :title
      field :subtitle
      field :preview_text
      field :text, :ck_editor
      field :category
      field :image
    end
  end
end
