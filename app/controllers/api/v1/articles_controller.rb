module Api
  module V1
    class ArticlesController < ApplicationController

      include Collection

      respond_to :json
      before_action :set_article, only:[:show, :update, :destroy]
      before_action :authenticate_user!,  only:[:create, :update, :destroy]

      def index
        @articles = filtered_collection(Article)
        @articles = @articles.order(created_at: :desc).page(params[:page]).per(params[:per_page])
        respond_with @articles, meta: {total_pages: @articles.total_pages}
      end

      def show
        respond_with @article
      end

      def create
        @article = Article.new article_params
        if @article.save
          respond_with @article, status: :created, location: false
        else
          respond_with @article, status: :unprocessable_entity
        end
      end

      def update
        if @article.update article_params
          respond_with @article, status: :updated, location: false
        else
          respond_with @article, status: :unprocessable_entity
        end
      end

      def destroy
        @article.destroy
        respond_with @article, status: :success, location: false
      end

      private
        def article_params
          params.require(:article).permit :text, :preview_text, :title, :subtitle, :category, :image, :city
        end

        def set_article
          @article = Article.find(params[:id])
        end

    end
  end
end
