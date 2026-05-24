const Header = ({ title, studentCount, averageScore }) => {
  return (
    <header className="app-header">
      <h1 className="header-title">{title}</h1>
      <p className="header-info">
        {studentCount} Students Enrolled | Class Average: {averageScore}%
      </p>
    </header>
  );
};

export default Header;
