import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-foundContainer">
      <h1 className="not-foundContainer-title">404 - Page Not Found</h1>
      <p className="not-foundContainer-message">
        OOps! The page you're looking for doesn't exist.
      </p>
      <Link
        className="not-foundContainer-link"
        to="/"
      >
        ← Go back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
