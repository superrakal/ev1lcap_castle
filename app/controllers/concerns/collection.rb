module Collection
  protected
    def scoped_collection(item_class)
      collection = nil
      if params[:category].present?
        collection = item_class.where(category: params[:category])
      end
      collection || item_class.all
    end

    def filtered_collection(item_class)
      scoped_collection(item_class).search(params[:q]).result
    end
end