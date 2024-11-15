import { useNavigate } from "react-router-dom";
import formatDateToReadable from "../../utils/eventsDate";
import getExcerpt from "../../Helpers/HelpersFunction";
import limitWords from "../../Helpers/HelpersFunction";

function ArticleCard({
  authorAvatar,
  authorName,
  blogTitle,
  blogExcept,
  blogImageUrl,
  createdAt,
  updatedAt,
  id,
}) {
  const limitedExcerpt = limitWords(blogExcept, 20);
  const limitedTitle = limitWords(blogTitle, 9);
  const formattedCreatedAt = formatDateToReadable(createdAt);
  const formattedUpdatedAt = formatDateToReadable(updatedAt);

  // handle submit button to redirect to the blog details page using the blog id
  const navigate = useNavigate();
  const handleNavigateToFullBlog = () => {
    if (!id) return;
    navigate(`/blog/${id}`);
  };

  return (
    <div className="article-card">
      <div className="author-info">
        <img src={authorAvatar} alt={authorName} className="author-image" />
        <div className="author-name">{authorName}</div>
      </div>

      <div className="content-section">
        <div className="text-content">
          <h2 className="article-title">{limitedTitle}</h2>
          <p className="article-subtitle">⚡{limitedExcerpt}⚡</p>
        </div>
        <img src={blogImageUrl} alt="Article" className="article-image" />
      </div>

      <div className="article-footer">
        <span className="date">posted on {formattedCreatedAt}</span>
        <span className="views">updated on {formattedUpdatedAt}</span>
      </div>
      <button className="read-more-button" onClick={handleNavigateToFullBlog}>
        Read More
      </button>
    </div>
  );
}

export default ArticleCard;
